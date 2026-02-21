import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@/lib/supabase/server';

const anthropic = new Anthropic();

const TOOLS: Anthropic.Tool[] = [
  {
    name: 'search_perfumes',
    description: 'Search perfumes by name, brand, olfactive family, or gender. Returns a list of matching perfumes.',
    input_schema: {
      type: 'object' as const,
      properties: {
        query: { type: 'string', description: 'Name or partial name to search for' },
        gender: { type: 'string', enum: ['masculine', 'feminine', 'unisex'] },
        family: { type: 'string', description: 'Olfactive family e.g. woody, floral, oriental' },
        limit: { type: 'number', default: 5 },
      },
    },
  },
  {
    name: 'get_perfume_details',
    description: 'Get full details for a specific perfume by its ID.',
    input_schema: {
      type: 'object' as const,
      properties: {
        id: { type: 'string', description: 'Perfume UUID' },
      },
      required: ['id'],
    },
  },
];

async function executeTool(name: string, input: Record<string, unknown>) {
  const supabase = await createClient();

  if (name === 'search_perfumes') {
    let query = supabase
      .from('perfumes')
      .select('id, name, olfactive_family, gender_target, community_rating, brands(name)')
      .limit((input.limit as number) ?? 5);

    if (input.query) query = query.ilike('name', `%${input.query}%`);
    if (input.gender) query = query.eq('gender_target', input.gender);
    if (input.family) query = query.eq('olfactive_family', input.family);

    const { data, error } = await query;
    if (error) return { error: error.message };
    return data;
  }

  if (name === 'get_perfume_details') {
    const { data, error } = await supabase
      .from('perfumes')
      .select('*')
      .eq('id', input.id)
      .single();
    if (error) return { error: error.message };
    return data;
  }

  return { error: `Unknown tool: ${name}` };
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: unknown) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));

      const fail = (err: unknown) => {
        console.error('[chat] stream error:', err);
        try {
          send({ type: 'error', message: String(err) });
          controller.close();
        } catch {}
      };

      let currentMessages = [...messages];

      try {
      // Agentic loop — max 5 iterations
      for (let i = 0; i < 5; i++) {
        const response = await anthropic.messages.create({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          tools: TOOLS,
          messages: currentMessages,
          system: 'You are a knowledgeable perfume recommendation expert. Use tools to search the database before making recommendations. Always explain your reasoning.',
        });

        // Stream text blocks
        for (const block of response.content) {
          if (block.type === 'text') {
            send({ type: 'text', text: block.text });
          }
        }

        // Handle tool use
        if (response.stop_reason === 'tool_use') {
          const toolUseBlocks = response.content.filter(b => b.type === 'tool_use');
          const toolResults: Anthropic.ToolResultBlockParam[] = [];

          for (const toolUse of toolUseBlocks) {
            if (toolUse.type !== 'tool_use') continue;
            send({ type: 'tool_call', name: toolUse.name, input: toolUse.input });
            const result = await executeTool(toolUse.name, toolUse.input as Record<string, unknown>);
            send({ type: 'tool_result', name: toolUse.name, result });
            toolResults.push({ type: 'tool_result', tool_use_id: toolUse.id, content: JSON.stringify(result) });
          }

          currentMessages = [
            ...currentMessages,
            { role: 'assistant' as const, content: response.content },
            { role: 'user' as const, content: toolResults },
          ];
          continue;
        }

        // Done
        break;
      }

      send({ type: 'done' });
      controller.close();
      } catch (err) {
        fail(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

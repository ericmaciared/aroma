let totalTokens = { prompt: 0, completion: 0 };

export function trackTokens(prompt: number, completion: number): void {
  totalTokens.prompt += prompt;
  totalTokens.completion += completion;
}

export function getCostSummary(): string {
  const inputCost = (totalTokens.prompt / 1_000_000) * 5.0;   // GPT-4o pricing
  const outputCost = (totalTokens.completion / 1_000_000) * 15.0;
  const total = inputCost + outputCost;
  return `Tokens: ${totalTokens.prompt} in / ${totalTokens.completion} out | Cost: ~$${total.toFixed(4)}`;
}

export function resetCostTracker(): void {
  totalTokens = { prompt: 0, completion: 0 };
}

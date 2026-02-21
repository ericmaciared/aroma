import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function QuizPage() {
  const user = await getUser();
  if (!user) redirect('/auth/login?redirectTo=/quiz');

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold">Taste Quiz</h1>
      <p className="text-muted-foreground mt-2">Coming soon — tell us what you love.</p>
    </div>
  );
}

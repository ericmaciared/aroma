import { getUser, getUserProfile } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const profile = await getUserProfile();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold">Profile</h1>
      <p className="text-muted-foreground mt-2">{user.email}</p>
      <pre className="mt-8 text-xs bg-muted p-4 rounded overflow-auto">
        {JSON.stringify(profile, null, 2)}
      </pre>
    </div>
  );
}

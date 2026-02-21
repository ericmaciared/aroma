import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Authentication error</h1>
        <p className="text-muted-foreground text-sm">
          Something went wrong with the sign-in link. It may have expired or already been used.
        </p>
        <Button asChild>
          <Link href="/auth/login">Try again</Link>
        </Button>
      </div>
    </div>
  );
}

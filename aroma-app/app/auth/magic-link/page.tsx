import Link from 'next/link';

interface Props {
  searchParams: Promise<{ email?: string }>;
}

export default async function MagicLinkPage({ searchParams }: Props) {
  const { email } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4 text-center">
        <div className="text-4xl">✉️</div>
        <h1 className="text-2xl font-semibold">Check your email</h1>
        <p className="text-muted-foreground text-sm">
          We sent a magic link to <strong>{email ?? 'your email'}</strong>.
          Click it to sign in — no password needed.
        </p>
        <p className="text-xs text-muted-foreground">
          Link expires in 1 hour. Check your spam folder if you don't see it.
        </p>
        <Link href="/auth/login" className="text-sm underline underline-offset-4 block">
          Back to login
        </Link>
      </div>
    </div>
  );
}

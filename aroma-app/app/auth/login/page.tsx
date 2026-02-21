'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { MonoLabel } from '@/components/ui/mono-label';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '/explore';
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [magicSent, setMagicSent] = useState(false);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); }
    else { router.push(redirectTo); router.refresh(); }
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}` },
    });
  }

  async function handleMagicLink() {
    if (!email) { setError('Enter your email first'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}` },
    });
    if (error) { setError(error.message); setLoading(false); }
    else { setMagicSent(true); setLoading(false); }
  }

  if (magicSent) {
    return (
      <div className="w-full max-w-sm text-center space-y-4">
        <MonoLabel className="block">magic link sent</MonoLabel>
        <p className="text-[14px] font-light text-fg-muted">
          Check <span className="text-fg">{email}</span> — click the link to sign in.
        </p>
        <button onClick={() => setMagicSent(false)}
          className="font-mono text-[11px] text-fg-subtle hover:text-fg transition-colors">
          use a different method
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm space-y-7">

      <div>
        <MonoLabel className="block mb-2">sign in</MonoLabel>
        <p className="text-[13px] text-fg-muted font-light">Welcome back to Aroma.</p>
      </div>

      {/* Google */}
      <button onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2.5 py-2.5 text-[13px] border border-border rounded hover:border-border-strong transition-colors text-fg-muted hover:text-fg">
        <GoogleIcon />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <MonoLabel>or</MonoLabel>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Email form */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div className="space-y-1.5">
          <MonoLabel className="block">email</MonoLabel>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com" required
            className="w-full px-3 py-2.5 text-[13px] bg-bg-muted border border-border rounded outline-none text-fg placeholder:text-fg-subtle focus:border-border-strong transition-colors font-light"
          />
        </div>
        <div className="space-y-1.5">
          <MonoLabel className="block">password</MonoLabel>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2.5 text-[13px] bg-bg-muted border border-border rounded outline-none text-fg focus:border-border-strong transition-colors font-light"
          />
        </div>

        {error && <p className="font-mono text-[11px] text-red-500">{error}</p>}

        <button type="submit" disabled={loading}
          className="w-full py-2.5 text-[13px] font-medium bg-accent text-accent-fg rounded hover:opacity-85 transition-opacity disabled:opacity-50">
          {loading ? 'signing in...' : 'Sign in'}
        </button>
      </form>

      <button onClick={handleMagicLink} disabled={loading}
        className="w-full py-2 font-mono text-[11px] text-fg-subtle hover:text-fg transition-colors tracking-[0.06em]">
        send magic link instead
      </button>

      <p className="text-center font-mono text-[11px] text-fg-subtle">
        no account?{' '}
        <Link href="/auth/signup" className="text-fg-muted hover:text-fg underline underline-offset-2">
          sign up
        </Link>
      </p>

    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}

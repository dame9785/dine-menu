import Link from 'next/link';
import { redirect } from 'next/navigation';

import LoginForm from '@/components/forms/login-form';
import { getSession } from '@/lib/auth-guard';

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect('/');
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="relative z-10 w-full max-w-md">
        {/* Login card */}
        <div className="rounded-3xl border border-[#C09721]/25 bg-[#121210]/95 p-7 shadow-[0_25px_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:p-10">
          <div className="mb-10 justify-center text-center">
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#E5C76B]">Dine Menu</h1>
            <div className="mx-auto mt-5 h-px w-16 bg-linear-to-r from-transparent via-[#C09721] to-transparent" />
            <p className="mt-5 text-sm font-medium tracking-wide text-[#B5B0A3]">Welcome back</p>
          </div>

          {/* Login form */}
          <LoginForm />

          {/* Register link */}
          <p className="mt-8 text-center text-sm text-[#777267]">
            Don&apos;t have an account?{' '}
            <Link
              href="/account/register"
              className="font-medium text-[#D4AF37] transition-colors duration-200 hover:text-[#F0D98A] hover:underline hover:underline-offset-4"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs tracking-wider text-[#4F4D47]">© {new Date().getFullYear()} Dine Menu</p>
      </div>
    </main>
  );
}

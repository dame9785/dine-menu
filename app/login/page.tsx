'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

import LoginForm from '@/components/forms/login-form';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.replace('/');
    }
  }, [session, isPending, router]);

  if (isPending || session) {
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FBF8F0] px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#C09721] bg-white p-8 shadow-xl">
        {/* Header */}
        <h1 className="mb-2 text-center text-3xl font-bold text-[#8B6914]">Dine Menu</h1>
        <p className="mb-8 text-center text-gray-500">Login to Dine Menu</p>

        {/* Login Form */}
        <LoginForm />

        {/* Register link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Dont have an account?{' '}
          <Link href="/register" className="font-semibold text-[#A77F18] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

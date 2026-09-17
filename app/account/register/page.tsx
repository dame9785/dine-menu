import RegisterForm from '@/components/forms/register-form';
import { getSession } from '@/lib/auth-guard';

import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const session = await getSession();

  if (session) {
    redirect('/');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FBF8F0] px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#C09721] bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-[#8B6914]">Create Account</h1>

        <p className="mb-8 text-center text-gray-500">Join Dine Menu</p>
        <RegisterForm />

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/account/login" className="font-semibold text-[#A77F18] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

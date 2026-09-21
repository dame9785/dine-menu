'use client';

import { Suspense } from 'react';

import ResetPasswordForm from '@/components/forms/reset-password-form';
import { Link, LockKeyholeIcon } from 'lucide-react';

export default function ResetPasswordPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="w-full max-w-md rounded-2xl border border-[#C09721]/25 bg-[#121210]/95 p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#C09721]/40 bg-[#2A2414] shadow-[0_0_24px_rgba(192,151,33,0.08)]">
            <LockKeyholeIcon className="h-6 w-6 text-[#D4AF37]" strokeWidth={1.6} />
          </div>

          <h1 className="text-2xl font-semibold text-[#e5c76b]">Reset password</h1>
        </div>

        <ResetPasswordForm />
        <footer className="mt-5 grid grid-cols-1 gap-2 text-[#b5b0a3]">
          <p className="text-center text-sm">
            <Link
              href="/account/login"
              className="font-medium transition-colors duration-200 hover:text-[#F0D98A] hover:underline hover:underline-offset-4"
            >
              Go back to login
            </Link>
          </p>
        </footer>
      </div>
    </section>
  );
}

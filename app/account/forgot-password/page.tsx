'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import ForgotPasswordForm from '@/components/forms/forgot-password';

export default function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FBF8F0] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#C09721] bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FBF8F0]">
            <Mail className="h-6 w-6 text-[#C09721]" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">Forgot Password?</h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your email address and we will send you a password reset link.
          </p>
        </div>

        {isSent ? (
          <div className="text-center">
            <p className="text-sm text-gray-600">Check your inbox for a password reset link.</p>

            <Link
              href="/account/login"
              className="mt-6 inline-block text-sm font-medium text-[#C09721] hover:underline"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <ForgotPasswordForm onSuccess={() => setIsSent(true)} />
        )}
      </div>
    </main>
  );
}

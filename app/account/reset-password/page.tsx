'use client';

import { Suspense } from 'react';

import ResetPasswordForm from '@/components/forms/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FBF8F0] px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}

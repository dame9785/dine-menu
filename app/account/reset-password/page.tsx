'use client';

import { FormEvent, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LockKeyhole } from 'lucide-react';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';
import Input from '@/components/ui/input';
import SubmitButton from '@/components/ui/submit-button';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const error = searchParams.get('error');

  const isValidToken = Boolean(token) && !error;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      toast.error('Invalid or expired reset link.');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsPending(true);

    try {
      const { error } = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (error) {
        toast.error(error.message || 'Could not reset password.');
        return;
      }

      toast.success('Password reset successfully!');

      router.push('/account/login');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  if (!isValidToken) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FBF8F0] px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#C09721] bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-semibold text-gray-900">Invalid Reset Link</h1>

          <p className="mt-3 text-sm text-gray-500">This reset link is invalid or has expired.</p>

          <Link
            href="/account/forgot-password"
            className="mt-6 inline-block text-sm font-medium text-[#C09721] hover:underline"
          >
            Request a new link
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FBF8F0] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#C09721] bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FBF8F0]">
            <LockKeyhole className="h-6 w-6 text-[#C09721]" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">Reset Password</h1>

          <p className="mt-2 text-sm text-gray-500">Enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
              New Password
            </label>

            <Input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter new password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>

          <SubmitButton>{isPending ? 'Resetting...' : 'Reset Password'}</SubmitButton>

          <div className="text-center">
            <Link href="/account/login" className="text-sm text-gray-500 hover:text-[#C09721] hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

'use client';

import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LockKeyhole } from 'lucide-react';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';
import { resetPasswordSchema } from '@/schemas/account';

import Input from '@/components/ui/input';
import SubmitButton from '@/components/ui/submit-button';
import FormField from '../ui/form-field';

type FormErrors = Record<string, string[]>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);

  const isValidToken = !!token;

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      const next = { ...prev };

      delete next[field];

      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({});

    const data = {
      password,
      confirmPassword,
    };

    const validation = resetPasswordSchema.safeParse(data);

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    if (!token) {
      toast.error('Invalid or missing reset token.');
      return;
    }

    setIsPending(true);

    try {
      const { error } = await authClient.resetPassword({
        newPassword: validation.data.password,
        token,
      });

      if (error) {
        toast.error(error.message || 'Could not reset password.');
        return;
      }

      toast.success('Password reset successfully!');

      router.push('/account/login');
    } catch (error) {
      console.error('Password reset error:', error);

      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  if (!isValidToken) {
    return (
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
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#C09721] bg-white p-8 shadow-lg">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FBF8F0]">
          <LockKeyhole className="h-6 w-6 text-[#C09721]" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900">Reset Password</h1>
        <p className="mt-2 text-sm text-gray-500">Enter your new password below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Password */}
        <FormField label="New Password" htmlFor="password" error={errors.password?.[0]}>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              clearError('password');
              setErrors((prev) => {
                const next = { ...prev };
                delete next.confirmPassword;
                return next;
              });
            }}
            placeholder="Enter new password"
            autoComplete="new-password"
            disabled={isPending}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
        </FormField>

        {/* Confirm Password */}
        <FormField label="Confirm Password" htmlFor="confirmPassword" error={errors.confirmPassword?.[0]}>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              clearError('confirmPassword');
            }}
            placeholder="Confirm new password"
            autoComplete="new-password"
            disabled={isPending}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
          />
        </FormField>

        <SubmitButton disabled={isPending}>{isPending ? 'Resetting...' : 'Reset Password'}</SubmitButton>

        <div className="text-center">
          <Link href="/account/login" className="text-sm text-gray-500 hover:text-[#C09721] hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

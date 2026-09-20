'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

import { authClient } from '@/lib/auth-client';
import Input from '@/components/ui/input';
import SubmitButton from '../ui/submit-button';
import FormField from '../ui/form-field';
import { forgotPasswordSchema } from '@/schemas/account';

interface Props {
  onSuccess: () => void;
}

type FormErrors = Record<string, string[]>;

export default function ForgotPasswordForm({ onSuccess }: Props) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [email, setEmail] = useState('');
  const [isPending, setIsPending] = useState(false);

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

    const validation = forgotPasswordSchema.safeParse({
      email: email.trim(),
    });

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    setIsPending(true);

    try {
      const response = await authClient.requestPasswordReset({
        email: validation.data.email,
        redirectTo: `${window.location.origin}/account/reset-password`,
      });

      if (response.error) {
        toast.error(response.error.message || 'Something went wrong.');
        return;
      }

      onSuccess();
      toast.success('If the email exists, a reset link has been sent.');
    } catch (error) {
      console.error('Password reset error:', error);

      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email*/}
      <FormField label="Email address" htmlFor="email" error={errors.email?.[0]}>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            clearError('email');
          }}
          placeholder="Enter your email"
          autoComplete="email"
          disabled={isPending}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
      </FormField>

      {/* Submit */}
      <SubmitButton disabled={isPending}>{isPending ? 'Sending...' : 'Send Reset Link'}</SubmitButton>
      <div className="text-center">
        <Link href="/account/login" className="text-sm text-gray-500 hover:text-[#C09721] hover:underline">
          Back to Login
        </Link>
      </div>
    </form>
  );
}

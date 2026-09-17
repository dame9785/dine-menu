'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

import { authClient } from '@/lib/auth-client';
import Input from '@/components/ui/input';
import SubmitButton from '../ui/submit-button';

interface Props {
  onSuccess: () => void;
}

export default function ForgotPasswordForm({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }

    setIsPending(true);

    try {
      const response = await authClient.requestPasswordReset({
        email: email.trim(),
        redirectTo: `${window.location.origin}/account/reset-password`,
      });

      if (response.error) {
        toast.error(response.error.message || 'Something went wrong.');
        return;
      }

      onSuccess();
      toast.success('If the email exists, a reset link has been sent.');
    } catch (error) {
      console.error('7. CATCH ERROR:', error);

      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
          Email address
        </label>

        <Input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
      </div>

      <SubmitButton>{isPending ? 'Sending...' : 'Send Reset Link'}</SubmitButton>

      <div className="text-center">
        <Link href="/account/login" className="text-sm text-gray-500 hover:text-[#C09721] hover:underline">
          Back to Login
        </Link>
      </div>
    </form>
  );
}

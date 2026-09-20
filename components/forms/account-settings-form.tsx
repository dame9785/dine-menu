'use client';

import { FormEvent, useState } from 'react';
import { UserRound } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import SubmitButton from '../ui/submit-button';
import Input from '../ui/input';

import { updateAccountSchema } from '@/schemas/account';
import { authClient } from '@/lib/auth-client';

import FormField from '@/components/ui/form-field';

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
};

type FormErrors = Record<string, string[]>;

export default function AccountSettingsForm({ user }: Props) {
  // Account state
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);

  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);

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

    const formData = {
      email: email.trim().toLowerCase(),
      name: name.trim(),
    };

    // Validate form data
    const validation = updateAccountSchema.safeParse(formData);

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    const { name: updatedName, email: updatedEmail } = validation.data;

    const currentEmail = user.email.trim().toLowerCase();
    const currentName = user.name.trim();

    const nameChanged = updatedName !== currentName;
    const emailChanged = updatedEmail !== currentEmail;

    // No changes
    if (!nameChanged && !emailChanged) {
      toast.info('No changes to update.');
      return;
    }

    setIsPending(true);

    try {
      // Update name
      if (nameChanged) {
        const { error } = await authClient.updateUser({
          name: updatedName,
        });

        if (error) {
          toast.error(error.message || 'Failed to update name.');

          return;
        }
      }

      // Update email
      if (emailChanged) {
        const { error } = await authClient.changeEmail({
          newEmail: updatedEmail,
          callbackURL: '/account/settings',
        });

        if (error) {
          console.error('Change email error:', error);

          toast.error(error.message || 'Failed to change email.');

          return;
        }

        toast.success('Verification email sent to your new email.');
        return;
      }

      toast.success('Account updated successfully!');
    } catch (error) {
      console.error('Failed to update account:', error);

      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
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

      {/* Name */}
      <FormField label="Full name" htmlFor="name" error={errors.name?.[0]}>
        <Input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            clearError('name');
          }}
          placeholder="Enter your name"
          autoComplete="name"
          disabled={isPending}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
      </FormField>

      {/* Submit */}
      <SubmitButton disabled={isPending}>{isPending ? 'Updating...' : 'Update account'}</SubmitButton>
    </form>

    /* Navigation */
    // <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center">
    //   <Link href="/" className="text-base text-gray-600 transition-colors hover:text-[#C09721] hover:underline">
    //     Back to home
    //   </Link>

    //   <Link
    //     href="/account/forgot-password"
    //     className="text-base font-medium text-[#C09721] transition-colors hover:text-[#96751A] hover:underline"
    //   >
    //     Forgot your password?
    //   </Link>
  );
}

'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { UserRound } from 'lucide-react';
import { toast } from 'sonner';

import SubmitButton from '../ui/submit-button';
import Input from '../ui/input';

import { updateAccountSchema } from '@/schemas/account';
import { authClient } from '@/lib/auth-client';

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);

  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);

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
    <div className="w-full max-w-md rounded-2xl border border-[#C09721] bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FBF8F0]">
          <UserRound className="h-6 w-6 text-[#C09721]" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900">Account settings</h1>
        <p className="mt-2 text-sm text-gray-500">Update your account information below.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            Email address
          </label>

          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            disabled={isPending}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />

          {errors.email?.[0] && (
            <p id="email-error" className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.email[0]}
            </p>
          )}
        </div>

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
            Full name
          </label>

          <Input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            autoComplete="name"
            disabled={isPending}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />

          {errors.name?.[0] && (
            <p id="name-error" className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.name[0]}
            </p>
          )}
        </div>

        {/* Submit */}
        <SubmitButton disabled={isPending}>{isPending ? 'Updating...' : 'Update account'}</SubmitButton>

        {/* Navigation */}
        <div className="text-center">
          <Link href="/" className="text-sm text-gray-500 transition-colors hover:text-[#C09721] hover:underline">
            Back to home
          </Link>
        </div>
      </form>
    </div>
  );
}

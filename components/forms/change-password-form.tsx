'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole } from 'lucide-react';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';
import Input from '@/components/ui/input';
import SubmitButton from '@/components/ui/submit-button';
import FormField from '../ui/form-field';

export default function ChangePasswordForm() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentPassword.trim()) {
      toast.error('Please enter your current password.');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (currentPassword === newPassword) {
      toast.error('New password must be different.');
      return;
    }

    setIsPending(true);

    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(error.message || 'Could not change password.');
        return;
      }

      toast.success('Password changed successfully!');

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      router.push('/');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#C09721] bg-white p-8 shadow-lg">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FBF8F0]">
          <LockKeyhole className="h-6 w-6 text-[#C09721]" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900">Change Password</h1>

        <p className="mt-2 text-sm text-gray-500">Update your password to keep your account secure.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Current password */}
        <FormField label="Current password" htmlFor="currentPassword">
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            placeholder="Enter current password"
            autoComplete="current-password"
            disabled={isPending}
          />
        </FormField>

        {/* New password */}
        <FormField label="New password" htmlFor="newPassword">
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="Enter new password"
            autoComplete="new-password"
            disabled={isPending}
          />
        </FormField>

        {/* Confirm new password */}
        <FormField label="Confirm new password" htmlFor="confirmPassword">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm new password"
            autoComplete="new-password"
            disabled={isPending}
          />
        </FormField>

        <SubmitButton disabled={isPending}>{isPending ? 'Changing...' : 'Change Password'}</SubmitButton>
      </form>
    </div>
  );
}

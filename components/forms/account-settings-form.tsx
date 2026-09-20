'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Loader2, LogOut, Monitor, Smartphone, UserRound } from 'lucide-react';
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

  // Session state
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [isRevokingSessions, setIsRevokingSessions] = useState(false);

  /**
   * Fetch active sessions
   */
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const { data, error } = await authClient.listSessions();

        if (error) {
          console.error('Failed to fetch sessions:', error);
          toast.error('Could not load active sessions.');
          return;
        }

        setSessions((data ?? []) as UserSession[]);
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
        toast.error('Something went wrong while loading sessions.');
      } finally {
        setIsLoadingSessions(false);
      }
    };

    fetchSessions();
  }, []);

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      const next = { ...prev };

      delete next[field];

      return next;
    });
  };

  /**
   * Revoke all other sessions
   */
  const handleRevokeOtherSessions = async () => {
    setIsRevokingSessions(true);

    try {
      const { error } = await authClient.revokeOtherSessions();

      if (error) {
        toast.error(error.message || 'Could not sign out from other sessions.');

        return;
      }

      toast.success('You have been signed out from all other devices.');

      const { data, error: sessionsError } = await authClient.listSessions();

      if (sessionsError) {
        console.error('Failed to refresh sessions:', sessionsError);
        return;
      }

      setSessions((data ?? []) as UserSession[]);
    } catch (error) {
      console.error('Failed to revoke other sessions:', error);

      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsRevokingSessions(false);
    }
  };

  /**
   * Detect device icon
   */
  const getDeviceIcon = (userAgent?: string | null) => {
    if (!userAgent) {
      return <Monitor className="h-6 w-6 text-gray-500" />;
    }

    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);

    return isMobile ? <Smartphone className="h-6 w-6 text-gray-500" /> : <Monitor className="h-6 w-6 text-gray-500" />;
  };

  /**
   * Format session date
   */
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  /**
   * Update account
   */
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
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
      <div className="rounded-2xl border border-[#C09721] bg-white p-10 shadow-lg">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FBF8F0]">
            <UserRound className="h-7 w-7 text-[#C09721]" />
          </div>

          <h1 className="text-3xl font-semibold text-gray-900">Account settings</h1>
          <p className="mt-3 text-base leading-relaxed text-gray-600">Update your account information below.</p>
        </div>

        {/* Account Form */}
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

        {/* Navigation */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center">
          <Link href="/" className="text-base text-gray-600 transition-colors hover:text-[#C09721] hover:underline">
            Back to home
          </Link>

          <Link
            href="/account/forgot-password"
            className="text-base font-medium text-[#C09721] transition-colors hover:text-[#96751A] hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      {/* Security Card */}
      <div className="rounded-2xl border border-[#C09721] bg-white p-10 shadow-lg">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-900">Security</h2>

          <p className="mt-3 text-base leading-relaxed text-gray-600">
            Manage your active sessions and account security.
          </p>
        </div>

        {/* Active Sessions */}
        <div>
          <div className="mb-5">
            <h3 className="text-xl font-semibold text-gray-900">Active sessions</h3>

            <p className="mt-2 text-base leading-relaxed text-gray-600">
              These are the devices where your account is currently signed in.
            </p>
          </div>

          {/* Loading */}
          {isLoadingSessions && (
            <div className="flex items-center gap-3 text-base text-gray-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading sessions...
            </div>
          )}

          {/* Empty State */}
          {!isLoadingSessions && sessions.length === 0 && (
            <p className="rounded-xl bg-[#FBF8F0] p-5 text-base text-gray-600">No active sessions found.</p>
          )}

          {/* Sessions List */}
          {!isLoadingSessions && sessions.length > 0 && (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getDeviceIcon(session.userAgent)}</div>

                    <div className="min-w-0 flex-1">
                      <p className="text-base font-medium break-words text-gray-900">
                        {session.userAgent || 'Unknown device'}
                      </p>

                      {session.ipAddress && (
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">IP address: {session.ipAddress}</p>
                      )}

                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        Created: {formatDate(session.createdAt)}
                      </p>

                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        Expires: {formatDate(session.expiresAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Revoke Sessions */}
          <button
            type="button"
            onClick={handleRevokeOtherSessions}
            disabled={isRevokingSessions || sessions.length <= 1}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-red-300 px-5 py-3.5 text-base font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isRevokingSessions ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogOut className="h-5 w-5" />}

            {isRevokingSessions ? 'Signing out...' : 'Sign out other sessions'}
          </button>

          {sessions.length <= 1 && !isLoadingSessions && (
            <p className="mt-3 text-center text-sm text-gray-500">You have no other active sessions.</p>
          )}
        </div>
      </div>
    </div>
  );
}

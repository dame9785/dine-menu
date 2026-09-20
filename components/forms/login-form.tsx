'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/auth-client';

import Input from '@/components/ui/input';
import SubmitButton from '@/components/ui/submit-button';
import FormField from '@/components/ui/form-field';
import { loginSchema } from '@/schemas/account';

export default function LoginForm() {
  const router = useRouter();

  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
    general?: string;
  }>({});

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = {
      email,
      password,
    };

    const validation = loginSchema.safeParse(formData);

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onResponse: () => {
          setPending(false);
        },
        onSuccess: () => {
          router.push('/');
        },
        onError: ({ error }) => {
          setErrors({
            general: error.message || 'Something went wrong. Please try again.',
          });
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.general && (
        <p role="alert" className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errors.general}
        </p>
      )}
      {/* Email */}
      <FormField label="Email address" htmlFor="email" error={errors.email?.[0]}>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="example@live.se"
          autoComplete="email"
          disabled={isPending}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
      </FormField>

      {/* Password */}
      <FormField label="Password" htmlFor="password">
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          disabled={isPending}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
      </FormField>

      {/* Submit */}
      <SubmitButton disabled={isPending}>{isPending ? 'Logging in...' : 'Login'}</SubmitButton>
    </form>
  );
}

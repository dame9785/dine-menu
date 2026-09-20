'use client';

import { authClient } from '@/lib/auth-client';
import { FormEvent, useState } from 'react';
import Input from '@/components/ui/input';
import SubmitButton from '@/components/ui/submit-button';
import FormField from '../ui/form-field';
import { registerAccountSchema } from '@/schemas/account';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type FormErrors = Record<string, string[]>;

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      const next = { ...prev };

      delete next[field];

      return next;
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setLoading(true);

    const data = {
      name,
      email,
      password,
    };

    // Validate form data
    const validation = registerAccountSchema.safeParse(data);

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      setLoading(false);
      return;
    }

    setIsPending(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setError(error.message || 'Registration failed.');
        return;
      }

      toast.success('Account successfully register!');
      router.push('/');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <FormField label="name" htmlFor="email" error={errors.name?.[0]}>
        <Input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            clearError('name');
            setError('');
          }}
          placeholder="Enter your name"
          autoComplete="name"
          disabled={loading}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
      </FormField>

      {/* Email */}
      <FormField label="email" htmlFor="email" error={errors.email?.[0]}>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            clearError('email');
            setError('');
          }}
          placeholder="Enter your email"
          autoComplete="email"
          disabled={loading}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
      </FormField>

      {/* Password */}
      <FormField label="password" htmlFor="password" error={errors.password?.[0]}>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            clearError('password');
            setError('');
          }}
          placeholder="Enter password"
          autoComplete="password"
          disabled={loading}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
      </FormField>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
      <SubmitButton disabled={isPending}>{isPending ? 'Register...' : 'Register account'}</SubmitButton>
    </form>
  );
}

'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';
import { loginSchema } from '@/schemas/account';

import Input from '@/components/ui/input';
import SubmitButton from '@/components/ui/submit-button';
import FormField from '@/components/ui/form-field';

type FormErrors = Record<string, string[]>;

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrors({});

    const formData = {
      email: email.trim().toLowerCase(),
      password,
    };

    // Validate form data
    const validation = loginSchema.safeParse(formData);

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    const { email: validatedEmail, password: validatedPassword } = validation.data;

    setIsPending(true);

    try {
      const { error } = await authClient.signIn.email({
        email: validatedEmail,
        password: validatedPassword,
      });

      if (error) {
        toast.error(error.message || 'Invalid email or password.');
        return;
      }

      toast.success('Logged in successfully!');

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Login error:', error);

      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
      <FormField label="Password" htmlFor="password" error={errors.password?.[0]}>
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

'use client';

import { authClient } from '@/lib/auth-client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import Input from '@/components/ui/input';
import SubmitButton from '@/components/ui/submit-button';
import FormField from '../ui/form-field';

import { registerAccountSchema } from '@/schemas/account';
import { createCompany } from '@/actions/company';
import { toast } from 'sonner';

type FormErrors = Record<string, string[]>;

export default function RegisterForm() {
  const router = useRouter();

  const [createCompanyAccount, setCreateCompanyAccount] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrors({});
    setError('');
    setIsPending(true);

    const data = {
      name: name,
      email: email,
      password,
      company: company,
    };

    const validation = registerAccountSchema.safeParse(data);

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      setIsPending(false);
      return;
    }

    try {
      // Skapa användarkonto
      const { error: signUpError } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (signUpError) {
        setError(signUpError.message || 'Registration failed.');
        return;
      }

      // Skapa företag om företagsnamn har angetts
      if (data.company) {
        const companyResponse = await createCompany(data.company);

        if (!companyResponse.success) {
          toast.warning('Account created, but company registration failed.');

          router.push('/');
          return;
        }
      }

      toast.success('Account successfully registered!');

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Registration error:', error);

      setError('Something went wrong. Please try again.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <FormField label="name" htmlFor="name" error={errors.name?.[0]}>
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
          disabled={isPending}
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
          disabled={isPending}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
      </FormField>

      {/* Create company */}
      <div className="flex items-center gap-3">
        <input
          id="createCompanyAccount"
          name="createCompanyAccount"
          type="checkbox"
          checked={createCompanyAccount}
          onChange={(event) => {
            const checked = event.target.checked;

            setCreateCompanyAccount(checked);
            clearError('company');
            setError('');

            if (!checked) {
              setCompany('');
            }
          }}
          disabled={isPending}
          className="h-4 w-4"
        />

        <label htmlFor="createCompanyAccount" className="text-sm">
          I want to create a company account
        </label>
      </div>
      {createCompanyAccount && (
        <FormField label="company" htmlFor="company" error={errors.company?.[0]}>
          <Input
            id="company"
            name="company"
            type="text"
            value={company}
            onChange={(event) => {
              setCompany(event.target.value);
              clearError('company');
              setError('');
            }}
            placeholder="Enter company name"
            autoComplete="organization"
            disabled={isPending}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
          />
        </FormField>
      )}

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
          autoComplete="new-password"
          disabled={isPending}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
      </FormField>

      {/* General error */}
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
      <SubmitButton disabled={isPending}>{isPending ? 'Registering...' : 'Register account'}</SubmitButton>
    </form>
  );
}

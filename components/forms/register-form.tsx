'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import Input from '@/components/ui/input';
import SubmitButton from '@/components/ui/submit-button';
import FormField from '../ui/form-field';

import { createCompany } from '@/actions/company';
import { toast } from 'sonner';
import { User2, MailBadge, Building, LockKeyhole } from 'lucide-react';
import { signUpEmailAction } from '@/actions/account';

export default function RegisterForm() {
  const router = useRouter();

  const [createCompanyAccount, setCreateCompanyAccount] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');

  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
    general?: string;
  }>({});

  const [error, setError] = useState('');
  const [isPending, setPending] = useState(false);

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setPending(true);
    setErrors({});

    try {
      const formData = new FormData(evt.currentTarget);
      const result = await signUpEmailAction(formData);

      if (!result.success) {
        toast.error(result.message, { duration: 1000 });

        setErrors(result.errors ?? {});
        return;
      }

      if (company) {
        const companyResponse = await createCompany(company);
        if (!companyResponse.success) {
          toast.warning('Account created, but company registration failed.');

          router.push('/');
          return;
        }
      }

      router.replace('/');
      router.refresh();
      return toast.success(result.message);
    } catch (error) {
      console.error('Register user form error:', error);

      toast.error('Something went wrong. Please try again.', {
        duration: 2000,
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.general && (
        <p role="alert" className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errors.general}
        </p>
      )}
      {/* Name */}
      <FormField label="name" htmlFor="name" icon={<User2 className="h-5 w-5" />}>
        <Input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError('');
          }}
          placeholder="Enter your name"
          autoComplete="name"
          disabled={isPending}
        />
      </FormField>

      {/* Email */}
      <FormField label="email" htmlFor="email" icon={<MailBadge className="h-5 w-5" />}>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
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
        <FormField label="company" htmlFor="company" icon={<Building className="h-5 w-5" />}>
          <Input
            id="company"
            name="company"
            type="text"
            value={company}
            onChange={(event) => {
              setCompany(event.target.value);
              setError('');
            }}
            placeholder="Enter company name"
            autoComplete="organization"
            disabled={isPending}
          />
        </FormField>
      )}

      {/* Password */}
      <FormField
        label="password"
        htmlFor="password"
        icon={<LockKeyhole className="h-5 w-5" />}
        error={errors.password?.[0]}
      >
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
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

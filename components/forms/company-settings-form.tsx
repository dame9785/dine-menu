'use client';

import { CompanyViewModel } from '@/types/menu';

import FormField from '../ui/form-field';
import Input from '../ui/input';
import SubmitButton from '../ui/submit-button';
import { FormEvent, useState } from 'react';
import { Mail } from 'lucide-react';

type Props = {
  company: CompanyViewModel;
};

export default function CompanySettingsForm({ company }: Props) {
  const [errors, setErrors] = useState<{
    name?: string[];
  }>({});

  const [isPending, setPending] = useState(false);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <FormField label="Company name" htmlFor="name" error={errors.name?.[0]} icon={<Mail className="h-4 w-4" />}>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="example AB"
          autoComplete="name"
          disabled={isPending}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
      </FormField>

      {/* Submit */}
      <SubmitButton disabled={isPending}>{isPending ? 'Updating...' : 'Update account'}</SubmitButton>
    </form>
  );
}

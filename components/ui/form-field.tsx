import type { ReactNode } from 'react';

type Props = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
};

export default function FormField({ label, htmlFor, error, children }: Props) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-base font-semibold text-slate-800">
        {label}
      </label>

      {children}

      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

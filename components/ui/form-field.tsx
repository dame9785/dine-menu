import type { ReactNode } from 'react';

type Props = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  icon?: ReactNode;
};

export default function FormField({ label, htmlFor, error, children, icon }: Props) {
  return (
    <div className="space-y-3">
      <label htmlFor={htmlFor} className="flex items-center gap-2 text-base leading-none font-semibold text-[#D4AF37]">
        {icon && (
          <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-[#C09721]">{icon}</span>
        )}

        <span>{label}</span>
      </label>

      {children}

      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-sm font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

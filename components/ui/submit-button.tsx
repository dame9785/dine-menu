'use client';

import type { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type Props = {
  children: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function SubmitButton({ children, isLoading = false, disabled = false, className = '' }: Props) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={`group inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-4xl border border-[#C09721]/50 bg-gradient-to-r from-[#181404] via-[#2A2109] to-[#181404] font-semibold text-[#D4AF37] shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#E5C76B]/80 hover:bg-[#3A2D0C] hover:text-[#F0D98A] hover:shadow-[0_0_25px_rgba(192,151,33,0.22),0_8px_25px_rgba(0,0,0,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none ${className}`}
    >
      {isLoading && <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden="true" />}

      {children}
    </button>
  );
}

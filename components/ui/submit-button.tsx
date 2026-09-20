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
      className={`inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#C09721]/40 bg-white px-5 text-base leading-relaxed font-semibold text-[#8B6914] shadow-sm transition-colors duration-200 outline-none hover:border-[#C09721] hover:bg-[#FFFCF5] hover:text-[#A77F18] hover:shadow-md hover:shadow-[#C09721]/15 focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/15 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-sm ${className} `}
    >
      {isLoading && <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden="true" />}

      {children}
    </button>
  );
}

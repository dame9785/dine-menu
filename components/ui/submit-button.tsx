'use client';

import { Loader2 } from 'lucide-react';

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function SubmitButton({ children, isLoading = false, disabled = false, className = '' }: Props) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className={`inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#C09721]/30 bg-white p-3 text-sm font-medium text-[#8B6914] shadow-sm transition-all duration-200 ease-out outline-none hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#FFFCF5] hover:text-[#A77F18] hover:shadow-md hover:shadow-[#C09721]/15 focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${className} `}
    >
      {isLoading && <Loader2 className="h-4 w-4 shrink-0 animate-spin" />}

      {children}
    </button>
  );
}

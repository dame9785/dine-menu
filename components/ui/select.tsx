import type { SelectHTMLAttributes } from 'react';

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ className = '', children, ...props }: Props) {
  return (
    <select
      {...props}
      className={`w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-all duration-200 outline-none hover:border-[#C09721] focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 ${className}`}
    >
      {children}
    </select>
  );
}

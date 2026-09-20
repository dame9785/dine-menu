import type { SelectHTMLAttributes } from 'react';

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ className = '', children, ...props }: Props) {
  return (
    <select
      {...props}
      className={`h-12 w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 text-base leading-relaxed text-slate-900 shadow-sm transition-colors duration-200 outline-none hover:border-[#C09721] focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/15 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 ${className} `}
    >
      {children}
    </select>
  );
}

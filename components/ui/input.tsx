import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = '', ...props }: Props) {
  return (
    <input
      {...props}
      className={`h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base leading-relaxed text-slate-900 shadow-sm transition-colors duration-200 outline-none placeholder:text-base placeholder:text-slate-400 hover:border-[#C09721] focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/15 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 ${className} `}
    />
  );
}

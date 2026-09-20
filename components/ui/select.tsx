import type { SelectHTMLAttributes } from 'react';

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ className = '', children, ...props }: Props) {
  return (
    <select
      {...props}
      className={`h-12 w-full rounded-xl border border-[#C09721]/35 bg-white px-4 text-base leading-relaxed text-[#765315] shadow-sm ring-0 transition-all duration-300 ease-out outline-none placeholder:text-sm placeholder:font-normal placeholder:tracking-wide placeholder:text-slate-400 placeholder:transition-colors placeholder:duration-300 hover:border-[#C09721]/80 hover:bg-[#FFFCF5] hover:shadow-[0_3px_12px_rgba(192,151,33,0.08)] focus:border-[#C09721] focus:bg-[#FFFCF5] focus:shadow-[0_3px_14px_rgba(192,151,33,0.10)] focus:ring-0 focus:outline-none focus:placeholder:text-[#C09721]/50 focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 ${className} `}
    >
      {children}
    </select>
  );
}

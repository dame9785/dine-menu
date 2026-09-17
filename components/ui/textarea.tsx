import type { TextareaHTMLAttributes } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({ className = '', ...props }: Props) {
  return (
    <textarea
      {...props}
      className={`w-full cursor-text rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-all duration-200 outline-none placeholder:text-base placeholder:text-slate-400 hover:border-[#C09721] focus:border-[#C09721] focus:ring-4 focus:ring-[#C09721]/10 ${className}`}
    />
  );
}

import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = '', ...props }: Props) {
  return (
    <input
      {...props}
      className={`h-12 w-full rounded-xl border border-[#C09721]/30 bg-[#181714] px-4 text-base leading-relaxed text-[#E8E4D8] outline-none placeholder:text-sm placeholder:font-normal placeholder:tracking-wide placeholder:text-[#777267] placeholder:transition-colors placeholder:duration-300 hover:bg-[#141209] ${className} `}
    />
  );
}

import type { TextareaHTMLAttributes } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({ className = '', ...props }: Props) {
  return (
    <textarea
      {...props}
      className={`h-15 w-full rounded-xl border border-[#C09721]/30 bg-[#181714] px-4 py-3 text-base leading-relaxed text-[#E8E4D8] outline-none placeholder:text-sm placeholder:font-normal placeholder:tracking-wide placeholder:text-[#777267] placeholder:transition-colors placeholder:duration-300 hover:bg-[#141209] ${className} `}
    />
  );
}

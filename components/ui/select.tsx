import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ className = '', children, ...props }: Props) {
  return (
    <div className="group relative w-full">
      <select
        {...props}
        className={`h-12 w-full appearance-none rounded-xl border border-[#C09721]/30 bg-[#181714] px-4 pr-12 text-base leading-relaxed text-[#E8E4D8] transition-colors duration-300 outline-none placeholder:text-sm placeholder:font-normal placeholder:tracking-wide placeholder:text-[#777267] hover:bg-[#141209] focus:border-[#C09721]/60 ${className} `}
      >
        {children}
      </select>

      {/* Custom dropdown icon */}
      <ChevronDown
        size={17}
        strokeWidth={1.7}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-[#C09721]/70 transition-all duration-300 group-focus-within:rotate-180 group-focus-within:text-[#E5C76B] group-hover:text-[#E5C76B]"
      />

      {/* Subtle bottom accent */}
      <span className="pointer-events-none absolute right-4 bottom-0 left-4 h-px origin-center scale-x-0 bg-linear-to-r from-transparent via-[#C09721] to-transparent transition-transform duration-300 group-focus-within:scale-x-100" />
    </div>
  );
}

'use client';

import { Plus } from 'lucide-react';

type Props = {
  onClick: () => void;
};

export default function AddMenuButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex h-12 w-55 cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-[#C09721]/30 bg-[#181714] px-4 text-sm font-semibold tracking-wide text-[#B5B0A3] shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#C09721] hover:bg-[#24200F] hover:text-[#E5C76B] hover:shadow-[0_0_22px_rgba(192,151,33,0.12)] focus-visible:ring-2 focus-visible:ring-[#C09721]/50 focus-visible:outline-none active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Plus size={17} aria-hidden="true" className="transition-transform duration-300 group-hover:-rotate-45" />

      <span>Add menu</span>
    </button>
  );
}

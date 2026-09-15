import Link from 'next/link';
import { RotateCcw } from 'lucide-react';

export default function ResetFilteringButton() {
  return (
    <Link
      href="/"
      className="
        group flex cursor-pointer items-center gap-2
        rounded-xl border border-slate-200
        bg-white px-4 py-2.5
        text-sm font-medium text-slate-500
        shadow-sm
        transition-all duration-200
        hover:border-red-200
        hover:bg-red-50
        hover:text-red-600
      "
    >
      <RotateCcw size={17} className="transition-transform duration-300 group-hover:-rotate-45" />

      <span>Reset filtering</span>
    </Link>
  );
}

import Link from 'next/link';
import { Trash } from 'lucide-react';

export default function ResetFilteringButton() {
  return (
    <Link
      href="/"
      className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-800 bg-[#0b1120] p-2 text-slate-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
    >
      <Trash size={18} />
      <span>Reset filtering</span>
    </Link>
  );
}

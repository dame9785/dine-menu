import Link from "next/link";
import { House, Utensils, Folder } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed flex h-screen w-64 flex-col border-r border-slate-700/50 bg-linear-to-b from-slate-900 via-slate-950 to-indigo-950/40 text-white shadow-2xl">
      <div className="border-b border-slate-700/50 px-6 py-6">
        <h3 className="text-lg font-semibold tracking-wide text-indigo-300 flex gap-4 items-center">
          <Utensils size={20} />
          Dine menu
        </h3>
      </div>
      <nav className="px-3 py-5">
        <ul className="space-y-2">
          <li className="flex items-center gap-1">
            <House size={20} />
            <Link
              href="/"
              className="block rounded-lg px-4 py-3 text-slate-300 transition-all hover:bg-indigo-500/10 hover:text-indigo-300"
            >
              Home
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <Folder size={20} />
            <Link
              href="/category"
              className="block rounded-lg px-4 py-3 text-slate-300 transition-all hover:bg-indigo-500/10 hover:text-indigo-300"
            >
              Categories
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

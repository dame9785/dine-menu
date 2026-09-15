import Link from 'next/link';
import { House, Utensils, Folder } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-200 bg-white shadow-[4px_0_24px_rgba(15,23,42,0.04)]">
      {/* Logo */}
      <div className="border-b border-slate-100 px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
            <Utensils size={19} />
          </div>

          <div>
            <h3 className="text-base font-bold tracking-tight text-slate-900">Dine</h3>

            <p className="text-xs font-medium text-slate-400">MENU</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">Navigation</p>

        <ul className="space-y-1">
          <li>
            <Link
              href="/"
              className="group flex items-center gap-3 rounded-xl bg-indigo-50 px-3 py-3 text-sm font-medium text-indigo-700 transition-all hover:bg-indigo-100"
            >
              <House size={18} className="text-indigo-600" />

              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link
              href="/category"
              className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900"
            >
              <Folder size={18} className="text-slate-400 transition-colors group-hover:text-indigo-600" />

              <span>Categories</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-100 p-4">
        <div className="rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-medium text-slate-500">Dine Menu</p>

          <p className="mt-1 text-[11px] text-slate-400">Restaurant management</p>
        </div>
      </div>
    </aside>
  );
}

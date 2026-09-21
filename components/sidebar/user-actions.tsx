'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { LogOut, User, Settings, ArrowUpRight } from 'lucide-react';

import { authClient } from '@/lib/auth-client';

export default function UserActions() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  async function handleLogout() {
    await authClient.signOut();

    router.push('/account/login');
    router.refresh();
  }

  if (isPending) {
    return (
      <div className="animate-pulse rounded-2xl border border-[#332D1F] bg-[#15130F] p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#2A2414]" />

          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 rounded bg-[#2A2414]" />
            <div className="h-2 w-16 rounded bg-[#211E17]" />
          </div>
        </div>
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="rounded-2xl border border-[#332D1F] bg-gradient-to-br from-[#1B1811] to-[#12110D] p-4">
      {/* User information */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C09721]/30 bg-[#2A2414] text-[#D4AF37]">
          <User size={18} strokeWidth={1.7} />
        </div>

        {/* Name */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#E5C76B]" title={user?.name ?? 'Guest'}>
            {user?.name ?? 'Guest'}
          </p>

          <p className="mt-0.5 text-[10px] tracking-wide text-[#777267]">{user ? 'Welcome back' : 'Not logged in'}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-[#332D1F]" />

      {user ? (
        <div className="space-y-2">
          {/* Account settings */}
          <Link
            href="/account/settings"
            className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-xs font-medium text-[#A6A39A] transition-all duration-300 hover:border-[#C09721]/20 hover:bg-[#2A2414] hover:text-[#E5C76B]"
          >
            <Settings
              size={15}
              strokeWidth={1.7}
              className="text-[#777267] transition-colors group-hover:text-[#C09721]"
            />

            <span className="flex-1">Account settings</span>

            <ArrowUpRight
              size={14}
              strokeWidth={1.7}
              className="text-[#5F584A] transition-colors group-hover:text-[#C09721]"
            />
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl border border-[#C09721]/20 bg-[#201B10] px-3 py-2.5 text-xs font-medium text-[#C09721] transition-all duration-300 hover:border-[#C09721]/50 hover:bg-[#C09721] hover:text-[#15130E]"
          >
            <LogOut
              size={15}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />

            <span className="flex-1 text-left">Logout</span>
          </button>
        </div>
      ) : (
        <Link
          href="/account/login"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#C09721]/40 bg-[#201B10] px-3 py-2.5 text-xs font-semibold text-[#D4AF37] transition-all duration-300 hover:border-[#C09721] hover:bg-[#C09721] hover:text-[#15130E]"
        >
          Login
          <ArrowUpRight size={14} strokeWidth={1.7} />
        </Link>
      )}
    </div>
  );
}

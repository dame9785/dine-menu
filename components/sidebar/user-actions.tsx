'use client';

import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

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
      <div className="animate-pulse rounded-2xl bg-[#FBF8F0] p-4">
        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E8D9B5] bg-[#FFFCF5] p-4">
      <div className="mb-3 flex w-full flex-col items-center gap-3">
        {session?.user ? (
          <>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8D9B5] text-[#8B6914]">
                <User size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-m truncate font-semibold text-[#5F4A20]">{session.user.name}</p>
                <Link href="/account/settings" className="font-bold underline">
                  Account settings{' '}
                </Link>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#C09721] px-3 py-2 text-sm font-medium text-[#8B6914] transition hover:bg-[#C09721] hover:text-white"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8D9B5] text-[#8B6914]">
                <User size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#5F4A20]">Guest</p>
                <p className="text-xs text-gray-500">Not logged in</p>
              </div>
              <Link
                href="/account/login"
                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#C09721] px-3 py-2 text-sm font-medium text-[#8B6914] transition hover:bg-[#C09721] hover:text-white"
              >
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

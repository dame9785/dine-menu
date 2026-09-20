import { getSession } from '@/lib/auth-guard';
import AccountSettingsForm from '@/components/forms/account-settings-form';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { LockKeyhole } from 'lucide-react';

export default async function AccountSettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FBF8F0] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#C09721] bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FBF8F0]">
            <LockKeyhole className="h-6 w-6 text-[#C09721]" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">Change account information</h1>
          <p className="mt-2 text-sm text-gray-500">Change your personal information</p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <AccountSettingsForm user={session.user} />
        </Suspense>
      </div>
    </main>
  );
}

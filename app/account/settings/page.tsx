import { getSession } from '@/lib/auth-guard';
import AccountSettingsForm from '@/components/forms/account-settings-form';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

export default async function AccountSettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FBF8F0] px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <AccountSettingsForm user={session.user} />
      </Suspense>
    </main>
  );
}

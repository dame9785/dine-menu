import CompanySettingsForm from '@/components/forms/company-settings-form';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { LockKeyhole } from 'lucide-react';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { CompanyMapper } from '@/server/mapping/company';

export default async function CompanySettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/account/login');
  }

  const company = await prisma.company.findFirst({
    where: {
      ownerId: session?.user.id,
    },
  });

  if (!company) {
    redirect('/');
  }

  const viewModel = CompanyMapper.companyDbToViewModel(company);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#C09721]/25 bg-[#121210]/95 p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FBF8F0]">
            <LockKeyhole className="h-6 w-6 text-[#C09721]" />
          </div>

          <h1 className="text-2xl font-semibold text-[#e5c76b]">Change company information</h1>
        </div>

        <CompanySettingsForm company={viewModel} />
      </div>
    </section>
  );
}

import { headers } from 'next/headers';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import Sidebar from './sidebar';

export default async function SidebarWrapper() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let isAdmin = false;
  let isCompany = false;
  let companyName: string | null = null;

  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        role: true,
      },
    });

    isAdmin = user?.role === 'admin';
    isCompany = user?.role === 'company';

    if (isCompany) {
      const company = await prisma.company.findFirst({
        where: {
          ownerId: session.user.id,
        },
        select: {
          name: true,
        },
      });

      companyName = company?.name ?? null;
    }
  }

  return <Sidebar isAdmin={isAdmin} isCompany={isCompany} companyName={companyName} />;
}

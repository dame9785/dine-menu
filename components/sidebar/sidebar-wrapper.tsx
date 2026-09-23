import { headers } from 'next/headers';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import Sidebar from './sidebar';
import { use } from 'react';

export default async function SidebarWrapper() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let isAdmin = false;
  let isCompany = false;

  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        role: true,
        company: true,
      },
    });

    isAdmin = user?.role === 'admin';
    isCompany = user?.role === 'company';

    console.log('USER', user);
  }

  return <Sidebar isAdmin={isAdmin} isCompany={isCompany} />;
}

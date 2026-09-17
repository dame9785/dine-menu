import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Sidebar from './sidebar';

export default async function SidebarWrapper() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let isAdmin = false;

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        role: true,
      },
    });

    isAdmin = user?.role === 'admin';
  }

  return <Sidebar isAdmin={isAdmin} />;
}

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function requireApiSession(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return {
      session: null,
      response: Response.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 },
      ),
    };
  }

  return {
    session,
    response: null,
  };
}

export async function requireApiAdmin(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return {
      session: null,
      response: Response.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 },
      ),
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      role: true,
    },
  });

  if (user?.role !== 'admin') {
    return {
      session: null,
      response: Response.json(
        {
          success: false,
          error: 'Forbidden',
        },
        { status: 403 },
      ),
    };
  }

  return {
    session,
    response: null,
  };
}

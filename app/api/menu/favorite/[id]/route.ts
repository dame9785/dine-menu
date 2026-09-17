import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { MenuService } from '@/server/services/menu';

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

const menuService = new MenuService();

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({
      success: false,
      message: 'You need to be logged in',
    });
  }

  try {
    const result = await menuService.addFavorite(session.user.id, Number(id));
    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('API ERROR /api/comment/post: ', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get menu items',
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({
      success: false,
      message: 'You need to be logged in',
    });
  }

  try {
    const result = await menuService.deleteFavorite(session.user.id, Number(id));
    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('FAVORITE/DELETE', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get menu items',
      },
      { status: 500 },
    );
  }
}

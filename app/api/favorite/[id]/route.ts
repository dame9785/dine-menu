import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { FoodService } from '@/server/services/food';

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

const foodService = new FoodService();

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
    const result = await foodService.addFavorite(session.user.id, Number(id));
    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('FAVORITE/POST', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get foods',
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
    const result = await foodService.deleteFavorite(session.user.id, Number(id));
    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('FAVORITE/DELETE', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get foods',
      },
      { status: 500 },
    );
  }
}

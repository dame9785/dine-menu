import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { FoodService } from '@/server/services/food';

const foodService = new FoodService();

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: 'You need to be logged in',
          data: [],
        },
        { status: 401 },
      );
    }

    const result = await foodService.getFavoriteIds(session.user.id);

    return NextResponse.json(result, {
      status: result.success ? 200 : 500,
    });
  } catch (error) {
    console.error('FAVORITES/GET IDS', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get favorite IDs',
        data: [],
      },
      { status: 500 },
    );
  }
}

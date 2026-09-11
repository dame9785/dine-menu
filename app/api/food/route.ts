import { ApiResponse } from '@/types/api-responses';
import { NextRequest, NextResponse } from 'next/server';
import { FoodService } from '@/server/services/food';

const foodService = new FoodService();
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const result = await foodService.addFood(formData);
    return NextResponse.json(result, { status: result.success ? 200 : 404 });
  } catch (error) {
    console.error('FOOD/POST', error);
    return {
      success: false,
      message: 'Failed to create category',
    } satisfies ApiResponse<[]>;
  }
}

export async function GET(request: NextRequest) {
  try {
    const pageParam = request.nextUrl.searchParams.get('page');
    const page = pageParam ? Number(pageParam) : 1;

    console.log('PAGE FROM URL:', page);

    const result = await foodService.getAll(page);

    console.log('FOODS RETURNED:', result.data.length);
    console.log('PAGINATION:', result.pagination);

    return NextResponse.json(result, {
      status: 200,
    });
  } catch (error) {
    console.error('FOOD/GET', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get foods',
      },
      { status: 500 },
    );
  }
}

import { ApiResponse } from '@/types/api-responses';
import { NextRequest, NextResponse } from 'next/server';
import { FoodService } from '@/server/services/food';

const foodService = new FoodService();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const result = await foodService.addFood(formData);

    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    });
  } catch (error) {
    console.error('FOOD/POST', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create food item.',
      } satisfies ApiResponse<[]>,
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const pageParam = request.nextUrl.searchParams.get('page');
    const page = pageParam ? Number(pageParam) : 1;

    const searchParam = request.nextUrl.searchParams.get('search') ?? '';

    const categoryParam = request.nextUrl.searchParams.get('category') ?? ';';

    const filterParam = request.nextUrl.searchParams.get('filter') ?? '';

    const sortByParam = request.nextUrl.searchParams.get('sortBy') ?? '';

    const result = await foodService.getAll(page, searchParam, categoryParam, filterParam, sortByParam);

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

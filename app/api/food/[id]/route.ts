import { FoodService } from '@/server/services/food';
import { ApiResponse } from '@/types/api-responses';
import { NextResponse } from 'next/server';

const foodService = new FoodService();

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await foodService.delete(Number(id));
    return NextResponse.json(result, { status: result.success ? 200 : 404 });
  } catch (error) {
    console.error('FOOD/{ID}/DELETE', error);
    return {
      success: false,
      message: 'Failed to delete food item.',
    } satisfies ApiResponse<[]>;
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await foodService.getById(Number(id));
    return NextResponse.json(result, { status: result.success ? 202 : 404 });
  } catch (error) {
    console.error('Food/{ID}/DELETE', error);
    return {
      success: false,
      message: 'Failed to fetching food item',
    } satisfies ApiResponse<[]>;
  }
}

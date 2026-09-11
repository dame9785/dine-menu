import { ApiResponse } from '@/types/api-responses';
import { FoodDto } from '@/types/food';
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

export async function GET() {
  try {
    const result = await foodService.getAll();
    return NextResponse.json(result, { status: result ? 200 : 404 });
  } catch (error) {
    console.error('FOOD/GET', error);
    return {
      success: false,
      message: 'Failed to create category',
    } satisfies ApiResponse<[]>;
  }
}

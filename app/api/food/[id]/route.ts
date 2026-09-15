import { FoodService } from '@/server/services/food';
import { ApiResponse } from '@/types/api-responses';
import { FoodViewModel } from '@/types/food';
import { Route } from 'next';
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

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    console.log(id);
    console.log(formData);
    const result = await foodService.update(Number(id), formData);
    return NextResponse.json(result, { status: result.success ? 202 : 404 });
  } catch (error) {
    console.error('Food/{ID}/UPDATE', error);
    return {
      success: false,
      message: 'Failed to fetching food item',
    } satisfies ApiResponse<FoodViewModel>;
  }
}

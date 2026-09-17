import { requireApiAdmin } from '@/lib/api-auth-guard';
import { FoodService } from '@/server/services/food';
import { ApiResponse } from '@/types/api-responses';
import { FoodViewModel } from '@/types/food';
import { NextResponse } from 'next/server';

const foodService = new FoodService();

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { response } = await requireApiAdmin(request);

    if (response) {
      return response;
    }

    const { id } = await params;

    const result = await foodService.delete(Number(id));

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('FOOD/{ID}/DELETE', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete food item.',
      } satisfies ApiResponse<[]>,
      { status: 500 },
    );
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const result = await foodService.getById(Number(id));

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('FOOD/{ID}/GET', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch food item.',
      } satisfies ApiResponse<[]>,
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const formData = await request.formData();

    const result = await foodService.update(Number(id), formData);

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('FOOD/{ID}/UPDATE', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update food item.',
      } satisfies ApiResponse<FoodViewModel>,
      { status: 500 },
    );
  }
}

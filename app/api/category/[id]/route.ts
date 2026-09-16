import { CategoryDto } from '@/schemas/category';

import { CategoryService } from '@/server/services/category';

import { ApiResponse } from '@/types/api-responses';

import { NextResponse } from 'next/server';

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

const categoryService = new CategoryService();

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const result = await categoryService.delete(Number(id));

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('CATEGORY/{ID}/DELETE', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete category',
      } satisfies ApiResponse<[]>,
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const dto: CategoryDto = await request.json();

    const result = await categoryService.update(dto, Number(id));

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('CATEGORY/{ID}/PUT', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update category',
      } satisfies ApiResponse<[]>,
      { status: 500 },
    );
  }
}

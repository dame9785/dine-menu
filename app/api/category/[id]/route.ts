import { CategoryService } from '@/server/services/category';
import { ApiResponse } from '@/types/api-responses';
import { CategoryDto } from '@/types/category';
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
    return NextResponse.json(result, { status: result.success ? 200 : 404 });
  } catch (error) {
    console.error('CATEGORY/{ID}/DELETE', error);
    return {
      success: false,
      message: 'Failed to create category',
    } satisfies ApiResponse<[]>;
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    console.log('ID', id);
    const dto: CategoryDto = await request.json();
    console.log('DTO', dto);
    const result = await categoryService.update(dto, Number(id));
    return NextResponse.json(result, { status: result.success ? 200 : 404 });
  } catch (error) {
    console.error('CATEGORY/{ID}/PUT', error);
    return {
      success: false,
      message: 'Failed to update category',
    } satisfies ApiResponse<[]>;
  }
}

import { ApiResponse } from '@/types/api-responses';
import { CategoryService } from '@/server/services/category';
import { CategoryDto } from '@/types/category';
import { NextResponse } from 'next/server';

const categoryService = new CategoryService();

export async function GET() {
  try {
    const result = await categoryService.getAll();
    return NextResponse.json(result, { status: result.success ? 200 : 404 });
  } catch (error) {
    console.error('CATEGORIES/GET', error);
    return {
      success: false,
      message: 'Failed to create category',
    } satisfies ApiResponse<[]>;
  }
}

export async function POST(request: Request) {
  try {
    const dto: CategoryDto = await request.json();
    const result = await categoryService.create(dto);
    return NextResponse.json(result, { status: result.success ? 200 : 404 });
  } catch (error) {
    console.error('CATEGORY/POST', error);
    return {
      success: false,
      message: 'Failed to create category',
    } satisfies ApiResponse<[]>;
  }
}

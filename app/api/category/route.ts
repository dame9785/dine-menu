import { ApiResponse, CategoryApiResponse } from '@/types/api-responses';
import { CategoryService } from '@/server/services/category';
import { requireApiAdmin } from '@/lib/api-auth-guard';

import { NextRequest, NextResponse } from 'next/server';
import { CategoryDto } from '@/schemas/category';

const categoryService = new CategoryService();

export async function GET(request: NextRequest) {
  try {
    const pageParam = request.nextUrl.searchParams.get('page');
    const page = pageParam ? Number(pageParam) : 1;

    if (!Number.isInteger(page) || page < 1) {
      return NextResponse.json(
        {
          success: false,
          message: 'Page must be a positive integer.',
          data: [],
          pagination: null,
        } satisfies CategoryApiResponse,
        { status: 400 },
      );
    }

    const result = await categoryService.getAll(page);

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('API ERROR /api/category/get: ', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch categories',
        data: [],
        pagination: null,
      } satisfies CategoryApiResponse,
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { response } = await requireApiAdmin(request);

    if (response) {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }

    const dto: CategoryDto = await request.json();

    const result = await categoryService.create(dto);

    return NextResponse.json(result, {
      status: result.success ? 201 : 400,
    });
  } catch (error) {
    console.error('CATEGORY/POST', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create category',
      } satisfies ApiResponse<[]>,
      { status: 500 },
    );
  }
}

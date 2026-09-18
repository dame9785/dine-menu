import { auth } from '@/lib/auth';
import { CategoryDto } from '@/schemas/category';

import { CategoryService } from '@/server/services/category';

import { ApiResponse } from '@/types/api-responses';
import { headers } from 'next/headers';

import { NextResponse } from 'next/server';

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

const categoryService = new CategoryService();

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: 'You need to be logged in',
          data: [],
        },
        { status: 400 },
      );
    }

    if (session.user.role !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          message: 'You are not authorized.',
          data: [],
        },
        { status: 403 },
      );
    }

    const { id } = await params;
    const categoryId = Number(id);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid category ID.',
          data: [],
        },
        { status: 400 },
      );
    }

    const result = await categoryService.delete(categoryId);

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('API ERROR /api/category/delete: ', error);

    return NextResponse.json(
      {
        success: false,
        message: 'API ERROR: Failed to delete category',
      } satisfies ApiResponse<[]>,
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: 'You need to be logged in',
          data: [],
        },
        { status: 400 },
      );
    }

    if (session.user.role !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          message: 'You are not authorized.',
          data: [],
        },
        { status: 403 },
      );
    }

    const { id } = await params;

    const categoryId = Number(id);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid category ID.',
          data: [],
        },
        { status: 400 },
      );
    }

    const dto: CategoryDto = await request.json();

    const result = await categoryService.update(dto, categoryId);

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('API ERROR /api/category/put: ', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update category',
      } satisfies ApiResponse<[]>,
      { status: 500 },
    );
  }
}

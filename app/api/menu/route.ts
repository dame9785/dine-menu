import { ApiResponse } from '@/types/api-responses';
import { NextRequest, NextResponse } from 'next/server';
import { MenuService } from '@/server/services/menu';
import { requireApiAdmin } from '@/lib/api-auth-guard';
import { auth } from '@/lib/auth';

const menuService = new MenuService();

export async function POST(request: NextRequest) {
  try {
    const { response, session } = await requireApiAdmin(request);

    if (response) {
      return response;
    }

    const formData = await request.formData();

    const result = await menuService.add(formData);

    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    });
  } catch (error) {
    console.error('MENU/POST', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create menu item.',
      } satisfies ApiResponse<[]>,
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    const userId = session?.user?.id;

    const pageParam = request.nextUrl.searchParams.get('page');
    const page = pageParam ? Number(pageParam) : 1;

    const searchParam = request.nextUrl.searchParams.get('search') ?? '';
    const categoryParam = request.nextUrl.searchParams.get('category') ?? '';
    const filterParam = request.nextUrl.searchParams.get('filter') ?? '';
    const sortByParam = request.nextUrl.searchParams.get('sortBy') ?? '';

    const result = await menuService.getAll(page, searchParam, categoryParam, filterParam, sortByParam, userId);

    return NextResponse.json(result, {
      status: 200,
    });
  } catch (error) {
    console.error('MENU/GET', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get menu items',
      },
      { status: 500 },
    );
  }
}

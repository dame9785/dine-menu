import { requireApiAdmin } from '@/lib/api-auth-guard';
import { MenuService } from '@/server/services/menu';
import { ApiResponse } from '@/types/api-responses';
import { MenuItemViewModel } from '@/types/menu';
import { NextResponse } from 'next/server';

const menuService = new MenuService();

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

    const result = await menuService.delete(Number(id));

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('MENU/{ID}/DELETE', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete menu item.',
      } satisfies ApiResponse<[]>,
      { status: 500 },
    );
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const result = await menuService.getById(Number(id));

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('MENU/{ID}/GET', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch menu item.',
      } satisfies ApiResponse<[]>,
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const formData = await request.formData();

    const result = await menuService.update(Number(id), formData);

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('MENU/{ID}/UPDATE', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update menu item.',
      } satisfies ApiResponse<MenuItemViewModel>,
      { status: 500 },
    );
  }
}

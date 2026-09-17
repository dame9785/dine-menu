'use server';

import { MenuService } from '@/services/menu';
import { revalidatePath } from 'next/cache';
import { checkAdmin, requireSession } from '@/lib/auth-guard';
import { ApiResponse } from '@/types/api-responses';

const menuService = new MenuService();

export async function addMenuItem(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    const adminCheck = await checkAdmin();

    if (!adminCheck.authorized) {
      return {
        success: false,
        message: adminCheck.message,
      };
    }

    const response = await menuService.add(formData);

    if (!response.success) {
      return {
        success: false,
        message: response.message,
      };
    }

    revalidatePath('/');

    return {
      success: true,
      message: response.message,
    };
  } catch (error) {
    console.error('DELETE MENU ITEM ACTION ERROR.', error);
    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}

export async function deleteMenuItem(menuItemId: number): Promise<{ success: boolean; message: string }> {
  try {
    const adminCheck = await checkAdmin();

    if (!adminCheck.authorized) {
      return {
        success: false,
        message: adminCheck.message,
      };
    }

    const response = await menuService.delete(menuItemId);

    if (!response.success) {
      return {
        success: false,
        message: response.message,
      };
    }

    revalidatePath('/');
    revalidatePath('/category');

    return {
      success: true,
      message: response.message,
    };
  } catch (error) {
    console.error('DELETE MENU ITEM ACTION ERROR:', error);

    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}

export async function updateMenuItem(menuItemId: number, formData: FormData) {
  try {
    const adminCheck = await checkAdmin();

    if (!adminCheck.authorized) {
      return {
        success: false,
        message: adminCheck.message,
      };
    }

    const response = await menuService.update(menuItemId, formData);

    if (!response.success) {
      return {
        success: false,
        message: response.message,
      };
    }

    revalidatePath('/');
    revalidatePath('/category');

    return {
      success: true,
      message: response.message,
    };
  } catch (error) {
    console.error('Update menu error:', error);

    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}

export async function addFavorite(menuItemId: number) {
  const session = requireSession();
  if (!session) {
    return {
      success: false,
      message: 'You need to be logged in.',
    };
  }

  try {
    const response = await menuService.addFavorite(menuItemId);
    if (!response.success) {
      return {
        success: false,
        message: response.message,
      };
    }

    revalidatePath('/');

    return {
      success: true,
      message: response.message,
    };
  } catch (error) {
    console.error('ADD MENU AS FAVORITE ERROR:', error);

    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}

export async function deleteFavorite(menuItemId: number) {
  try {
    const session = requireSession();
    if (!session) {
      return {
        success: false,
        message: 'You need to be logged in.',
      };
    }

    const response = await menuService.deleteFavorite(menuItemId);
    if (!response.success) {
      return {
        success: false,
        message: response.message,
      };
    }

    revalidatePath('/');

    return {
      success: true,
      message: response.message,
    };
  } catch (error) {
    console.error('DELETE MENU ACTION ERROR:', error);

    return {
      success: false,
      message: 'Couldt remove menu as favorite.',
    };
  }
}

export async function getFavoriteIds(): Promise<ApiResponse<number[]>> {
  try {
    const session = await requireSession();
    if (!session) {
      return {
        success: false,
        message: 'You need to be logged in.',
      };
    }

    const result = await menuService.getFavoriteIds();

    return result;
  } catch (error) {
    console.error('getFavoriteIds error:', error);

    return {
      success: false,
      message: 'Could not get favorite IDs.',
      data: [],
    };
  }
}

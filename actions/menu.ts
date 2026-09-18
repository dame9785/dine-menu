'use server';

import { MenuService } from '@/services/menu';
import { revalidatePath } from 'next/cache';
import { checkAdmin, requireSession } from '@/lib/auth-guard';
import { ApiResponse } from '@/types/api-responses';
import { AddMenuDto, addMenuSchema, UpdateMenuDto, updateMenuSchema } from '@/schemas/menu';
import { ActionResponse } from '@/types/action-response';

const menuService = new MenuService();

export async function addMenuItem(formData: FormData): Promise<ActionResponse> {
  try {
    const adminCheck = await checkAdmin();

    if (!adminCheck.authorized) {
      return {
        success: false,
        message: adminCheck.message,
      };
    }

    const imageValue = formData.get('image');

    const values = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      categoryId: formData.get('categoryId'),
      image: imageValue instanceof File && imageValue.size > 0 ? imageValue : null,
    };

    const validate = addMenuSchema.safeParse(values);
    if (!validate.success) {
      return {
        success: false,
        message: 'Invalid form data.',
        errors: validate.error.flatten().fieldErrors,
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

export async function deleteMenuItem(menuItemId: number): Promise<ActionResponse> {
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

export async function updateMenuItem(menuItemId: number, formData: FormData): Promise<ActionResponse> {
  try {
    const adminCheck = await checkAdmin();

    if (!adminCheck.authorized) {
      return {
        success: false,
        message: adminCheck.message,
      };
    }

    const validate = updateMenuSchema.safeParse(formData);
    if (!validate.success) {
      return {
        success: false,
        message: 'Invalid form data.',
        errors: validate.error.flatten().fieldErrors,
      };
    }

    const response = await menuService.update(menuItemId, validate.data);
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

export async function addFavorite(menuItemId: number): Promise<ActionResponse> {
  const session = await requireSession();
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

export async function deleteFavorite(menuItemId: number): Promise<ActionResponse> {
  try {
    const session = await requireSession();
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
        data: [],
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

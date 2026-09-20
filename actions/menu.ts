'use server';

import { MenuService } from '@/server/services/menu';
import { revalidatePath } from 'next/cache';
import { checkCompanyPermision, requireSession } from '@/lib/auth-guard';
import { ApiResponse } from '@/types/api-responses';
import { AddMenuDto, addMenuSchema, UpdateMenuDto, updateMenuSchema } from '@/schemas/menu';
import { ActionResponse } from '@/types/action-response';
import { FavoriteResult, MenuResult } from '@/types/menu';
import { Console } from 'console';

const menuService = new MenuService();

export async function addMenuItem(formData: FormData): Promise<ActionResponse> {
  try {
    const permision = await checkCompanyPermision();
    const userId = permision.userId;

    if (!permision.authorized || !userId) {
      return {
        success: false,
        message: permision.message,
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

    const data: AddMenuDto = validate.data;

    const response = await menuService.add(data);
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

export async function updateMenuItem(menuItemId: number, formData: FormData): Promise<ActionResponse> {
  try {
    const permision = await checkCompanyPermision();
    const userId = permision.userId;

    if (!permision.authorized || !userId) {
      return {
        success: false,
        message: permision.message,
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

    const validate = updateMenuSchema.safeParse(values);
    if (!validate.success) {
      return {
        success: false,
        message: 'Invalid form data.',
        errors: validate.error.flatten().fieldErrors,
      };
    }

    const data: UpdateMenuDto = validate.data;
    const response = await menuService.update(menuItemId, data);

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
    console.error('Update menu error:', error);

    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}

export async function deleteMenuItem(menuItemId: number): Promise<MenuResult> {
  try {
    const permisions = await checkCompanyPermision();
    const userId = permisions.userId;

    if (!permisions.authorized || !userId) {
      return {
        success: false,
        message: permisions.message,
      };
    }

    const response = await menuService.delete(menuItemId, userId);
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

export async function addFavorite(menuItemId: number): Promise<ActionResponse> {
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

export async function getFavoriteIds(): Promise<FavoriteResult> {
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
    };
  }
}

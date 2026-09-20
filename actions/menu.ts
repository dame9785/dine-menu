'use server';

import { revalidatePath } from 'next/cache';

import { checkCompanyPermision } from '@/lib/auth-guard';
import { addMenuSchema, updateMenuSchema } from '@/schemas/menu';
import { MenuService } from '@/server/services/menu';
import { ActionResponse } from '@/types/action-response';
import { FavoriteResult, MenuResult } from '@/types/menu';

const menuService = new MenuService();

/**
 * Extracts and normalizes menu form data.
 */
function getMenuFormValues(formData: FormData) {
  const image = formData.get('image');

  return {
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    categoryId: formData.get('categoryId'),
    image: image instanceof File && image.size > 0 ? image : null,
  };
}

/**
 * Validates a menu item ID.
 */
function isValidMenuItemId(menuItemId: number): boolean {
  return Number.isInteger(menuItemId) && menuItemId > 0;
}

/**
 * Checks whether the current user has company permissions.
 */
async function authorizeCompanyAction(): Promise<{
  authorized: boolean;
  message: string;
}> {
  const permission = await checkCompanyPermision();

  if (!permission.authorized || !permission.userId) {
    return {
      authorized: false,
      message: permission.message,
    };
  }

  return {
    authorized: true,
    message: '',
  };
}

/**
 * Adds a new menu item.
 */
export async function addMenuItem(formData: FormData): Promise<ActionResponse> {
  try {
    const permission = await authorizeCompanyAction();

    if (!permission.authorized) {
      return {
        success: false,
        message: permission.message,
      };
    }

    const values = getMenuFormValues(formData);
    const validation = addMenuSchema.safeParse(values);

    if (!validation.success) {
      return {
        success: false,
        message: 'Invalid form data.',
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const response = await menuService.add(validation.data);

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
    console.error('Add menu item action failed:', error);

    return {
      success: false,
      message: 'Something went wrong while adding the menu item.',
    };
  }
}

/**
 * Updates an existing menu item.
 */
export async function updateMenuItem(menuItemId: number, formData: FormData): Promise<ActionResponse> {
  try {
    if (!isValidMenuItemId(menuItemId)) {
      return {
        success: false,
        message: 'Invalid menu item ID.',
      };
    }

    const permission = await authorizeCompanyAction();

    if (!permission.authorized) {
      return {
        success: false,
        message: permission.message,
      };
    }

    const values = getMenuFormValues(formData);
    const validation = updateMenuSchema.safeParse(values);

    if (!validation.success) {
      return {
        success: false,
        message: 'Invalid form data.',
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const response = await menuService.update(menuItemId, validation.data);

    if (!response.success) {
      return {
        success: false,
        message: response.message,
      };
    }

    revalidatePath('/');
    revalidatePath('/category');
    revalidatePath(`/menu/${menuItemId}`);

    return {
      success: true,
      message: response.message,
    };
  } catch (error) {
    console.error('Update menu item action failed:', error);

    return {
      success: false,
      message: 'Something went wrong while updating the menu item.',
    };
  }
}

/**
 * Deletes a menu item.
 */
export async function deleteMenuItem(menuItemId: number): Promise<MenuResult> {
  try {
    if (!isValidMenuItemId(menuItemId)) {
      return {
        success: false,
        message: 'Invalid menu item ID.',
      };
    }

    const permission = await authorizeCompanyAction();

    if (!permission.authorized) {
      return {
        success: false,
        message: permission.message,
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
      data: null,
    };
  } catch (error) {
    console.error('Delete menu item action failed:', error);

    return {
      success: false,
      message: 'Something went wrong while deleting the menu item.',
    };
  }
}

/**
 * Adds a menu item to the current user's favorites.
 */
export async function addFavorite(menuItemId: number): Promise<ActionResponse> {
  try {
    if (!isValidMenuItemId(menuItemId)) {
      return {
        success: false,
        message: 'Invalid menu item ID.',
      };
    }

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
    console.error('Add favorite action failed:', error);

    return {
      success: false,
      message: 'Something went wrong while adding the favorite.',
    };
  }
}

/**
 * Removes a menu item from the current user's favorites.
 */
export async function deleteFavorite(menuItemId: number): Promise<ActionResponse> {
  try {
    if (!isValidMenuItemId(menuItemId)) {
      return {
        success: false,
        message: 'Invalid menu item ID.',
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
    console.error('Delete favorite action failed:', error);

    return {
      success: false,
      message: 'Could not remove the menu item from favorites.',
    };
  }
}

/**
 * Gets the current user's favorite menu item IDs.
 */
export async function getFavoriteIds(): Promise<FavoriteResult> {
  try {
    return await menuService.getFavoriteIds();
  } catch (error) {
    console.error('Get favorite IDs action failed:', error);

    return {
      success: false,
      message: 'Could not retrieve favorite IDs.',
    };
  }
}

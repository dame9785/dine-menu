import { ApiResponse, MenuApiResponse } from '@/types/api-responses';
import { AddMenuItemDto, MenuItemViewModel } from '@/types/menu';
import { MenuRepository } from '../repositories/menu';
import { MenuMapper } from '../mapping/menu';
import { saveImage } from '@/helpers/image-helper';
import { UpdateMenuDto, updateMenuSchema } from '@/schemas/menu';
import { FavoriteRepository } from '../repositories/favorite';

const menuRepository = new MenuRepository();
const favoriteRepository = new FavoriteRepository();

export class MenuService {
  async add(formData: FormData): Promise<ApiResponse<[]>> {
    try {
      const name = formData.get('name');
      const description = formData.get('description');
      const price = formData.get('price');
      const categoryId = formData.get('categoryId');
      const image = formData.get('image');

      if (
        typeof name !== 'string' ||
        typeof description !== 'string' ||
        typeof price !== 'string' ||
        typeof categoryId !== 'string'
      ) {
        return {
          success: false,
          message: 'Invalid menu data.',
        } satisfies ApiResponse<[]>;
      }

      let imageUrl = '';
      if (image instanceof File) {
        imageUrl = await saveImage(image);
        if (!imageUrl) {
          return {
            success: false,
            message: 'Could not upload the image',
          } satisfies ApiResponse<[]>;
        }
      }

      const dto: AddMenuItemDto = {
        name,
        description,
        price: Number(price),
        categoryId: Number(categoryId),
        imageUrl: imageUrl,
      };

      const result = await menuRepository.addMenu(dto);

      if (!result) {
        return {
          success: false,
          message: 'Something went wrong while creating a new menu.',
        } satisfies ApiResponse<[]>;
      }

      return {
        success: true,
        message: 'Menu successfully created.',
      } satisfies ApiResponse<[]>;
    } catch (error) {
      console.error('Server error', error);

      return {
        success: false,
        message: 'Something went wrong while creating a new menu.',
      } satisfies ApiResponse<[]>;
    }
  }

  async update(menuItemId: number, formData: FormData): Promise<ApiResponse<MenuItemViewModel>> {
    try {
      const name = formData.get('name');
      const description = formData.get('description');
      const price = formData.get('price');
      const categoryId = formData.get('categoryId');
      const image = formData.get('image');

      if (
        typeof name !== 'string' ||
        typeof description !== 'string' ||
        typeof price !== 'string' ||
        typeof categoryId !== 'string'
      ) {
        return {
          success: false,
          message: 'Invalid menu data.',
        } satisfies ApiResponse<[]>;
      }

      const validation = updateMenuSchema.safeParse({
        name,
        description,
        price: Number(price),
        categoryId: Number(categoryId),
        ...(image instanceof File && image.size > 0 ? { image } : {}),
      });

      if (!validation.success) {
        return {
          success: false,
          message: 'Invalid menu data.',
        };
      }

      const validatedData = validation.data;
      let imageUrl: string = '';

      // Bara uppdatera bilden om användaren valt en ny
      if (image instanceof File && image.size > 0) {
        imageUrl = await saveImage(image);

        if (!imageUrl) {
          return {
            success: false,
            message: 'Could not upload the image',
          } satisfies ApiResponse<[]>;
        }
      }

      const data = await menuRepository.update(menuItemId, validatedData, imageUrl);
      const viewModel = MenuMapper.menuItemDboToViewModel(data.menuItem);

      return {
        success: true,
        message: 'Menu successfully updated.',
        data: viewModel,
      } satisfies ApiResponse<MenuItemViewModel>;
    } catch (error) {
      console.error('Server error', error);

      return {
        success: false,
        message: 'Something went wrong while updating menu item.',
      } satisfies ApiResponse<MenuItemViewModel>;
    }
  }

  async getAll(
    page: number,
    searchParam: string,
    categoryParam: string,
    filterParam: string,
    sortByParam: string,
    userId?: string,
  ): Promise<MenuApiResponse> {
    try {
      const result = await menuRepository.getAll(page, searchParam, categoryParam, filterParam, sortByParam, userId);
      const viewModel = result.menuItems.map((item) => MenuMapper.menuItemDboToViewModel(item));
      return {
        success: true,
        message: 'Retrieval of menu items succeeded.',
        data: viewModel,
        pagination: {
          totalItems: result.totalNumberOfMenuItems,
          currentPage: page,
          pageSize: result.pageSize,
          totalPages: result.totalPages,
        },
      } satisfies MenuApiResponse;
    } catch (error) {
      console.error('Server error', error);

      return {
        success: false,
        message: 'Something went wrong while getting menu items.',
        data: [],
        pagination: null,
      } satisfies MenuApiResponse;
    }
  }

  async delete(menuItemId: number): Promise<ApiResponse<[]>> {
    try {
      await menuRepository.delete(menuItemId);
      return {
        success: true,
        message: 'Category successfully deleted',
      } satisfies ApiResponse<[]>;
    } catch (error) {
      console.error('Server error', error);
      return {
        success: false,
        message: 'Something went wrong while deleting the menu.',
      } satisfies ApiResponse<[]>;
    }
  }

  async getById(menuItemId: number): Promise<ApiResponse<MenuItemViewModel>> {
    try {
      const menuItemData = await menuRepository.getById(menuItemId);
      if (!menuItemData) {
        return {
          success: true,
          message: 'menu item could not be found',
        } satisfies ApiResponse<MenuItemViewModel>;
      }

      const viewModel = MenuMapper.menuItemDboToViewModel(menuItemData);
      return {
        success: true,
        message: 'Menu managed to retrieve',
        data: viewModel,
      } satisfies ApiResponse<MenuItemViewModel>;
    } catch (error) {
      console.error('Server error', error);
      return {
        success: false,
        message: 'Something went wrong while getting the menu item.',
      } satisfies ApiResponse<[]>;
    }
  }

  async addFavorite(userId: string, menuItemId: number): Promise<ApiResponse<[]>> {
    if (!menuItemId) {
      return {
        success: false,
        message: 'A valid menu ID must be specified.',
      } satisfies ApiResponse<null>;
    }

    try {
      const result = favoriteRepository.addFavorite(userId, menuItemId);
      if (!result) {
        return {
          success: false,
          message: 'You must be logged in to add favorites.',
        } satisfies ApiResponse<[]>;
      }

      return {
        success: true,
        message: 'Successfully saved as a favorite',
      } satisfies ApiResponse<[]>;
    } catch (error) {
      console.error('Error adding favorite:', error);

      return {
        success: false,
        message: 'An error occurred while adding the favorite.',
      } satisfies ApiResponse<[]>;
    }
  }

  async deleteFavorite(userId: string, menuItemId: number): Promise<ApiResponse<[]>> {
    try {
      if (!userId) {
        return {
          success: false,
          message: 'You must be logged in to add favorites.',
        } satisfies ApiResponse<[]>;
      }

      await favoriteRepository.deleteFavorite(userId, menuItemId);
      return {
        success: true,
        message: 'Menu item removed from favorites.',
      } satisfies ApiResponse<[]>;
    } catch (error) {
      console.error('ERROR WHILE DELETING FAVORITE MENU ITEM', error);
      return {
        success: false,
        message: 'An error occurred while remove the favorite.',
      } satisfies ApiResponse<[]>;
    }
  }

  async getFavoriteIds(userId: string): Promise<ApiResponse<number[]>> {
    try {
      if (!userId) {
        return {
          success: false,
          message: 'You must be logged in to get favorites.',
          data: [],
        };
      }

      const favoriteIds = await favoriteRepository.getFavoriteIds(userId);

      return {
        success: true,
        message: 'Favorite IDs retrieved successfully.',
        data: favoriteIds,
      } satisfies ApiResponse<number[]>;
    } catch (error) {
      console.error('ERROR WHILE GETTING FAVORITE IDS', error);

      return {
        success: false,
        message: 'An error occurred while getting favorite IDs.',
        data: [],
      } satisfies ApiResponse<number[]>;
    }
  }
}

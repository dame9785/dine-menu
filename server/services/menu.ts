import { FavoriteResult, MenuItemViewModel, MenuListResult, MenuResult } from '@/types/menu';

import { AddMenuDto, UpdateMenuDto, updateMenuSchema } from '@/schemas/menu';

import { MenuRepository } from '../repositories/menu';
import { FavoriteRepository } from '../repositories/favorite';
import { MenuMapper } from '../mapping/menu';

import { CompanyRepository } from '@/server/repositories/company';
import { getSession } from '@/lib/auth-guard';
import { saveImage } from '@/helpers/image-helper';

const menuRepository = new MenuRepository();
const favoriteRepository = new FavoriteRepository();
const companyRepository = new CompanyRepository();

export class MenuService {
  /**
   * ADD MENU ITEM
   */
  async add(data: AddMenuDto): Promise<MenuResult<MenuItemViewModel>> {
    try {
      const session = await getSession();

      if (!session) {
        return {
          success: false,
          message: 'You need to be logged in.',
        };
      }

      const userId = session.user.id;

      /**
       * Company ID is always fetched from the
       * authenticated user.
       */
      const companyId = await companyRepository.getUserCompanyId(userId);

      if (!companyId) {
        return {
          success: false,
          message: 'You do not have a registered company.',
        };
      }

      let imageUrl = '';

      /**
       * Upload image only when a valid file exists.
       */
      if (data.image instanceof File && data.image.size > 0) {
        imageUrl = await saveImage(data.image);

        if (!imageUrl) {
          return {
            success: false,
            message: 'Could not upload the image.',
          };
        }
      }

      /**
       * Repository-specific input.
       *
       * Do not pass the original DTO directly.
       */
      const repositoryData = {
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl,
        categoryId: Number(data.categoryId),
        companyId,
      };

      const result = await menuRepository.addMenu(repositoryData);

      const viewModel = MenuMapper.menuItemDboToViewModel(result);

      return {
        success: true,
        message: 'Menu item created successfully.',
        data: viewModel,
      };
    } catch (error) {
      console.error('MenuService.add failed:', error);

      return {
        success: false,
        message: 'Unable to create menu item.',
      };
    }
  }

  /**
   * UPDATE MENU ITEM
   */
  async update(menuItemId: number, data: UpdateMenuDto): Promise<MenuResult<null>> {
    try {
      const session = await getSession();

      if (!session) {
        return {
          success: false,
          message: 'You need to be logged in.',
        };
      }

      const userId = session.user.id;

      /**
       * Validate incoming data.
       */
      const validation = updateMenuSchema.safeParse(data);

      if (!validation.success) {
        return {
          success: false,
          message: 'Invalid menu item data.',
        };
      }

      const validatedData = validation.data;

      let imageUrl: string | undefined;

      /**
       * Upload a new image if provided.
       */
      if (validatedData.image instanceof File && validatedData.image.size > 0) {
        imageUrl = await saveImage(validatedData.image);

        if (!imageUrl) {
          return {
            success: false,
            message: 'Could not upload the image.',
          };
        }
      }

      /**
       * Repository-specific input.
       */
      const repositoryData = {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        categoryId: Number(validatedData.categoryId),

        ...(imageUrl !== undefined && {
          imageUrl,
        }),
      };

      const updated = await menuRepository.update(menuItemId, repositoryData, userId);

      if (!updated) {
        return {
          success: false,
          message: 'Menu item not found or you are not authorized to modify it.',
        };
      }

      return {
        success: true,
        message: 'Menu item updated successfully.',
        data: null,
      };
    } catch (error) {
      console.error('MenuService.update failed:', error);

      return {
        success: false,
        message: 'Unable to update menu item.',
      };
    }
  }

  /**
   * GET MENU ITEM BY ID
   */
  async getById(menuItemId: number): Promise<MenuResult<MenuItemViewModel>> {
    try {
      const session = await getSession();

      /**
       * The endpoint can be public.
       * userId is optional and only used for
       * determining the current user's favorite.
       */
      const userId = session?.user.id;

      const data = await menuRepository.getById(menuItemId, userId);

      if (!data) {
        return {
          success: false,
          message: 'Menu item not found.',
        };
      }

      const viewModel = MenuMapper.menuItemDboToViewModel(data);

      return {
        success: true,
        message: 'Menu item retrieved successfully.',
        data: viewModel,
      };
    } catch (error) {
      console.error('MenuService.getById failed:', error);

      return {
        success: false,
        message: 'Unable to retrieve menu item.',
      };
    }
  }

  /**
   * GET ALL MENU ITEMS
   */
  async getAll(
    page: number,
    searchParam: string,
    categoryParam: string,
    favorites: boolean,
    sortByParam: string,
  ): Promise<MenuListResult<MenuItemViewModel[]>> {
    try {
      const session = await getSession();

      const userId = session?.user.id;

      /**
       * Favorites require authentication.
       */
      if (favorites && !userId) {
        return {
          success: false,
          message: 'You need to be logged in to view favorites.',
          data: [],
          pagination: null,
        };
      }

      const result = await menuRepository.getAll(page, searchParam, categoryParam, favorites, sortByParam, userId);

      const viewModel = result.menuItems.map((item) => MenuMapper.menuItemDboToViewModel(item));

      return {
        success: true,
        message: 'Menu items retrieved successfully.',
        data: viewModel,
        pagination: {
          totalItems: result.totalNumberOfMenuItems,
          currentPage: result.currentPage,
          pageSize: result.pageSize,
          totalPages: result.totalPages,
        },
      };
    } catch (error) {
      console.error('MenuService.getAll failed:', error);

      return {
        success: false,
        message: 'Unable to retrieve menu items.',
        data: [],
        pagination: null,
      };
    }
  }

  /**
   * DELETE MENU ITEM
   */
  async delete(menuItemId: number): Promise<MenuResult<null>> {
    try {
      const session = await getSession();

      if (!session) {
        return {
          success: false,
          message: 'You need to be logged in.',
        };
      }

      const userId = session.user.id;

      /**
       * Repository verifies ownership.
       */
      const deleted = await menuRepository.delete(menuItemId, userId);

      if (!deleted) {
        return {
          success: false,
          message: 'Menu item not found or you are not authorized to delete it.',
        };
      }

      return {
        success: true,
        message: 'Menu item deleted successfully.',
        data: null,
      };
    } catch (error) {
      console.error('MenuService.delete failed:', error);

      return {
        success: false,
        message: 'Unable to delete menu item.',
      };
    }
  }

  /**
   * ADD FAVORITE
   */
  async addFavorite(menuItemId: number): Promise<MenuResult<null>> {
    try {
      const session = await getSession();

      if (!session) {
        return {
          success: false,
          message: 'You need to be logged in.',
        };
      }

      const result = await favoriteRepository.addFavorite(session.user.id, menuItemId);

      return result;
    } catch (error) {
      console.error('MenuService.addFavorite failed:', error);

      return {
        success: false,
        message: 'Unable to add menu item to favorites.',
      };
    }
  }

  /**
   * DELETE FAVORITE
   */
  async deleteFavorite(menuItemId: number): Promise<MenuResult<null>> {
    try {
      const session = await getSession();

      if (!session) {
        return {
          success: false,
          message: 'You need to be logged in.',
        };
      }

      const result = await favoriteRepository.deleteFavorite(session.user.id, menuItemId);

      return result;
    } catch (error) {
      console.error('MenuService.deleteFavorite failed:', error);

      return {
        success: false,
        message: 'Unable to remove menu item from favorites.',
      };
    }
  }

  /**
   * GET FAVORITE IDS
   */
  async getFavoriteIds(): Promise<FavoriteResult> {
    try {
      const session = await getSession();

      if (!session) {
        return {
          success: false,
          message: 'You need to be logged in.',
        };
      }

      return await favoriteRepository.getFavoriteIds(session.user.id);
    } catch (error) {
      console.error('MenuService.getFavoriteIds failed:', error);

      return {
        success: false,
        message: 'Unable to retrieve favorite IDs.',
      };
    }
  }
}

import { ApiResponse, MenuApiResponse } from '@/types/api-responses';
import { FavoriteResult, MenuItemViewModel, MenuResult } from '@/types/menu';
import { MenuRepository } from '../repositories/menu';
import { MenuMapper } from '../mapping/menu';
import { saveImage } from '@/helpers/image-helper';
import { AddMenuDto, UpdateMenuDto, updateMenuSchema } from '@/schemas/menu';
import { FavoriteRepository } from '../repositories/favorite';
import { CompanyRepository } from '@/server/repositories/company';
import { getSession } from '@/lib/auth-guard';

const menuRepository = new MenuRepository();
const favoriteRepository = new FavoriteRepository();
const companyRepository = new CompanyRepository();

export class MenuService {
  async add(data: AddMenuDto): Promise<MenuResult<null>> {
    try {
      let imageUrl = '';

      if (data.image instanceof File && data.image.size > 0) {
        imageUrl = await saveImage(data.image);

        if (!imageUrl) {
          return {
            success: false,
            message: 'Could not upload the image',
          };
        }
      }

      const session = await getSession();

      if (!session) {
        return {
          success: false,
          message: 'You need to be logged in.',
        };
      }

      const userId = session.user.id;

      const companyId = await companyRepository.getUserCompanyId(userId);
      if (!companyId) {
        return {
          success: false,
          message: 'No company found..',
        };
      }

      const dto: AddMenuDto = {
        ...data,
        categoryId: Number(data.categoryId),
        imageUrl,
        companyId,
      };

      const result = await menuRepository.addMenu(dto);

      if (!result) {
        return {
          success: false,
          message: 'Something went wrong while creating a new menu.',
        };
      }

      return {
        success: true,
        message: 'Menu successfully created.',
      };
    } catch (error) {
      console.error('Server error:', error);

      return {
        success: false,
        message: 'Something went wrong while creating a new menu.',
      };
    }
  }

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

      const validatedData = updateMenuSchema.parse(data);

      let imageUrl: string | undefined;

      // Uppdatera bara bilden om användaren valt en ny
      if (validatedData.image instanceof File && validatedData.image.size > 0) {
        imageUrl = await saveImage(validatedData.image);

        if (!imageUrl) {
          return {
            success: false,
            message: 'Could not upload the image',
          };
        }
      }

      await menuRepository.update(menuItemId, validatedData, imageUrl, userId);

      return {
        success: true,
        message: 'Menu successfully updated.',
      };
    } catch (error) {
      console.error('Server error', error);

      return {
        success: false,
        message: 'Something went wrong while updating menu item.',
      };
    }
  }

  async getById(menuItemId: number): Promise<MenuResult<MenuItemViewModel>> {
    try {
      const data = await menuRepository.getById(menuItemId);

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
      console.error('Failed to retrieve menu item:', error);

      return {
        success: false,
        message: 'An error occurred while retrieving the menu item.',
      };
    }
  }

  async getAll(
    page: number,
    searchParam: string,
    categoryParam: string,
    favorites: boolean,
    sortByParam: string,
  ): Promise<MenuResult<MenuItemViewModel[]>> {
    try {
      const session = await getSession();

      const userId = session?.user.id;

      const result = await menuRepository.getAll(page, searchParam, categoryParam, favorites, sortByParam, userId);

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
      };
    } catch (error) {
      console.error('Server error:', error);

      return {
        success: false,
        message: 'Something went wrong while getting menu items.',
      };
    }
  }

  async delete(menuItemId: number, userId: string): Promise<MenuResult<null>> {
    try {
      const companyId = await companyRepository.getUserCompanyId(userId);
      if (!companyId) {
        return {
          success: false,
          message: 'You do not have a registered company.',
        };
      }
      return await menuRepository.delete(menuItemId, companyId, userId);
    } catch (error) {
      console.error('Delete menu item error:', error);

      return {
        success: false,
        message: 'Something went wrong while deleting the menu item.',
      };
    }
  }

  async addFavorite(menuItemId: number): Promise<MenuResult<null>> {
    try {
      const session = await getSession();

      if (!session) {
        return {
          success: false,
          message: 'You need to be logged in.',
        };
      }

      const userId = session.user.id;
      const result = await favoriteRepository.addFavorite(userId, menuItemId);
      return result;
    } catch (error) {
      console.error('Add menu item to favorite error:', error);

      return {
        success: false,
        message: 'Something went wrong while adding menu item to favorite.',
      };
    }
  }

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
      console.error('Delete menu item as favorite error:', error);

      return {
        success: false,
        message: 'Something went wrong while deleting menu item to favorite.',
      };
    }
  }

  async getFavoriteIds(): Promise<FavoriteResult> {
    try {
      const session = await getSession();

      if (!session) {
        return {
          success: false,
          message: 'You need to be logged in.',
        };
      }
      const result = await favoriteRepository.getFavoriteIds(session.user.id);
      return result;
    } catch (error) {
      console.error('Get all favorite Ids error:', error);

      return {
        success: false,
        message: 'Something went wrong while getting favorite Ids',
      };
    }
  }
}

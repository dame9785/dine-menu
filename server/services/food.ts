import { ApiResponse, FoodApiResponse } from '@/types/api-responses';
import { FoodDto, FoodViewModel } from '@/types/food';
import { FoodRepository } from '../repositories/food';
import { FoodMapper } from '../mapping/food';
import { saveImage } from '@/helpers/image-helper';
import { updateFoodDataSchema } from '@/schemas/food';
import { FavoriteRepository } from '../repositories/favorite';

const foodRepository = new FoodRepository();
const favoriteRepository = new FavoriteRepository();

export class FoodService {
  async addFood(formData: FormData): Promise<ApiResponse<[]>> {
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
          message: 'Invalid food data.',
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

      const dto: FoodDto = {
        name,
        description,
        price: Number(price),
        categoryId: Number(categoryId),
        imageUrl: imageUrl,
      };

      const result = await foodRepository.addFood(dto);

      if (!result) {
        return {
          success: false,
          message: 'Something went wrong while creating a new food.',
        } satisfies ApiResponse<[]>;
      }

      return {
        success: true,
        message: 'Food successfully created.',
      } satisfies ApiResponse<[]>;
    } catch (error) {
      console.error('Server error', error);

      return {
        success: false,
        message: 'Something went wrong while creating a new food.',
      } satisfies ApiResponse<[]>;
    }
  }

  async update(foodId: number, formData: FormData): Promise<ApiResponse<FoodViewModel>> {
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
          message: 'Invalid food data.',
        } satisfies ApiResponse<[]>;
      }

      const validation = updateFoodDataSchema.safeParse({
        name,
        description,
        price: Number(price),
        categoryId: Number(categoryId),
        ...(image instanceof File && image.size > 0 ? { image } : {}),
      });

      if (!validation.success) {
        return {
          success: false,
          message: 'Invalid food data.',
        };
      }

      const dto = validation.data;

      // Bara uppdatera bilden om användaren valt en ny
      if (image instanceof File && image.size > 0) {
        const imageUrl = await saveImage(image);

        if (!imageUrl) {
          return {
            success: false,
            message: 'Could not upload the image',
          } satisfies ApiResponse<[]>;
        }

        dto.imageUrl = imageUrl;
      }

      const foodData = await foodRepository.update(foodId, dto);
      const viewModel = FoodMapper.foodDboToViewModel(foodData.food);

      return {
        success: true,
        message: 'Food successfully updated.',
        data: viewModel,
      } satisfies ApiResponse<FoodViewModel>;
    } catch (error) {
      console.error('Server error', error);

      return {
        success: false,
        message: 'Something went wrong while updating food item.',
      } satisfies ApiResponse<FoodViewModel>;
    }
  }

  async getAll(
    page: number,
    searchParam: string,
    categoryParam: string,
    filterParam: string,
    sortByParam: string,
    userId?: string,
  ): Promise<FoodApiResponse> {
    try {
      const result = await foodRepository.getAll(page, searchParam, categoryParam, filterParam, sortByParam, userId);
      const viewModel = result.foods.map((item) => FoodMapper.foodDboToViewModel(item));
      return {
        success: true,
        message: 'Retrieval of foods succeeded.',
        data: viewModel,
        pagination: {
          totalItems: result.totalNumberOfFoods,
          currentPage: page,
          pageSize: result.pageSize,
          totalPages: result.totalPages,
        },
      } satisfies FoodApiResponse;
    } catch (error) {
      console.error('Server error', error);

      return {
        success: false,
        message: 'Something went wrong while getting foods.',
        data: [],
        pagination: null,
      } satisfies FoodApiResponse;
    }
  }

  async delete(foodId: number): Promise<ApiResponse<[]>> {
    try {
      await foodRepository.delete(foodId);
      return {
        success: true,
        message: 'Category successfully deleted',
      } satisfies ApiResponse<[]>;
    } catch (error) {
      console.error('Server error', error);
      return {
        success: false,
        message: 'Something went wrong while deleting the food.',
      } satisfies ApiResponse<[]>;
    }
  }

  async getById(foodId: number): Promise<ApiResponse<FoodViewModel>> {
    try {
      const foodData = await foodRepository.getById(foodId);
      if (!foodData) {
        return {
          success: true,
          message: 'food item could not be found',
        } satisfies ApiResponse<FoodViewModel>;
      }

      const viewModel = FoodMapper.foodDboToViewModel(foodData);
      return {
        success: true,
        message: 'Food managed to retrieve',
        data: viewModel,
      } satisfies ApiResponse<FoodViewModel>;
    } catch (error) {
      console.error('Server error', error);
      return {
        success: false,
        message: 'Something went wrong while getting the food item.',
      } satisfies ApiResponse<[]>;
    }
  }

  async addFavorite(userId: string, foodId: number): Promise<ApiResponse<[]>> {
    if (!foodId) {
      return {
        success: false,
        message: 'A valid food ID must be specified.',
      } satisfies ApiResponse<null>;
    }

    try {
      const result = favoriteRepository.addFavorite(userId, foodId);
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
}

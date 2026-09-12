import { ApiResponse, FoodApiResponse } from '@/types/api-responses';
import { FoodDto } from '@/types/food';
import { FoodRepository } from '../repositories/food';
import { FoodMapper } from '../mapping/food';
import { saveImage } from '@/helpers/image-helper';

const foodRepository = new FoodRepository();

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

  async getAll(page: number, searchParam: string, categoryParam: string): Promise<FoodApiResponse> {
    try {
      console.log('SERVICE SEARCH:', searchParam);
      const result = await foodRepository.getAll(page, searchParam, categoryParam);
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
}

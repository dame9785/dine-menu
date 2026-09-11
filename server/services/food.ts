import { ApiResponse } from '@/types/api-responses';
import { FoodDto, FoodViewModel } from '@/types/food';
import { FoodRepository } from '../repositories/food';
import { FoodMapper } from '../mapping/food';

const foodRepository = new FoodRepository();

export class FoodService {
  async addFood(dto: FoodDto): Promise<ApiResponse<[]>> {
    try {
      const result = await foodRepository.addFood(dto);
      if (!result) {
        return {
          success: false,
          message: 'Something went wrong while creating a new food',
        } satisfies ApiResponse<[]>;
      }
      return {
        success: true,
        message: 'Food successfully created',
      } satisfies ApiResponse<[]>;
    } catch (error) {
      console.error('Server error', error);

      return {
        success: false,
        message: 'Something went wrong while creating a new food.',
      } satisfies ApiResponse<[]>;
    }
  }
  async getAll(): Promise<ApiResponse<FoodViewModel[]>> {
    try {
      const foods = await foodRepository.getAll();
      const viewModel = foods.map((item) => FoodMapper.foodDboToViewModel(item));
      return {
        success: true,
        message: 'Retrieval of foods succeeded.',
        data: viewModel,
      } satisfies ApiResponse<FoodViewModel[]>;
    } catch (error) {
      console.error('Server error', error);

      return {
        success: false,
        message: 'Something went wrong while getting foods.',
      } satisfies ApiResponse<[]>;
    }
  }
}

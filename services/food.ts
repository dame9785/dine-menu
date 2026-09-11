import { ApiResponse } from '@/types/api-responses';
import { FoodViewModel } from '@/types/food';
const API_URL = 'http://localhost:3000/api/food';

export class FoodService {
  async getAll(): Promise<ApiResponse<FoodViewModel[]>> {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'GET',
      });
      return (await response.json()) as ApiResponse<FoodViewModel[]>;
    } catch (error) {
      console.error('API/CATEGORY/GET', error);

      return {
        success: false,
        message: 'Could not connect to the server.',
        data: [],
      } satisfies ApiResponse<FoodViewModel[]>;
    }
  }
}

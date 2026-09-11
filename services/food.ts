import { ApiResponse, FoodApiResponse } from '@/types/api-responses';

const API_URL = 'http://localhost:3000/api/food';

export class FoodService {
  async getAll(page: number): Promise<FoodApiResponse> {
    try {
      const response = await fetch(`${API_URL}?page=${page}`, {
        method: 'GET',
      });
      return (await response.json()) as FoodApiResponse;
    } catch (error) {
      console.error('API/CATEGORY/GET', error);

      return {
        success: false,
        message: 'Could not connect to the server.',
        data: [],
        pagination: null,
      } satisfies FoodApiResponse;
    }
  }

  async add(formData: FormData): Promise<ApiResponse<[]>> {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        body: formData,
      });

      return (await response.json()) as ApiResponse<[]>;
    } catch (error) {
      console.error('API/FOOD/POST', error);

      return {
        success: false,
        message: 'Could not connect to the server.',
      } satisfies ApiResponse<[]>;
    }
  }

  async deleteFood(foodId: number): Promise<ApiResponse<[]>> {
    try {
      const response = await fetch(`${API_URL}/${foodId}`, {
        method: 'DELETE',
      });
      return (await response.json()) as ApiResponse<[]>;
    } catch (error) {
      console.error('API/FOOD/DELETE', error);

      return {
        success: false,
        message: 'Could not connect to the server.',
      } satisfies ApiResponse<[]>;
    }
  }
}

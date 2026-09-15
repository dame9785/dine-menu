import { ApiResponse, FoodApiResponse } from '@/types/api-responses';
import { FoodViewModel } from '@/types/food';

const API_URL = 'http://localhost:3000/api/food';

export class FoodService {
  async getAll(
    page: number,
    searchParams: string,
    categoryParam: string,
    filterParam: string,
    sortBy: string,
  ): Promise<FoodApiResponse> {
    try {
      const response = await fetch(
        `${API_URL}?page=${page}&search=${encodeURIComponent(searchParams)}&category=${encodeURIComponent(categoryParam)}&filter=${encodeURIComponent(filterParam)}&sortBy=${encodeURIComponent(sortBy)}`,
        {
          method: 'GET',
        },
      );

      return (await response.json()) as FoodApiResponse;
    } catch (error) {
      console.error('API/FOOD/GET', error);

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

  async update(foodId: number, formData: FormData): Promise<ApiResponse<[]>> {
    try {
      const response = await fetch(`${API_URL}/${foodId}`, {
        method: 'PUT',
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

  async getById(foodId: string): Promise<ApiResponse<FoodViewModel>> {
    try {
      const response = await fetch(`${API_URL}/${foodId}`, {
        method: 'GET',
      });
      return (await response.json()) as ApiResponse<FoodViewModel>;
    } catch (error) {
      console.error('API/FOOD/{ID}', error);
      return {
        success: false,
        message: 'Could not connect to the server.',
      } satisfies ApiResponse<[]>;
    }
  }
}

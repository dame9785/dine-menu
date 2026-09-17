import { ApiResponse, FoodApiResponse } from '@/types/api-responses';
import { FoodViewModel } from '@/types/food';
import { headers } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

const FOOD_API_URL = `${API_URL}/food`;
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
        `${FOOD_API_URL}?page=${page}&search=${encodeURIComponent(searchParams)}&category=${encodeURIComponent(categoryParam)}&filter=${encodeURIComponent(filterParam)}&sortBy=${encodeURIComponent(sortBy)}`,
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
      console.log('🚀 FOOD SERVICE ADD START');
      console.log('FOOD_API_URL:', FOOD_API_URL);
      const requestHeaders = await headers();

      const response = await fetch(FOOD_API_URL, {
        method: 'POST',
        body: formData,
        headers: {
          Cookie: requestHeaders.get('cookie') ?? '',
        },
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
      const response = await fetch(`${FOOD_API_URL}/${foodId}`, {
        method: 'PUT',
        body: formData,
      });

      return (await response.json()) as ApiResponse<[]>;
    } catch (error) {
      console.error('API/FOOD/PUT', error);

      return {
        success: false,
        message: 'Could not connect to the server.',
      } satisfies ApiResponse<[]>;
    }
  }

  async deleteFood(foodId: number): Promise<ApiResponse<[]>> {
    try {
      const requestHeaders = await headers();
      const response = await fetch(`${FOOD_API_URL}/${foodId}`, {
        method: 'DELETE',
        headers: {
          Cookie: requestHeaders.get('cookie') ?? '',
        },
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
      const response = await fetch(`${FOOD_API_URL}/${foodId}`, {
        method: 'GET',
      });

      return (await response.json()) as ApiResponse<FoodViewModel>;
    } catch (error) {
      console.error('API/FOOD/{ID}', error);

      return {
        success: false,
        message: 'Could not connect to the server',
      };
    }
  }
}

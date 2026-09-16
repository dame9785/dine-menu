import { CategoryDto } from '@/schemas/category';
import { ApiResponse, CategoryApiResponse } from '@/types/api-responses';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

const API_URL = `${BASE_URL}/api/category`;

export class CategoryService {
  async getAll(page: number): Promise<CategoryApiResponse> {
    try {
      const response = await fetch(`${API_URL}?page=${page}`, {
        method: 'GET',
      });

      return (await response.json()) as CategoryApiResponse;
    } catch (error) {
      console.error('API/CATEGORY/GET', error);

      return {
        success: false,
        message: 'Could not connect to the server.',
        data: [],
        pagination: null,
      } satisfies CategoryApiResponse;
    }
  }

  async create(dto: CategoryDto): Promise<ApiResponse<[]>> {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        body: JSON.stringify(dto),
      });
      return (await response.json()) as ApiResponse<[]>;
    } catch (error) {
      return {
        success: false,
        message: 'Could not connect to the server',
      } satisfies ApiResponse<[]>;
    }
  }

  async delete(categoryId: number): Promise<ApiResponse<[]>> {
    try {
      const response = await fetch(`${API_URL}/${categoryId}`, {
        method: 'DELETE',
      });
      return (await response.json()) as ApiResponse<[]>;
    } catch (error) {
      console.error('API CALL ERROR');
      return {
        success: false,
        message: 'Could not connect to the server',
      } satisfies ApiResponse<[]>;
    }
  }

  async update(dto: CategoryDto, categoryId: number): Promise<ApiResponse<[]>> {
    try {
      const response = await fetch(`${API_URL}/${categoryId}`, {
        method: 'PUT',
        body: JSON.stringify(dto),
      });
      return (await response.json()) as ApiResponse<[]>;
    } catch (error) {
      return {
        success: false,
        message: 'Could not connect to the server',
      } satisfies ApiResponse<[]>;
    }
  }
}

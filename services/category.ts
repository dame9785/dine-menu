import { ApiResponse } from '@/types/api-responses';
import { CategoryDto, CategoryViewModel } from '@/types/category';

const API_URL = 'http://localhost:3000/api/category';

export class CategoryService {
  async getAll(): Promise<ApiResponse<CategoryViewModel[]>> {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'GET',
      });
      return (await response.json()) as ApiResponse<CategoryViewModel[]>;
    } catch (error) {
      return {
        success: false,
        message: 'Could not connect to the server',
      } satisfies ApiResponse<[]>;
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

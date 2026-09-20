import { headers } from 'next/headers';

import { CategoryDto } from '@/schemas/category';
import { ApiResponse, CategoryApiResponse } from '@/types/api-responses';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

const CATEGORY_API_URL = `${API_URL}/category`;

type ApiErrorResponse = {
  message?: string;
};

export class CategoryService {
  /**
   * Get request headers including session cookies.
   */
  private async getRequestHeaders(): Promise<HeadersInit> {
    const requestHeaders = await headers();

    return {
      Cookie: requestHeaders.get('cookie') ?? '',
    };
  }

  /**
   * Safely parse JSON response.
   */
  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');

    if (!contentType?.includes('application/json')) {
      throw new Error('Invalid server response.');
    }

    return (await response.json()) as T;
  }

  /**
   * Get all categories.
   */
  async getAll(page: number): Promise<CategoryApiResponse> {
    try {
      const response = await fetch(`${CATEGORY_API_URL}?page=${encodeURIComponent(page)}`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (!response.ok) {
        console.error('Failed to fetch categories:', response.status);

        return {
          success: false,
          message: 'Could not load categories. Please try again.',
          data: [],
          pagination: null,
        };
      }

      return await this.parseResponse<CategoryApiResponse>(response);
    } catch (error) {
      console.error('CATEGORY_SERVICE_GET_ALL:', error);

      return {
        success: false,
        message: 'Could not connect to the server. Please try again.',
        data: [],
        pagination: null,
      };
    }
  }

  /**
   * Create a category.
   */
  async create(dto: CategoryDto): Promise<ApiResponse<[]>> {
    try {
      const response = await fetch(CATEGORY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(await this.getRequestHeaders()),
        },
        body: JSON.stringify(dto),
      });

      if (!response.ok) {
        console.error('Failed to create category:', response.status);

        return {
          success: false,
          message: 'Could not create category. Please try again.',
        };
      }

      return await this.parseResponse<ApiResponse<[]>>(response);
    } catch (error) {
      console.error('CATEGORY_SERVICE_CREATE:', error);

      return {
        success: false,
        message: 'Could not connect to the server. Please try again.',
      };
    }
  }

  /**
   * Update a category.
   */
  async update(dto: CategoryDto, categoryId: number): Promise<ApiResponse<[]>> {
    try {
      const response = await fetch(`${CATEGORY_API_URL}/${encodeURIComponent(categoryId)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(await this.getRequestHeaders()),
        },
        body: JSON.stringify(dto),
      });

      if (!response.ok) {
        console.error('Failed to update category:', response.status);

        return {
          success: false,
          message: 'Could not update category. Please try again.',
        };
      }

      return await this.parseResponse<ApiResponse<[]>>(response);
    } catch (error) {
      console.error('CATEGORY_SERVICE_UPDATE:', error);

      return {
        success: false,
        message: 'Could not connect to the server. Please try again.',
      };
    }
  }

  /**
   * Delete a category.
   */
  async delete(categoryId: number): Promise<ApiResponse<[]>> {
    try {
      const response = await fetch(`${CATEGORY_API_URL}/${encodeURIComponent(categoryId)}`, {
        method: 'DELETE',
        headers: {
          ...(await this.getRequestHeaders()),
        },
      });

      if (!response.ok) {
        console.error('Failed to delete category:', response.status);

        return {
          success: false,
          message: 'Could not delete category. Please try again.',
        };
      }

      return await this.parseResponse<ApiResponse<[]>>(response);
    } catch (error) {
      console.error('CATEGORY_SERVICE_DELETE:', error);

      return {
        success: false,
        message: 'Could not connect to the server. Please try again.',
      };
    }
  }
}

import { ApiResponse, MenuApiResponse } from '@/types/api-responses';
import { MenuItemViewModel } from '@/types/menu';
import { headers } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

const MENU_API_URL = `${API_URL}/menu`;

export class MenuService {
  async getAll(
    page: number,
    searchParams: string,
    categoryParam: string,
    filterParam: string,
    sortBy: string,
    userId?: string,
  ): Promise<MenuApiResponse> {
    try {
      const requestHeaders = await headers();

      const url =
        `${MENU_API_URL}?page=${page}` +
        `&search=${encodeURIComponent(searchParams)}` +
        `&category=${encodeURIComponent(categoryParam)}` +
        `&filter=${encodeURIComponent(filterParam)}` +
        `&sortBy=${encodeURIComponent(sortBy)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Cookie: requestHeaders.get('cookie') ?? '',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorText = await response.text();

        console.error('API error:', errorText);

        return {
          success: false,
          message: 'Failed to fetch menu items.',
          data: [],
          pagination: null,
        };
      }

      const result = (await response.json()) as MenuApiResponse;

      return result;
    } catch (error) {
      console.error('error api/menu/get:', error);

      return {
        success: false,
        message: 'Could not connect to the server.',
        data: [],
        pagination: null,
      } satisfies MenuApiResponse;
    }
  }

  async update(menuItemId: number, formData: FormData): Promise<ApiResponse<[]>> {
    try {
      const requestHeaders = await headers();
      const response = await fetch(`${MENU_API_URL}/${menuItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Cookie: requestHeaders.get('cookie') ?? '',
        },
        body: formData,
      });

      return (await response.json()) as ApiResponse<[]>;
    } catch (error) {
      console.error('error api/menu/put:', error);

      return {
        success: false,
        message: 'Could not connect to the server.',
      } satisfies ApiResponse<[]>;
    }
  }

  async delete(menuItemId: number): Promise<ApiResponse<[]>> {
    try {
      const requestHeaders = await headers();
      const response = await fetch(`${MENU_API_URL}/${menuItemId}`, {
        method: 'DELETE',
        headers: {
          Cookie: requestHeaders.get('cookie') ?? '',
        },
      });

      return (await response.json()) as ApiResponse<[]>;
    } catch (error) {
      console.error('error api/menu/delete:', error);

      return {
        success: false,
        message: 'Could not connect to the server.',
      } satisfies ApiResponse<[]>;
    }
  }

  async getById(menuItemId: string): Promise<ApiResponse<MenuItemViewModel>> {
    try {
      const response = await fetch(`${MENU_API_URL}/${menuItemId}`, {
        method: 'GET',
      });

      return (await response.json()) as ApiResponse<MenuItemViewModel>;
    } catch (error) {
      console.error('error api/menu/[id]/get:', error);

      return {
        success: false,
        message: 'Could not connect to the server',
      };
    }
  }

  async addFavorite(menuItemId: number): Promise<ApiResponse<[]>> {
    try {
      const requestHeaders = await headers();
      const response = await fetch(`${MENU_API_URL}/favorite/${menuItemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: requestHeaders.get('cookie') ?? '',
        },
      });

      return (await response.json()) as ApiResponse<[]>;
    } catch (error) {
      console.error('error api/menu/favorite/[menuId]/get:', error);

      return {
        success: false,
        message: 'Could not connect to the server.',
      } satisfies ApiResponse<[]>;
    }
  }

  async deleteFavorite(menuItemId: number): Promise<ApiResponse<[]>> {
    try {
      const requestHeaders = await headers();
      const response = await fetch(`${MENU_API_URL}/favorite/${menuItemId}`, {
        method: 'DELETE',
        headers: {
          Cookie: requestHeaders.get('cookie') ?? '',
        },
      });

      return (await response.json()) as ApiResponse<[]>;
    } catch (error) {
      console.error('error api/menu/favorite/[menuId]/delete:', error);

      return {
        success: false,
        message: 'Could not connect to the server.',
      } satisfies ApiResponse<[]>;
    }
  }

  async getFavoriteIds(): Promise<ApiResponse<number[]>> {
    try {
      const requestHeaders = await headers();

      const response = await fetch(`${MENU_API_URL}/favorite`, {
        method: 'GET',
        headers: {
          Cookie: requestHeaders.get('cookie') ?? '',
        },
      });

      return (await response.json()) as ApiResponse<number[]>;
    } catch (error) {
      console.error('error api/menu/favorite/get:', error);

      return {
        success: false,
        message: 'Could not connect to the server.',
        data: [],
      };
    }
  }
}

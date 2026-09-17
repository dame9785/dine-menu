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
  ): Promise<MenuApiResponse> {
    try {
      const requestHeaders = await headers();
      const response = await fetch(
        `${MENU_API_URL}?page=${page}&search=${encodeURIComponent(searchParams)}&category=${encodeURIComponent(categoryParam)}&filter=${encodeURIComponent(filterParam)}&sortBy=${encodeURIComponent(sortBy)}`,
        {
          method: 'GET',
          headers: {
            Cookie: requestHeaders.get('cookie') ?? '',
          },
        },
      );

      return (await response.json()) as MenuApiResponse;
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

  async add(formData: FormData): Promise<ApiResponse<[]>> {
    try {
      const requestHeaders = await headers();

      const response = await fetch(MENU_API_URL, {
        method: 'POST',
        body: formData,
        headers: {
          Cookie: requestHeaders.get('cookie') ?? '',
        },
      });

      return (await response.json()) as ApiResponse<[]>;
    } catch (error) {
      console.error('error api/menu/post:', error);

      return {
        success: false,
        message: 'Could not connect to the server.',
      } satisfies ApiResponse<[]>;
    }
  }

  async update(menuItemId: number, formData: FormData): Promise<ApiResponse<[]>> {
    try {
      const response = await fetch(`${MENU_API_URL}/${menuItemId}`, {
        method: 'PUT',
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

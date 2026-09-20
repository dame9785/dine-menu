import { Prisma } from '@/generated/prisma/client';

/**
 * Menu item with category and user-specific favorites.
 */
export type MenuWithCategory = Prisma.menuitemGetPayload<{
  include: {
    category: true;

    Favorite: {
      select: {
        id: true;
      };
    };
  };
}>;

/**
 * Generic result type.
 */
export type MenuResult<T = null> =
  | {
      success: true;
      message: string;
      data: T;
    }
  | {
      success: false;
      message: string;
      data?: never;
    };

/**
 * Paginated menu result.
 */
export type MenuListResult<T> =
  | {
      success: true;
      message: string;
      data: T;
      pagination: {
        totalItems: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
      };
    }
  | {
      success: false;
      message: string;
      data: [];
      pagination: null;
    };

/**
 * Favorite IDs result.
 */
export type FavoriteResult = MenuResult<number[]>;

/**
 * Repository result for menu listing.
 */
export type GetAllMenuResult = {
  menuItems: MenuWithCategory[];
  totalNumberOfMenuItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
};

export type MenuItemViewModel = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  categoryId: number;
  isFavorite: boolean;
};

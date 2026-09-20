import { Prisma } from '@/generated/prisma/client';

/**
 * Menu item with category, company and user-specific favorites.
 */
export type MenuWithCategory = Prisma.menuitemGetPayload<{
  include: {
    category: true;

    company: {
      select: {
        id: true;
        name: true;
      };
    };

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

/**
 * Company view model.
 */
export type CompanyViewModel = {
  id: number;
  name: string;
};

/**
 * Menu item view model.
 */
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
  company: CompanyViewModel | null;
  isFavorite: boolean;
};

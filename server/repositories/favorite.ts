import { prisma } from '@/lib/prisma';

import { FavoriteResult, MenuResult } from '@/types/menu';

export class FavoriteRepository {
  /**
   * ADD FAVORITE
   */
  async addFavorite(userId: string, menuItemId: number): Promise<MenuResult<null>> {
    try {
      /**
       * upsert prevents duplicate favorites.
       *
       * Requires a composite unique key:
       * userId_menuItemId
       */
      await prisma.favorite.upsert({
        where: {
          userId_menuItemId: {
            userId,
            menuItemId,
          },
        },

        update: {},

        create: {
          userId,
          menuItemId,
        },
      });

      return {
        success: true,
        message: 'Menu item added to favorites successfully.',
        data: null,
      };
    } catch (error) {
      console.error('FavoriteRepository.addFavorite failed:', error);

      return {
        success: false,
        message: 'Unable to add menu item to favorites.',
      };
    }
  }

  /**
   * DELETE FAVORITE
   */
  async deleteFavorite(userId: string, menuItemId: number): Promise<MenuResult<null>> {
    try {
      /**
       * deleteMany does not throw P2025 if
       * the favorite does not exist.
       */
      const result = await prisma.favorite.deleteMany({
        where: {
          userId,
          menuItemId,
        },
      });

      if (result.count === 0) {
        return {
          success: false,
          message: 'Favorite not found.',
        };
      }

      return {
        success: true,
        message: 'Menu item removed from favorites successfully.',
        data: null,
      };
    } catch (error) {
      console.error('FavoriteRepository.deleteFavorite failed:', error);

      return {
        success: false,
        message: 'Unable to remove menu item from favorites.',
      };
    }
  }

  /**
   * GET FAVORITE IDS
   */
  async getFavoriteIds(userId: string): Promise<FavoriteResult> {
    try {
      const favorites = await prisma.favorite.findMany({
        where: {
          userId,
        },

        select: {
          menuItemId: true,
        },

        orderBy: {
          menuItemId: 'asc',
        },
      });

      const favoriteIds = favorites.map((favorite) => favorite.menuItemId);

      return {
        success: true,
        message: 'Favorite IDs retrieved successfully.',
        data: favoriteIds,
      };
    } catch (error) {
      console.error('FavoriteRepository.getFavoriteIds failed:', error);

      return {
        success: false,
        message: 'Unable to retrieve favorite IDs.',
      };
    }
  }
}

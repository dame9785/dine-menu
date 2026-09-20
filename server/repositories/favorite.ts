import { prisma } from '@/lib/prisma';
import { FavoriteResult, MenuResult } from '@/types/menu';

export class FavoriteRepository {
  async addFavorite(userId: string, menuItemId: number): Promise<MenuResult> {
    try {
      const data = await prisma.favorite.upsert({
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
        message: 'Successfully added to favorites',
      };
    } catch (error) {
      console.error('Add  menu item to favorite error:', error);

      return {
        success: false,
        message: 'Something went wrong while adding the menu item to favorite.',
      };
    }
  }
  async deleteFavorite(userId: string, menuItemId: number): Promise<MenuResult> {
    try {
      await prisma.favorite.delete({
        where: {
          userId_menuItemId: {
            userId,
            menuItemId,
          },
        },
      });

      return {
        success: true,
        message: 'Successfully delete as favorites',
      };
    } catch (error) {
      console.error('Delete menu item as favorite error:', error);

      return {
        success: false,
        message: 'Something went wrong while deleting the menu item from favorite.',
      };
    }
  }
  // Hämta alla favorit-ID:n för en användare
  async getFavoriteIds(userId: string): Promise<FavoriteResult> {
    try {
      const favorites = await prisma.favorite.findMany({
        where: {
          userId,
        },
        select: {
          menuItemId: true,
        },
      });

      const favoritesIds = favorites.map((favorite) => favorite.menuItemId);
      return {
        success: true,
        message: 'Successfully getting all favorites',
        data: favoritesIds,
      };
    } catch (error) {
      console.error('Error get favorite-repository:', error);

      return {
        success: false,
        message: 'Something went wrong while getting all favorites',
      };
    }
  }
}

import { prisma } from '@/lib/prisma';
import { id } from 'zod/v4/locales';

export class FavoriteRepository {
  async addFavorite(userId: string, menuItemId: number) {
    return await prisma.favorite.upsert({
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
  }
  async deleteFavorite(userId: string, menuItemId: number) {
    return await prisma.favorite.delete({
      where: {
        userId_menuItemId: {
          userId,
          menuItemId,
        },
      },
    });
  }
}

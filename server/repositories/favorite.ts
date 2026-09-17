import { prisma } from '@/lib/prisma';

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
  // Hämta alla favorit-ID:n för en användare
  async getFavoriteIds(userId: string): Promise<number[]> {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId,
      },
      select: {
        menuItemId: true,
      },
    });

    return favorites.map((favorite) => favorite.menuItemId);
  }
}

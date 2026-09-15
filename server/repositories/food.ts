import { prisma } from '@/lib/prisma';
import { FoodDto } from '@/types/food';

export class FoodRepository {
  async addFood(dto: FoodDto) {
    return await prisma.menuItem.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        imageUrl: dto.imageUrl,
        category: {
          connect: {
            id: dto.categoryId,
          },
        },
      },
    });
  }

  async getAll(page: number, searchParam: string, categoryParam: string, filterParam: string, sortBy: string) {
    const pageSize = 6;

    const currentPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;

    const skip = (currentPage - 1) * pageSize;

    const search = searchParam?.trim() ?? '';
    const category = categoryParam?.trim() ?? '';

    const orderBy =
      sortBy === 'lowest'
        ? { price: 'asc' as const }
        : sortBy === 'highest'
          ? { price: 'desc' as const }
          : { createdAt: 'desc' as const };

    const filterIds = filterParam
      ? filterParam
          .split(',')
          .map(Number)
          .filter((id) => !Number.isNaN(id))
      : [];

    const where = {
      AND: [
        // Search
        search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                  },
                },
                {
                  description: {
                    contains: search,
                  },
                },
              ],
            }
          : {},

        // Category
        category
          ? {
              category: {
                name: category,
              },
            }
          : {},

        // Favorites
        filterIds.length > 0
          ? {
              id: {
                in: filterIds,
              },
            }
          : {},
      ],
    };

    const totalNumberOfFoods = await prisma.menuItem.count({
      where,
    });

    const totalPages = Math.ceil(totalNumberOfFoods / pageSize);

    const foods = await prisma.menuItem.findMany({
      where,
      orderBy,
      include: {
        category: true,
      },
      skip,
      take: pageSize,
    });

    return {
      totalNumberOfFoods,
      foods,
      totalPages,
      pageSize,
    };
  }

  async delete(foodId: number) {
    return await prisma.menuItem.delete({
      where: {
        id: foodId,
      },
    });
  }

  async getById(foodId: number) {
    return await prisma.menuItem.findUnique({
      where: {
        id: foodId,
      },
      include: {
        category: true,
      },
    });
  }
}

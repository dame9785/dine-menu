import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { UpdateFoodDto } from '@/schemas/food';
import { FoodDto } from '@/types/food';

type FoodWithCategory = Prisma.menuitemGetPayload<{
  include: {
    category: true;
    favorites: {
      select: {
        id: true;
      };
    };
  };
}>;

export type GetAllFoodsResult = {
  foods: FoodWithCategory[];
  totalNumberOfFoods: number;
  pageSize: number;
  totalPages: number;
};

export type GetMenuItemResult = {
  food: FoodWithCategory;
};

export class FoodRepository {
  async addFood(dto: FoodDto) {
    return await prisma.menuitem.create({
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

  async getAll(
    page: number,
    searchParam: string,
    categoryParam: string,
    filterParam: string,
    sortBy: string,
    userId?: string,
  ): Promise<GetAllFoodsResult> {
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

        // Favorites filter
        filterIds.length > 0
          ? {
              id: {
                in: filterIds,
              },
            }
          : {},
      ],
    };

    console.log('USER ID FROM SESSION:', userId);

    const [totalNumberOfFoods, foods] = await Promise.all([
      prisma.menuitem.count({
        where,
      }),

      prisma.menuitem.findMany({
        where,
        orderBy,
        include: {
          category: true,
          favorites: {
            where: {
              userId: userId ?? '__unauthenticated__',
            },
            select: {
              id: true,
            },
          },
        },
        skip,
        take: pageSize,
      }),
    ]);

    const totalPages = Math.ceil(totalNumberOfFoods / pageSize);

    return {
      totalNumberOfFoods,
      foods,
      totalPages,
      pageSize,
    };
  }

  async delete(foodId: number) {
    return await prisma.menuitem.delete({
      where: {
        id: foodId,
      },
    });
  }

  async getById(foodId: number): Promise<FoodWithCategory | null> {
    const food = await prisma.menuitem.findUnique({
      where: {
        id: foodId,
      },
      include: {
        category: true,
        favorites: true,
      },
    });

    return food;
  }

  async update(foodId: number, dto: UpdateFoodDto): Promise<GetMenuItemResult> {
    const food = await prisma.menuitem.update({
      where: {
        id: foodId,
      },
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
      include: {
        category: true,
        favorites: true,
      },
    });

    return {
      food,
    };
  }
}

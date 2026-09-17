import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { UpdateMenuDto } from '@/schemas/menu';
import { AddMenuItemDto } from '@/types/menu';

type MenuWithCategory = Prisma.menuitemGetPayload<{
  include: {
    category: true;
    Favorite: {
      select: {
        id: true;
      };
    };
  };
}>;

export type GetAllMenuResult = {
  menuItems: MenuWithCategory[];
  totalNumberOfMenuItems: number;
  pageSize: number;
  totalPages: number;
};

export type GetMenuItemResult = {
  menuItem: MenuWithCategory;
};

export class MenuRepository {
  async addMenu(dto: AddMenuItemDto) {
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
  ): Promise<GetAllMenuResult> {
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

    const [totalNumberOfMenuItems, menuItems] = await Promise.all([
      prisma.menuitem.count({
        where,
      }),

      prisma.menuitem.findMany({
        where,
        orderBy,
        include: {
          category: true,
          Favorite: {
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

    const totalPages = Math.ceil(totalNumberOfMenuItems / pageSize);

    return {
      totalNumberOfMenuItems,
      menuItems,
      totalPages,
      pageSize,
    };
  }

  async delete(menuId: number) {
    return await prisma.menuitem.delete({
      where: {
        id: menuId,
      },
    });
  }

  async getById(menuId: number): Promise<MenuWithCategory | null> {
    const menuItem = await prisma.menuitem.findUnique({
      where: {
        id: menuId,
      },
      include: {
        category: true,
        Favorite: true,
      },
    });

    return menuItem;
  }

  async update(menuId: number, dto: UpdateMenuDto): Promise<GetMenuItemResult> {
    const menuItem = await prisma.menuitem.update({
      where: {
        id: menuId,
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
        Favorite: true,
      },
    });

    return {
      menuItem,
    };
  }
}

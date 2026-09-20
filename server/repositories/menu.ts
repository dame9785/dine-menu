import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { AddMenuDto, UpdateMenuDto } from '@/schemas/menu';
import { AddMenuItemDto, MenuResult } from '@/types/menu';

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
  async addMenu(dto: AddMenuDto) {
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

        company: {
          connect: {
            id: dto.companyId,
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

  async delete(menuId: number, companyId: number, userId: string) {
    try {
      const existingMenuItem = await prisma.menuitem.findFirst({
        where: {
          id: menuId,
          companyId,
          company: {
            ownerId: userId,
          },
        },
      });

      if (!existingMenuItem) {
        return {
          success: false,
          message: 'You dont have permision to delete this item.',
        };
      }

      await prisma.menuitem.delete({
        where: {
          id: menuId,
        },
      });

      return {
        success: true,
        message: 'Menu item deleted successfully.',
      };
    } catch (error) {
      console.error('Delete menu item error:', error);

      return {
        success: false,
        message: 'Something went wrong while deleting the menu item.',
      };
    }
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

  async update(menuId: number, dto: UpdateMenuDto, imageUrl?: string, userId?: string): Promise<MenuResult> {
    const existingMenuItem = await prisma.menuitem.findUnique({
      where: {
        id: menuId,
      },
      include: {
        company: {
          select: {
            ownerId: true,
          },
        },
      },
    });

    // Kontrollera att maträtten finns
    if (!existingMenuItem) {
      return {
        success: false,
        message: 'Couldt not found the menu item.',
      };
    }

    // Kontrollera att användaren äger företaget
    if (!existingMenuItem.company || existingMenuItem.company.ownerId !== userId) {
      return {
        success: false,
        message: 'You are not authorized to modify this menu item.',
      };
    }

    const menuItem = await prisma.menuitem.update({
      where: {
        id: menuId,
      },
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,

        ...(imageUrl && {
          imageUrl,
        }),

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
      success: true,
      message: 'Success',
      data: menuId,
    };
  }
}

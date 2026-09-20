import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

import { CreateMenuRepositoryInput, UpdateMenuRepositoryInput } from '@/types/menu-repository';

import { GetAllMenuResult, MenuWithCategory } from '@/types/menu';

export class MenuRepository {
  private readonly pageSize = 6;

  /**
   * CREATE MENU ITEM
   */
  async addMenu(dto: CreateMenuRepositoryInput) {
    return prisma.menuitem.create({
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

      include: {
        category: true,

        Favorite: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  /**
   * GET ALL MENU ITEMS
   */
  async getAll(
    page: number,
    searchParam: string,
    categoryParam: string,
    favorites: boolean,
    sortBy: string,
    userId?: string,
  ): Promise<GetAllMenuResult> {
    const currentPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;

    const skip = (currentPage - 1) * this.pageSize;

    const search = searchParam.trim();
    const category = categoryParam.trim();

    const orderBy =
      sortBy === 'lowest'
        ? { price: 'asc' as const }
        : sortBy === 'highest'
          ? { price: 'desc' as const }
          : { createdAt: 'desc' as const };

    const conditions: Prisma.menuitemWhereInput[] = [];

    /**
     * Search filter.
     */
    if (search) {
      conditions.push({
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
      });
    }

    /**
     * Category filter.
     */
    if (category) {
      conditions.push({
        category: {
          name: category,
        },
      });
    }

    /**
     * Favorites filter.
     *
     * Service ensures that userId exists when
     * favorites is true.
     */
    if (favorites && userId) {
      conditions.push({
        Favorite: {
          some: {
            userId,
          },
        },
      });
    }

    const where: Prisma.menuitemWhereInput =
      conditions.length > 0
        ? {
            AND: conditions,
          }
        : {};

    const [totalNumberOfMenuItems, menuItems] = await Promise.all([
      prisma.menuitem.count({
        where,
      }),

      prisma.menuitem.findMany({
        where,
        orderBy,
        skip,
        take: this.pageSize,

        include: {
          category: true,

          company: {
            select: {
              id: true,
              name: true,
            },
          },

          Favorite: {
            where: userId
              ? {
                  userId,
                }
              : {
                  userId: '__unauthenticated__',
                },

            select: {
              id: true,
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(totalNumberOfMenuItems / this.pageSize);

    return {
      menuItems,
      totalNumberOfMenuItems,
      currentPage,
      pageSize: this.pageSize,
      totalPages,
    };
  }

  /**
   * GET MENU ITEM BY ID
   *
   * Only fetches the current user's favorite.
   */
  async getById(menuItemId: number, userId?: string): Promise<MenuWithCategory | null> {
    return prisma.menuitem.findUnique({
      where: {
        id: menuItemId,
      },

      include: {
        category: true,

        company: {
          select: {
            id: true,
            name: true,
          },
        },

        Favorite: {
          where: userId
            ? {
                userId,
              }
            : {
                userId: '__unauthenticated__',
              },

          select: {
            id: true,
          },
        },
      },
    });
  }
  /**
   * FIND MENU ITEM OWNED BY USER
   */
  async findOwnedByUser(menuItemId: number, userId: string) {
    return prisma.menuitem.findFirst({
      where: {
        id: menuItemId,

        company: {
          ownerId: userId,
        },
      },
    });
  }

  /**
   * UPDATE MENU ITEM
   */
  async update(menuItemId: number, dto: UpdateMenuRepositoryInput, userId: string): Promise<boolean> {
    const existingMenuItem = await this.findOwnedByUser(menuItemId, userId);

    if (!existingMenuItem) {
      return false;
    }

    await prisma.menuitem.update({
      where: {
        id: menuItemId,
      },

      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,

        ...(dto.imageUrl !== undefined && {
          imageUrl: dto.imageUrl,
        }),

        category: {
          connect: {
            id: dto.categoryId,
          },
        },
      },
    });

    return true;
  }

  /**
   * DELETE MENU ITEM
   */
  async delete(menuItemId: number, userId: string): Promise<boolean> {
    const existingMenuItem = await this.findOwnedByUser(menuItemId, userId);

    if (!existingMenuItem) {
      return false;
    }

    await prisma.menuitem.delete({
      where: {
        id: menuItemId,
      },
    });

    return true;
  }
}

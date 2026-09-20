import { Prisma } from '@/generated/prisma/client';
import { MenuItemViewModel } from '@/types/menu';

type MenuItemWithCategory = Prisma.menuitemGetPayload<{
  include: {
    category: true;
    Favorite: {
      select: {
        id: true;
      };
    };
  };
}>;

export class MenuMapper {
  static menuItemDboToViewModel(menuItem: MenuItemWithCategory): MenuItemViewModel {
    return {
      id: menuItem.id,
      name: menuItem.name,
      description: menuItem.description,
      price: Number(menuItem.price),
      imageUrl: menuItem.imageUrl ?? '',
      createdAt: menuItem.createdAt,
      updatedAt: menuItem.updatedAt,
      category: menuItem.category.name,
      categoryId: menuItem.categoryId,

      isFavorite: (menuItem.Favorite?.length ?? 0) > 0,
    };
  }
}

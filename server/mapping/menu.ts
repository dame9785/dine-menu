import { MenuItemViewModel, MenuWithCategory } from '@/types/menu';

export class MenuMapper {
  static menuItemDboToViewModel(menuItem: MenuWithCategory): MenuItemViewModel {
    return {
      id: menuItem.id,
      name: menuItem.name,
      description: menuItem.description,

      // Convert Prisma Decimal to a plain number
      price: Number(menuItem.price),

      imageUrl: menuItem.imageUrl ?? '',

      createdAt: menuItem.createdAt,
      updatedAt: menuItem.updatedAt,

      category: menuItem.category.name,
      categoryId: menuItem.categoryId,

      isFavorite: menuItem.Favorite.length > 0,
    };
  }
}

import { Prisma } from '@/generated/prisma/client';
import { FoodViewModel } from '@/types/food';

type FoodWithCategory = Prisma.MenuItemGetPayload<{
  include: {
    category: true;
  };
}>;

export class FoodMapper {
  static foodDboToViewModel(foodItem: FoodWithCategory): FoodViewModel {
    return {
      name: foodItem.name,
      description: foodItem.description,
      price: foodItem.price,
      imageUrl: foodItem.imageUrl ?? '',
      categoryId: foodItem.categoryId,
      category: foodItem.category.name,
      createdAt: foodItem.createdAt,
      updatedAt: foodItem.updatedAt,
    };
  }
}

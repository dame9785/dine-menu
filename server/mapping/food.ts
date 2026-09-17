import { Prisma } from '@/generated/prisma/client';
import { FoodViewModel } from '@/types/food';

type FoodWithCategory = Prisma.menuitemGetPayload<{
  include: {
    category: true;
    Favorite: {
      select: {
        id: true;
      };
    };
  };
}>;

export class FoodMapper {
  static foodDboToViewModel(foodItem: FoodWithCategory): FoodViewModel {
    return {
      id: foodItem.id,
      name: foodItem.name,
      description: foodItem.description,
      price: foodItem.price,
      imageUrl: foodItem.imageUrl ?? '',
      createdAt: foodItem.createdAt,
      updatedAt: foodItem.updatedAt,
      category: foodItem.category.name,
      categoryId: foodItem.categoryId,

      isFavorite: (foodItem.Favorite?.length ?? 0) > 0,
    };
  }
}

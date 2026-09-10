import { Category } from '@/generated/prisma/client';
import { CategoryViewModel } from '@/types/category';

export class CategoryMapper {
  static categoryDboToViewModel(category: Category): CategoryViewModel {
    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}

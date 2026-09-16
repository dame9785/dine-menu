import { category } from '@/generated/prisma/client';

import { CategoryViewModel } from '@/types/category';

export class CategoryMapper {
  static categoryDboToViewModel(category: category): CategoryViewModel {
    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}

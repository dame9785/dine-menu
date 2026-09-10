import { prisma } from '@/lib/prisma';
import { CategoryDto } from '@/schemas/category';

export class CategoryRepository {
  async getAll(page: number) {
    const totalNumberOfCategories = await prisma.category.count();

    const pageSize = 5;
    const skip = (page - 1) * pageSize;

    const totalPages = Math.ceil(totalNumberOfCategories / pageSize);

    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: pageSize,
    });

    return {
      totalNumberOfCategories,
      categories,
      totalPages,
      pageSize,
    };
  }

  //CREATE CATEGORY
  async create(dto: CategoryDto) {
    return prisma.category.create({
      data: {
        name: dto.name,
      },
    });
  }

  //DELETE CATEGORY
  async delete(categoryId: number) {
    return prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }

  //UPDATE CATEGORY
  async update(dto: CategoryDto, categoryId: number) {
    return prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: dto.name,
      },
    });
  }
}

import { prisma } from "@/lib/prisma";
import { CategoryDto } from "@/types/category";

export class CategoryRepository {
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
}

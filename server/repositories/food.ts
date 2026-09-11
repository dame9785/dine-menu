import { prisma } from '@/lib/prisma';
import { FoodDto } from '@/types/food';

export class FoodRepository {
  async addFood(dto: FoodDto) {
    return await prisma.menuItem.create({
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
      },
    });
  }

  async getAll(page: number) {
    const totalNumberOfFoods = await prisma.menuItem.count();
    const pageSize = 6;
    const skip = (page - 1) * pageSize;

    const totalPages = Math.ceil(totalNumberOfFoods / pageSize);

    const foods = await prisma.menuItem.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
      skip,
      take: pageSize,
    });

    return {
      totalNumberOfFoods,
      foods,
      totalPages,
      pageSize,
    };
  }

  async delete(foodId: number) {
    return await prisma.menuItem.delete({
      where: {
        id: foodId,
      },
    });
  }
}

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

  async getAll() {
    return await prisma.menuItem.findMany({
      include: {
        category: true,
      },
    });
  }
}

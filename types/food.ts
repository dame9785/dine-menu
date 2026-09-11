import { Decimal } from '@prisma/client/runtime/client';

export interface FoodDto {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

export interface FoodViewModel {
  name: string;
  description: string;
  price: Decimal;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  categoryId: number;
}

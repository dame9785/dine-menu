import { Decimal } from '@prisma/client/runtime/client';

export interface FoodDto {
  name: string;
  description: string;
  price: Decimal;
  imageUrl: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
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

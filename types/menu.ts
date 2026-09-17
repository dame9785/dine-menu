import { Decimal } from '@prisma/client/runtime/client';

export interface AddMenuItemDto {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

export interface MenuItemViewModel {
  id: number;
  name: string;
  description: string;
  price: Decimal;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  categoryId: number;
  isFavorite: boolean;
}

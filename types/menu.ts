import { Decimal } from '@prisma/client/runtime/client';

export interface AddMenuItemDto {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  companyId: number;
  imageUrl: string;
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

export interface MenuResult {
  success: boolean;
  message: string;
  data?: number;
}

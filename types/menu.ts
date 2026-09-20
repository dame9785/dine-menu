import { Decimal } from '@prisma/client/runtime/client';
import { Pagination } from './api-responses';

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
  price: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  categoryId: number;
  isFavorite: boolean;
}

export interface MenuResult<T> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: Pagination;
}

export interface FavoriteResult {
  success: boolean;
  message: string;
  data?: number[];
}

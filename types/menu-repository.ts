import { Prisma } from '@/generated/prisma/client';

/**
 * Data required to create a menu item.
 *
 * CompanyId is obtained from the authenticated user
 * in the service layer.
 */
export type CreateMenuRepositoryInput = {
  name: string;
  description: string;
  price: number | Prisma.Decimal;
  imageUrl: string;
  categoryId: number;
  companyId: number;
};

/**
 * Data required to update a menu item.
 */
export type UpdateMenuRepositoryInput = {
  name: string;
  description: string;
  price: number | Prisma.Decimal;
  categoryId: number;
  imageUrl?: string;
};

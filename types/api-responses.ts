import { CategoryViewModel } from './category';
import { MenuItemViewModel } from './menu';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface CategoryApiResponse {
  success: boolean;
  message: string;
  data: CategoryViewModel[];
  pagination: Pagination | null;
}

export interface MenuApiResponse {
  success: boolean;
  message: string;
  data: MenuItemViewModel[];
  pagination: Pagination | null;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

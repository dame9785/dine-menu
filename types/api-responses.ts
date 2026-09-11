import { CategoryViewModel } from './category';
import { FoodViewModel } from './food';

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

export interface FoodApiResponse {
  success: boolean;
  message: string;
  data: FoodViewModel[];
  pagination: Pagination | null;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

import { CategoryViewModel } from './category';

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

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

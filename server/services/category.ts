import { CategoryDto, CategoryViewModel } from '@/types/category';
import { CategoryRepository } from '../repositories/category';
import { ApiResponse } from '@/types/api-responses';
import { CategoryMapper } from '@/server/mapping/category';

const cateogryRepository = new CategoryRepository();

export class CategoryService {
  //GET ALL CATEGORIES
  async getAll(): Promise<ApiResponse<CategoryViewModel[]>> {
    try {
      const categories = await cateogryRepository.getAll();
      const viewModel = categories.map((i) => CategoryMapper.categoryDboToViewModel(i));

      return {
        success: true,
        message: 'Retrieval of categories succeeded.',
        data: viewModel,
      } satisfies ApiResponse<CategoryViewModel[]>;
    } catch (error) {
      console.error('Server error', error);

      return {
        success: false,
        message: 'Something went wrong while getting all the categories.',
      } satisfies ApiResponse<CategoryViewModel[]>;
    }
  }

  //CREATE CATEGORY
  async create(dto: CategoryDto): Promise<ApiResponse<[]>> {
    try {
      await cateogryRepository.create(dto);
      return {
        success: true,
        message: 'Category successfully created',
      } satisfies ApiResponse<[]>;
    } catch (error) {
      console.error('Server error', error);
      return {
        success: false,
        message: 'Something went wrong while creating the category.',
      } satisfies ApiResponse<[]>;
    }
  }

  //DELETE CATEGORY
  async delete(categoryId: number): Promise<ApiResponse<[]>> {
    try {
      await cateogryRepository.delete(categoryId);
      return {
        success: true,
        message: 'Category successfully deleted',
      } satisfies ApiResponse<[]>;
    } catch (error) {
      console.error('Server error', error);
      return {
        success: false,
        message: 'Something went wrong while deleting the category.',
      } satisfies ApiResponse<[]>;
    }
  }

  //UPDATE CATEGORY
  async update(dto: CategoryDto, categoryId: number): Promise<ApiResponse<[]>> {
    try {
      await cateogryRepository.update(dto, categoryId);
      return {
        success: true,
        message: 'Category successfully updated',
      } satisfies ApiResponse<[]>;
    } catch (error) {
      console.error('Server error', error);
      return {
        success: false,
        message: 'Something went wrong while updating the category.',
      } satisfies ApiResponse<[]>;
    }
  }
}

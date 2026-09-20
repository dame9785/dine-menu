'use server';

import { CategoryDto, UpdateCategoryDto } from '@/schemas/category';
import { CategoryService } from '@/services/category';
import { revalidatePath } from 'next/cache';

const categoryService = new CategoryService();

export async function deleteCategory(categoryId: number) {
  try {
    const response = await categoryService.delete(categoryId);
    console.log(response);

    if (!response.success) {
      return {
        success: response.success,
        message: response.message,
      };
    }

    revalidatePath('/');

    return {
      success: response.success,
      message: response.message,
    };
  } catch (error) {
    console.error('DELETE CATEGORY ACTION ERROR', error);
    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}

export async function createCategory(dto: CategoryDto) {
  try {
    const response = await categoryService.create(dto);

    if (!response.success) {
      return {
        success: response.success,
        message: response.message,
      };
    }

    revalidatePath('/');

    return {
      success: response.success,
      message: response.message,
    };
  } catch (error) {
    console.error('CREATE CATEGORY ACTION ERROR', error);
    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}

export async function updateCategory(dto: UpdateCategoryDto, categoryId: number) {
  if (!categoryId) {
    return {
      success: false,
      message: 'not item found',
    };
  }

  try {
    const response = await categoryService.update(dto, categoryId);
    if (!response.success) {
      return {
        success: response.success,
        message: response.message,
      };
    }

    revalidatePath('/');

    return {
      success: response.success,
      message: response.message,
    };
  } catch (error) {
    console.error('UPDATE CATEGORY ACTION ERROR', error);
    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}

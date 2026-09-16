'use server';

import { CategoryDto, UpdateCategoryDto } from '@/schemas/category';
import { CategoryService } from '@/services/category';
import { revalidatePath } from 'next/cache';
import { success } from 'zod';

const categoryService = new CategoryService();

export async function deleteCategory(categoryId: number) {
  const response = await categoryService.delete(categoryId);

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
}

export async function createCategory(dto: CategoryDto) {
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
}

export async function updateCategory(dto: UpdateCategoryDto, categoryId: number) {
  if (!categoryId) {
    return {
      success: false,
      message: 'not item found',
    };
  }
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
}

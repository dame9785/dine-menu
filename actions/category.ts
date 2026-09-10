'use server';

import { CategoryService } from '@/services/category';
import { revalidatePath } from 'next/cache';

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

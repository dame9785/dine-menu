'use server';

import { CategoryDto } from '@/schemas/category';
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

export async function updateCategory(dto: CategoryDto) {
  if (!dto.id) {
    return;
  }
  const response = await categoryService.update(dto, dto.id);
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

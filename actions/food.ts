'use server';

import { FoodService } from '@/services/food';
import { FoodDto } from '@/types/food';
import { revalidatePath } from 'next/cache';

const foodService = new FoodService();
export async function addFood(formData: FormData): Promise<{ success: boolean; message: string }> {
  const response = await foodService.add(formData);

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

export async function deleteFood(foodId: number): Promise<{ success: boolean; message: string }> {
  const response = await foodService.deleteFood(foodId);
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

export async function updateFood(foodId: number, formData: FormData) {
  const response = await foodService.update(foodId, formData);
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

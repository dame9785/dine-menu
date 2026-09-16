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
  try {
    const response = await foodService.update(foodId, formData);

    if (!response.success) {
      return {
        success: false,
        message: response.message,
      };
    }

    revalidatePath('/');
    revalidatePath('/category');

    return {
      success: true,
      message: response.message,
    };
  } catch (error) {
    console.error('Update food error:', error);

    return {
      success: false,
      message: 'Something went wrong while updating food.',
    };
  }
}

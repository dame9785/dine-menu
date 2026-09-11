'use server';

import { FoodService } from '@/services/food';
import { revalidatePath } from 'next/cache';

const foodService = new FoodService();
export async function addFood(formData: FormData) {
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

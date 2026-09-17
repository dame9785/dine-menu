'use server';

import { FoodService } from '@/services/food';
import { revalidatePath } from 'next/cache';
import { checkAdmin } from '@/lib/auth-guard';

const foodService = new FoodService();

export async function addFood(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    const adminCheck = await checkAdmin();

    if (!adminCheck.authorized) {
      return {
        success: false,
        message: adminCheck.message,
      };
    }

    const response = await foodService.add(formData);

    if (!response.success) {
      return {
        success: false,
        message: response.message,
      };
    }

    revalidatePath('/');

    return {
      success: true,
      message: response.message,
    };
  } catch (error) {
    console.error('DELETE FOOD ACTION ERROR.', error);
    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}

export async function deleteFood(foodId: number): Promise<{ success: boolean; message: string }> {
  try {
    const adminCheck = await checkAdmin();

    if (!adminCheck.authorized) {
      return {
        success: false,
        message: adminCheck.message,
      };
    }

    const response = await foodService.deleteFood(foodId);

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
    console.error('DELETE FOOD ACTION ERROR:', error);

    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}

export async function updateFood(foodId: number, formData: FormData) {
  try {
    const adminCheck = await checkAdmin();

    if (!adminCheck.authorized) {
      return {
        success: false,
        message: adminCheck.message,
      };
    }

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
      message: 'Something went wrong.',
    };
  }
}

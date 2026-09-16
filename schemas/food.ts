import { z } from 'zod';

export const addFoodSchema = z.object({
  name: z.string('You must enter a name.').min(1, 'You must enter a name.'),
  description: z.string('You must enter description').min(1, 'You must enter a description'),
  price: z.number('You must enter a price').min(1, 'You must enter a price').min(1, 'You must enter a price'),
  categoryId: z.number().int().positive('You must select a category'),

  imageUrl: z.string().optional(),
});

export const updateFoodDataSchema = addFoodSchema;

export type AddFoodDto = z.infer<typeof addFoodSchema>;
export type UpdateFoodDto = z.infer<typeof updateFoodDataSchema>;

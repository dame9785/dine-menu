import { z } from 'zod';

export const addMenuSchema = z.object({
  name: z.string('You must enter a name.').min(1, 'You must enter a name.'),
  description: z.string('You must enter description').min(1, 'You must enter a description'),
  price: z.number('You must enter a price').min(1, 'You must enter a price').min(1, 'You must enter a price'),
  categoryId: z.number().int().positive('You must select a category'),

  imageUrl: z.string().optional(),
});

export const updateMenuSchema = addMenuSchema;

export type AddMenuDto = z.infer<typeof addMenuSchema>;
export type UpdateMenuDto = z.infer<typeof updateMenuSchema>;

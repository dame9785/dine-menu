import { z } from 'zod';

export const addMenuSchema = z.object({
  name: z.string('You must enter a name.').trim().min(1, 'You must enter a name.'),

  description: z.string('You must enter a description.').trim().min(1, 'You must enter a description.'),

  price: z.coerce.number('You must enter a valid price.').positive('Price must be greater than zero.'),

  categoryId: z.coerce
    .number('You must select a category.')
    .int('Category must be an integer.')
    .positive('You must select a category.'),

  image: z.instanceof(File).nullable().optional(),
});

export const updateMenuSchema = addMenuSchema;

export type AddMenuDto = z.infer<typeof addMenuSchema>;
export type UpdateMenuDto = z.infer<typeof updateMenuSchema>;

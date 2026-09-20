import { z } from 'zod';

export const addMenuSchema = z.object({
  name: z.string().trim().min(1, 'You must enter a name.').max(100, 'Name cannot exceed 100 characters.'),

  description: z
    .string()
    .trim()
    .min(1, 'You must enter a description.')
    .max(1000, 'Description cannot exceed 1000 characters.'),

  price: z.coerce
    .number('You must enter a valid price.')
    .finite()
    .positive('Price must be greater than zero.')
    .max(100000, 'Price is too high.'),

  categoryId: z.coerce.number('You must select a category.').int().positive('You must select a category.'),

  image: z.instanceof(File).nullable().optional(),

  // Servergenererade fält
  imageUrl: z.string().optional(),
  companyId: z.number().int().positive().optional(),
});

export const updateMenuSchema = addMenuSchema;

export type AddMenuDto = z.infer<typeof addMenuSchema>;
export type UpdateMenuDto = z.infer<typeof updateMenuSchema>;

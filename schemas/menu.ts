import { z } from 'zod';

const baseMenuSchema = {
  name: z.string().trim().min(1, 'You must enter a name.').max(100, 'Name cannot exceed 100 characters.'),

  description: z
    .string()
    .trim()
    .min(1, 'You must enter a description.')
    .max(1000, 'Description cannot exceed 1000 characters.'),

  price: z.coerce
    .number('You must enter a valid price.')
    .finite('Price must be a valid number.')
    .positive('Price must be greater than zero.')
    .max(100000, 'Price is too high.'),

  categoryId: z.coerce
    .number('You must select a category.')
    .int('Category must be an integer.')
    .positive('You must select a category.'),
};

export const addMenuSchema = z.object({
  ...baseMenuSchema,

  image: z
    .instanceof(File, {
      message: 'You must upload an image.',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Image cannot exceed 5 MB.')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPG, PNG and WEBP images are allowed.',
    ),
});

export const updateMenuSchema = z.object({
  ...baseMenuSchema,

  image: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, 'Image cannot exceed 5 MB.')
    .refine(
      (file) => !file || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPG, PNG and WEBP images are allowed.',
    ),
});

export type AddMenuDto = z.infer<typeof addMenuSchema>;
export type UpdateMenuDto = z.infer<typeof updateMenuSchema>;

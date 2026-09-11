import { z } from 'zod';

export const addFoodSchema = z.object({
  name: z.string('You must enter a name.').min(1, 'You must enter a name.'),
  description: z.string('You must enter description').min(1, 'You must enter a description'),
  price: z.number('You must enter a price').min(1, 'You must enter a price'),
  categoryId: z.number('You must select a category').int().positive('You must select a category'),
  image: z
    .instanceof(File, {
      message: 'You must select an image.',
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
      message: 'Image must be JPG, PNG or WEBP.',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'Image must be smaller than 5 MB.',
    }),
});

export type AddFoodDto = z.infer<typeof addFoodSchema>;

import { z } from 'zod';

export const createCategorySchema = z.object({
  id: z.number().nullable().optional(),
  name: z.string().min(1, 'You must enter category name.'),
});

export const updateCategorySchema = createCategorySchema;

export type CategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;

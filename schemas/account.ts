import { z } from 'zod';

export const updateAccountSchema = z.object({
  name: z.string().min(1, 'You must enter a name'),
  email: z.email('You must enter a valid email').min(1, 'You must enter a email'),
});

export type UpdateAccountDto = z.infer<typeof updateAccountSchema>;

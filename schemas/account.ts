import { z } from 'zod';

export const updateAccountSchema = z.object({
  name: z.string().trim().min(1, 'You must enter a name').max(100, 'Name cannot exceed 100 characters'),

  email: z
    .string()
    .trim()
    .min(1, 'You must enter an email')
    .email('You must enter a valid email')
    .max(255, 'Email cannot exceed 255 characters')
    .transform((email) => email.toLowerCase()),
});

export const registerAccountSchema = z.object({
  name: z.string().trim().min(1, 'You must enter a name').max(100, 'Name cannot exceed 100 characters'),

  email: z.email('You must enter a valid email').min(1, 'You must enter an email'),

  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .max(100, 'Password cannot exceed 100 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),

  company: z.string().trim().max(100, 'Company name cannot exceed 100 characters').optional().or(z.literal('')),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must contain at least 8 characters')
      .max(100, 'Password cannot exceed 100 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),

    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'You must enter an email address').email('You must enter a valid email address'),
  password: z.string().min(1, 'You must enter your password'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1, 'You must enter an email').email('You must enter a valid email'),
});

export type LoginDto = z.infer<typeof loginSchema>;
export type UpdateAccountDto = z.infer<typeof updateAccountSchema>;

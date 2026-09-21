'use server';

import { auth } from '@/lib/auth';
import { loginSchema } from '@/schemas/account';
import { ActionResponse } from '@/types/action-response';
import { isAPIError } from 'better-auth/api';
import { ActionResult } from 'next/dist/shared/lib/app-router-types';
import { headers } from 'next/headers';

export async function signUpEmailAction(formData: FormData): Promise<ActionResult> {
  const name = String(formData.get('name'));
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return {
      success: true,
      message: 'Success',
    };
  } catch (err) {
    if (err instanceof Error) {
      return { error: 'Oops! Something went wrong while registering' };
    }

    return { error: 'Internal Server Error' };
  }
}

/*Sign In Email Action*/
export async function signInEmailAction(formData: FormData): Promise<ActionResponse> {
  const email = formData.get('email')?.toString().trim() ?? '';
  const password = formData.get('password')?.toString() ?? '';

  const validation = loginSchema.safeParse({
    email,
    password,
  });

  if (!validation.success) {
    return {
      success: false,
      message: 'Invalid input',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await auth.api.signInEmail({
      headers: await headers(),

      body: {
        email,
        password,
      },
    });

    if (!result.user) {
      return {
        success: false,
        message: 'Oops! Something went wrong while sign in',
        errors: {
          general: ['Invalid email or password'],
        },
      };
    }

    return {
      success: true,
      message: 'Sign in successfully',
    };
  } catch (error) {
    console.error('Sign in error:', error);

    if (isAPIError(error)) {
      if (error.body?.code === 'INVALID_EMAIL_OR_PASSWORD') {
        return {
          success: false,
          message: 'Sign in failed',
          errors: {
            general: ['Invalid email or password'],
          },
        };
      }

      return {
        success: false,
        message: 'Sign in failed',
        errors: {
          general: ['Unable to sign in. Please try again.'],
        },
      };
    }

    return {
      success: false,
      message: 'Something went wrong',
      errors: {
        general: ['An unexpected error occurred.'],
      },
    };
  }
}

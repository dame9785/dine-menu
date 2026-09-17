import { getSession } from '@/lib/auth-guard';
import { CommentService } from '@/services/comment';
import { ApiResponse } from '@/types/api-responses';
import { AddCommentDto } from '@/types/comment';
import { revalidatePath } from 'next/cache';

const commentService = new CommentService();

export async function add(data: AddCommentDto): Promise<ApiResponse<[]>> {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: 'You need to be logged in.',
      };
    }

    const response = await commentService.add(data);

    if (!response.success) {
      return {
        success: false,
        message: response.message,
      };
    }

    revalidatePath('/');

    return {
      success: response.success,
      message: response.message,
    } satisfies ApiResponse<[]>;
  } catch (error) {
    console.error('ADD COMMEN ACTION ERROR', error);
    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}

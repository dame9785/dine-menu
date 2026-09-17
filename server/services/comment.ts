import { CommentRepository } from '@/server/repositories/comment';
import { ApiResponse } from '@/types/api-responses';
import { AddCommentDto } from '@/types/comment';

const commentRepository = new CommentRepository();
export class CommenService {
  async add(userId: string, data: AddCommentDto) {
    if (!userId) {
      return {
        success: false,
        message: 'You must be logged in to add favorites.',
      } satisfies ApiResponse<[]>;
    }

    try {
      await commentRepository.add(userId, data);
      return {
        success: true,
        message: 'Comment successfully created.',
      } satisfies ApiResponse<[]>;
    } catch (error) {
      console.error('SERVER ERROR WHILE ADD COMMENT TO MENU ITEM', error);
      return {
        success: false,
        message: 'An error occurred while creating menu item comment.',
      } satisfies ApiResponse<[]>;
    }
  }
}

import { prisma } from '@/lib/prisma';
import { AddCommentDto } from '@/types/comment';

export class CommentRepository {
  async add(userId: string, dto: AddCommentDto) {
    return await prisma.comment.create({
      data: {
        userId,
        menuItemId: dto.menuItemId,
        content: dto.content,
      },
    });
  }
}

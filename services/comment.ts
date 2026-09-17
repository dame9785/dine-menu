import { ApiResponse } from '@/types/api-responses';
import { AddCommentDto } from '@/types/comment';
import { headers } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

const COMMENT_API_URL = `${API_URL}/comment`;

export class CommentService {
  async add(data: AddCommentDto): Promise<ApiResponse<[]>> {
    const requestHeaders = await headers();

    try {
      const response = await fetch(`${COMMENT_API_URL}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Cookie: requestHeaders.get('cookie') ?? '',
        },
      });

      if (!response.ok) {
        console.error('Comment API error:', response.status, response.statusText);

        return {
          success: false,
          message: 'Could not add comment.',
        };
      }

      return (await response.json()) as ApiResponse<[]>;
    } catch (error) {
      console.error('API/COMMENT/POST ERROR:', error);
      return {
        success: false,
        message: 'Could not connect to the server',
      } satisfies ApiResponse<[]>;
    }
  }
}

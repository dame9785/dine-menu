import { auth } from '@/lib/auth';
import { ApiResponse } from '@/types/api-responses';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { CommenService } from '@/server/services/comment';
import { AddCommentDto } from '@/types/comment';

const commentService = new CommenService();
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: 'You need to be logged in',
          data: [],
        },
        { status: 400 },
      );
    }

    const data: AddCommentDto = await request.json();
    const result = await commentService.add(session.user.id, data);

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error('API ERROR /api/comment/post: ', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update menu item.',
      } satisfies ApiResponse<[]>,
      { status: 500 },
    );
  }
}

import { CategoryService } from "@/server/services/category";
import { ApiResponse } from "@/types/api-responses";
import { NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

const categoryService = new CategoryService();

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await categoryService.delete(Number(id));
    return NextResponse.json(result, { status: result.success ? 200 : 404 });
  } catch (error) {
    console.error("CATEGORY/{ID}/DELETE", error);
    return {
      success: false,
      message: "Failed to create category",
    } satisfies ApiResponse;
  }
}

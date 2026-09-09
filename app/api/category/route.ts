import { ApiResponse } from "@/types/api-responses";
import { CategoryService } from "@/server/services/category";
import { CategoryDto } from "@/types/category";
import { NextResponse } from "next/server";

const categoryService = new CategoryService();

export async function POST(request: Request) {
  try {
    const dto: CategoryDto = await request.json();
    const result = await categoryService.create(dto);
    return NextResponse.json(result, { status: result.success ? 200 : 404 });
  } catch (error) {
    console.error("Category/Post", error);
    return {
      success: false,
      message: "Failed to create category",
    } satisfies ApiResponse;
  }
}

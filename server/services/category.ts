import { CategoryDto } from "@/types/category";
import { CategoryRepository } from "../repositories/category";
import { ApiResponse } from "@/types/api-responses";

const cateogryRepository = new CategoryRepository();

export class CategoryService {
  async create(dto: CategoryDto) {
    try {
      await cateogryRepository.create(dto);
      return {
        success: true,
        message: "Category successfully created",
      } satisfies ApiResponse;
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong",
      } satisfies ApiResponse;
    }
  }
}

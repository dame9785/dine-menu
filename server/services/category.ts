import { CategoryDto } from "@/types/category";
import { CategoryRepository } from "../repositories/category";
import { ApiResponse } from "@/types/api-responses";

const cateogryRepository = new CategoryRepository();

export class CategoryService {
  //CREATE CATEGORY
  async create(dto: CategoryDto) {
    try {
      await cateogryRepository.create(dto);
      return {
        success: true,
        message: "Category successfully created",
      } satisfies ApiResponse;
    } catch (error) {
      console.error("Server error", error);
      return {
        success: false,
        message: "Something went wrong while creating the category.",
      } satisfies ApiResponse;
    }
  }

  //DELETE CATEGORY
  async delete(categoryId: number) {
    try {
      await cateogryRepository.delete(categoryId);
      return {
        success: true,
        message: "Category successfully deleted",
      } satisfies ApiResponse;
    } catch (error) {
      console.error("Server error", error);
      return {
        success: false,
        message: "Something went wrong while deleting the category.",
      } satisfies ApiResponse;
    }
  }

  async update(dto: CategoryDto, categoryId: number) {
    try {
      await cateogryRepository.update(dto, categoryId);
      return {
        success: true,
        message: "Category successfully updated",
      } satisfies ApiResponse;
    } catch (error) {
      console.error("Server error", error);
      return {
        success: false,
        message: "Something went wrong while updating the category.",
      } satisfies ApiResponse;
    }
  }
}

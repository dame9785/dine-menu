import { ApiResponse } from "@/types/api-responses";
import { CategoryDto } from "@/types/category";

const API_URL = "http://localhost:3000/api/category";

export class CategoryService {
  async create(dto: CategoryDto) {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        body: JSON.stringify(dto),
      });
      return (await response.json()) as ApiResponse;
    } catch (error) {
      return {
        success: false,
        message: "Could not connect to the server",
      } satisfies ApiResponse;
    }
  }

  async delete(categoryId: number) {
    try {
      const response = await fetch(`${API_URL}/${categoryId}`);
      return (await response.json()) as ApiResponse;
    } catch (error) {
      return {
        success: false,
        message: "Could not connect to the server",
      } satisfies ApiResponse;
    }
  }

  async update(dto: CategoryDto, categoryId: number) {
    try {
      const response = await fetch(`${API_URL}/${categoryId}`, {
        method: "PUT",
        body: JSON.stringify(dto),
      });
      return (await response.json()) as ApiResponse;
    } catch (error) {
      return {
        success: false,
        message: "Could not connect to the server",
      } satisfies ApiResponse;
    }
  }
}

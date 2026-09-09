import { CategoryService } from "@/services/category";

const categoryService = new CategoryService();
export default function CategoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Categories</h1>
    </div>
  );
}

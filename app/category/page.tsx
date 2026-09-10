import { CategoryService } from '@/services/category';
import CategoryTable from '@/components/category/categories-table';

const categoryService = new CategoryService();
export default async function CategoryPage() {
  const response = await categoryService.getAll();
  const categories = response.data;
  return (
    <section>
      <header>
        <h1 className="text-3xl font-bold">Categories</h1>
      </header>
      <CategoryTable categories={categories} />
    </section>
  );
}

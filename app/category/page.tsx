import { CategoryService } from '@/services/category';
import CategoryTable from '@/components/category/categories-table';
import CategoryModal from '@/components/category/category-modal';

const categoryService = new CategoryService();
export default async function CategoryPage() {
  const response = await categoryService.getAll();
  const categories = response.data;
  return (
    <section>
      <header>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Categories</h1>
          <CategoryModal />
        </div>
      </header>
      <CategoryTable categories={categories} />
    </section>
  );
}

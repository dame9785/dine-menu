import { CategoryService } from '@/services/category';
import CategoryTable from '@/components/category/categories-table';

import Pagination from '@/components/pagination/pagination';
import ModalAction from '@/components/category/category-modal-actions';

const categoryService = new CategoryService();

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function CategoryPage({ searchParams }: Props) {
  const params = await searchParams;

  //Set default current page to 1 if params.page is undefined.
  const currentPage = Number(params.page ?? '1');

  const response = await categoryService.getAll(currentPage);

  const categories = response.data;

  return (
    <section>
      <div className="container">
        <header>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">Categories</h1>
            <ModalAction />
          </div>
        </header>

        <CategoryTable categories={categories} />

        {categories && categories.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={response.pagination?.totalPages ?? 1}
            basePath="/category"
            ariaLabel="Category pagination"
          />
        )}
      </div>
    </section>
  );
}

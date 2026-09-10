import { CategoryViewModel } from '@/types/category';
import { deleteCategory } from '@/actions/category';
import DeleteCategoryButton from '@/components/category/delete-category-button';
import CategoryModal from '@/components/category/category-modal';

type Props = {
  categories: CategoryViewModel[] | undefined;
};

export default function CategoryTable({ categories }: Props) {
  if (categories === undefined) {
    return <h2>No categories found..</h2>;
  }

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
      <table className="w-full text-left">
        <thead className="border-b border-white/10 bg-zinc-800/60">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-zinc-400">ID</th>
            <th className="px-6 py-4 text-sm font-semibold text-zinc-400">Name</th>
            <th className="px-6 py-4 text-sm font-semibold text-zinc-400">#</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-400">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/10">
          {categories.map((category) => (
            <tr key={category.id} className="transition-colors hover:bg-white/5">
              <td className="px-6 py-4 text-sm text-zinc-500">#{category.id}</td>
              <td className="px-6 py-4 font-medium text-white">{category.name}</td>
              <td className="px-6 py-4 text-sm text-zinc-400">{category.id}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <CategoryModal category={category} />
                  <DeleteCategoryButton categoryId={category.id} deleteCategory={deleteCategory} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

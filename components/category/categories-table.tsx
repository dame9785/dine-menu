import { CategoryViewModel } from '@/types/category';
import { deleteCategory } from '@/actions/category';
import DeleteCategoryButton from '@/components/category/delete-category-button';
import CategoryModal from '@/components/category/category-modal';

type Props = {
  categories: CategoryViewModel[] | undefined;
};

export default function CategoryTable({ categories }: Props) {
  if (!categories || categories.length === 0) {
    return (
      <div className="mt-6 flex min-h-40 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/70">
        <p className="text-sm text-neutral-500">No categories found.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/70 shadow-xl shadow-black/20">
      <table className="w-full text-left">
        {/* Header */}
        <thead className="border-b border-neutral-800 bg-neutral-800/40">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">ID</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">Name</th>
            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Actions
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-neutral-800">
          {categories.map((category) => (
            <tr key={category.id} className="group transition-colors hover:bg-blue-500/[0.04]">
              {/* ID */}
              <td className="px-6 py-4">
                <span className="text-sm font-medium text-neutral-500">#{category.id}</span>
              </td>

              {/* Name */}
              <td className="px-6 py-4">
                <span className="font-medium text-neutral-100 transition-colors group-hover:text-blue-400">
                  {category.name}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
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

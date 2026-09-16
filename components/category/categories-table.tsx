import { CategoryViewModel } from '@/types/category';
import { deleteCategory } from '@/actions/category';
import DeleteCategoryButton from '@/components/category/delete-category-button';
import ModalAction from '@/components/category/category-modal-actions';

type Props = {
  categories: CategoryViewModel[] | undefined;
};

export default function CategoryTable({ categories }: Props) {
  if (!categories || categories.length === 0) {
    return (
      <div className="mt-6 flex min-h-40 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/70 shadow-xl shadow-black/20">
        <div className="text-center">
          <p className="text-sm font-medium text-slate-400">No categories found</p>
          <p className="mt-1 text-xs text-slate-600">Create a category to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#FBF8F0] shadow-2xl shadow-black/30 backdrop-blur-sm">
      <table className="mt-5 w-full text-left">
        {/* Header */}
        <thead className="border-b border-white/10 bg-white/3">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-600 uppercase">ID</th>
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-600 uppercase">Category name</th>
            <th className="px-6 py-4 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-white/6">
          {categories.map((category) => (
            <tr key={category.id} className="group transition-all duration-200 hover:bg-[#FFFCF5]">
              {/* ID */}
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-md border border-white/10 bg-white/4 px-2 py-1 text-xs font-medium text-slate-500">
                  #{category.id}
                </span>
              </td>

              {/* Name */}
              <td className="px-6 py-4">
                <span className="font-medium text-slate-600 transition-colors group-hover:text-blue-400">
                  {category.name}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <ModalAction category={category} />
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

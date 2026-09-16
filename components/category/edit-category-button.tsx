import { Pencil } from 'lucide-react';

type Props = {
  onClick: () => void;
};

export default function EditCatgoryButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer items-center gap-2 rounded-lg border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400 backdrop-blur transition hover:border-red-500/50 hover:bg-orange-500/20"
    >
      <Pencil size={16} />
      Update
    </button>
  );
}

import { notFound } from 'next/navigation';
import { FoodService } from '@/services/food';
import Image from 'next/image';
import Link from 'next/link';
import AddFavoritFoodButton from '@/components/food/add-food-favorite.button';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FoodDetail({ params }: Props) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const foodService = new FoodService();
  const response = await foodService.getById(id);

  if (!response.data) {
    return notFound();
  }

  const foodItem = response.data;

  const isDetail = true;

  return (
    <section className="mx-auto max-w-6xl">
      {/* Back / breadcrumb */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-blue-400">
          ← Tillbaka till menyn
        </Link>
      </div>

      {/* Main card */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl shadow-pink-500/5 backdrop-blur">
        <div className="grid md:grid-cols-2">
          {/* IMAGE */}
          <div className="relative min-h-100 md:min-h-150">
            {foodItem.imageUrl ? (
              <Image fill src={foodItem.imageUrl} alt={foodItem.name} className="object-cover" priority />
            ) : (
              <div className="flex h-full items-center justify-center bg-white/5">
                <span className="text-gray-500">Ingen bild</span>
              </div>
            )}

            {/* Image overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

            {/* Category badge */}
            <div className="absolute left-6 top-6">
              <span className="rounded-full border border-pink-400/30 bg-black/70 px-4 py-2 text-sm font-medium text-indigo-300  backdrop-blur">
                {foodItem.category}
              </span>
            </div>
          </div>

          {/* INFORMATION */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div className="mb-3">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-300 ">Vår meny</span>
            </div>

            <h1 className="mb-5 text-4xl font-bold tracking-tight md:text-5xl">{foodItem.name}</h1>
            <p className="mb-8 text-base leading-7 text-gray-400 md:text-lg">{foodItem.description}</p>

            {/* Divider */}
            <div className="mb-8 h-px bg-white/10" />

            {/* Details */}
            <div className="mb-10 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <p className="text-xs uppercase tracking-wider text-gray-500">Kategori</p>
                <p className="mt-1 font-medium text-white">{foodItem.category}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <p className="text-xs uppercase tracking-wider text-gray-500">Pris</p>
                <p className="mt-1 font-medium text-white">{Number(foodItem.price).toFixed(2)} kr</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center z-10 relative ">
              <AddFavoritFoodButton foodId={foodItem.id} isDetail={isDetail} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { CategoryViewModel } from '@/types/category';
import Image from 'next/image';
import FoodActions from '@/components/food/food-modal-actions';

type Props = {
  categories: CategoryViewModel[];
};

export default function Header({ categories }: Props) {
  return (
    <header className="relative mb-8 overflow-hidden rounded-3xl border border-[#A77F18] shadow-lg">
      {/* Decorative background image */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
        <Image
          src="/img/header.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-center"
        />

        {/* Fade image into content */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/55 to-transparent" />
      </div>

      {/* Header content */}
      <div className="relative z-10 flex min-h-80 flex-col gap-8 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
        <div className="max-w-xl">
          <div className="mb-4 h-40 w-48 sm:h-48 sm:w-56">
            <Image
              src="/img/foods/logotype.png"
              alt="Dine Menu"
              width={500}
              height={500}
              priority
              className="h-full w-full object-contain object-left"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-700 sm:text-4xl">
              Manage <span className="text-[#A77F18]">your menu</span>
            </h1>

            <p className="mt-2 max-w-md text-lg leading-6 font-semibold text-slate-700">
              Here you can find your dishes.
            </p>
          </div>
        </div>

        {/* Show food-modal action */}
        <div className="relative z-20 flex shrink-0 align-top">
          <FoodActions categories={categories ?? []} />
        </div>
      </div>
    </header>
  );
}

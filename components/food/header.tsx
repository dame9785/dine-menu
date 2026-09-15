import AddFoodButton from './add-food-button';
import { CategoryViewModel } from '@/types/category';
import Image from 'next/image';

type Props = {
  categories: CategoryViewModel[];
};

export default function Header({ categories }: Props) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header image */}
      <div className="absolute inset-y-0 right-0 w-1/2">
        <Image
          fill
          src="/img/foods/header.jpg"
          alt="Restaurant food"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority
        />

        {/* Fade image into content */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/55 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-80 items-center justify-between px-6 py-8 md:px-10 lg:px-12">
        {/* Left content */}
        <div className="max-w-xl">
          {/* Logo */}
          <div className="relative mb-4 w-[14em] h-[15em] ">
            <Image
              src="/img/foods/logotype.png"
              alt="Dine Menu"
              fill
              priority
              className="object-contain object-left"
              sizes="500px"
            />
          </div>

          {/* <p className="text-xl text-slate-700 font-bold ">Manage your menu</p>
          <p className="mt-2 max-w-md text-m leading-6 text-slate-700">Here you can find your favorite foods.</p> */}
        </div>

        {/* Add food */}
        <div className="relative z-20 self-start">
          <AddFoodButton categories={categories} />
        </div>
      </div>
    </div>
  );
}

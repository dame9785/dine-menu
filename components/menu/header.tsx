import { CategoryViewModel } from '@/types/category';
import Image from 'next/image';

import MenuModalAction from '@/components/menu/actions/menu-modal-actions';
import { checkCompanyPermision } from '@/lib/auth-guard';

type Props = {
  categories: CategoryViewModel[];
};

export default async function Header({ categories }: Props) {
  const isAuthorized = await checkCompanyPermision();

  return (
    <header className="group relative mb-8 overflow-hidden rounded-3xl border border-[#C09721]/35 bg-[#121210] shadow-[0_12px_50px_rgba(0,0,0,0.35)]">
      {/* Ambient gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#C09721]/10 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-[#8B6914]/10 blur-[130px]"
      />

      {/* Decorative background image */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
        <Image
          src="/img/header.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-center opacity-75 transition-transform duration-700"
        />

        {/* Dark image overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-[#121210] via-[#121210]/75 to-[#121210]/15" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#121210]/80 to-transparent" />
      </div>

      {/* Header content */}
      <div className="relative z-10 flex min-h-80 flex-col justify-between gap-8 px-6 py-8 sm:px-8 md:flex-row md:items-center md:px-10 lg:px-12">
        {/* Branding and text */}
        <div className="max-w-xl">
          {/* Logo */}
          <div className="mb-5 h-36 w-44 sm:h-44 sm:w-52">
            <Image
              src="/img/logotype.png"
              alt="Dine Menu"
              width={500}
              height={500}
              priority
              className="h-full w-full object-contain object-left drop-shadow-[0_4px_18px_rgba(192,151,33,0.12)]"
            />
          </div>

          {/* Decorative line */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C09721]" />
            <span className="text-[10px] font-semibold tracking-[0.3em] text-[#A77F18] uppercase">
              Culinary Collection
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl leading-tight font-semibold tracking-tight text-[#E8E4D8] sm:text-4xl">
            Manage <span className="text-[#D4AF37]">your menu</span>
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-md text-sm leading-6 text-[#969184] sm:text-base">
            Discover, manage and showcase your culinary creations.
          </p>
        </div>

        {/* Action */}
        {isAuthorized.authorized && (
          <div className="relative z-20 flex shrink-0">
            <MenuModalAction isEditing={false} categories={categories ?? []} />
          </div>
        )}
      </div>

      {/* Bottom accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-10 bottom-0 h-px bg-linear-to-r from-transparent via-[#C09721]/60 to-transparent"
      />
    </header>
  );
}

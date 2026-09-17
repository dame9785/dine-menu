'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
};

export default function FoodImage({ src, alt }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Skeleton */}
      {isLoading && <div className="absolute inset-0 animate-pulse bg-slate-200" aria-hidden="true" />}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}

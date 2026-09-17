'use client';

import { createContext, useContext, useEffect, useState, useTransition } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

type FilterLoadingContextType = {
  navigateWithLoading: (url: string) => void;
  startLoading: () => void;
  stopLoading: () => void;
  isPending: boolean;
};

const FilterLoadingContext = createContext<FilterLoadingContextType | null>(null);

export function FilterLoadingProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const navigateWithLoading = (url: string) => {
    startTransition(() => {
      router.push(url);
    });
  };

  // Stäng laddningen när URL:en har uppdaterats
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return (
    <FilterLoadingContext.Provider
      value={{
        navigateWithLoading,
        startLoading,
        stopLoading,
        isPending: isPending || isLoading,
      }}
    >
      {children}
    </FilterLoadingContext.Provider>
  );
}

export function useFilterLoading() {
  const context = useContext(FilterLoadingContext);

  if (!context) {
    throw new Error('useFilterLoading must be used inside FilterLoadingProvider');
  }

  return context;
}

export function FoodListLoadingOverlay({ children }: { children: React.ReactNode }) {
  const { isPending } = useFilterLoading();

  return (
    <div className="relative">
      {isPending && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-[#C09721]" />

            <p className="text-sm font-medium text-[#8B6914]">Filtrerar favoriter...</p>
          </div>
        </div>
      )}

      {children}
    </div>
  );
}

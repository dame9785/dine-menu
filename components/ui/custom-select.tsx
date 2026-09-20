'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  value: string;
  options: Option[];
  placeholder: string;
  className?: string;
};

export default function CustomSelect({ name, value, options, placeholder, className = '' }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      {/* Hidden input for GET form */}
      <input type="hidden" name={name} value={value} />

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex h-12 w-full items-center justify-between rounded-xl border border-[#C09721]/35 bg-white px-4 text-sm font-medium tracking-wide text-[#765315] shadow-sm transition-all duration-300 outline-none hover:border-[#C09721] hover:bg-[#FFFCF5] hover:shadow-[0_3px_12px_rgba(192,151,33,0.08)] focus:border-[#C09721] focus:bg-[#FFFCF5] focus:ring-0 focus:outline-none ${isOpen ? 'border-[#C09721] bg-[#FFFCF5] shadow-[0_3px_14px_rgba(192,151,33,0.10)]' : ''} `}
      >
        <span className={selectedOption ? 'text-[#765315]' : 'text-slate-400'}>
          {selectedOption?.label ?? placeholder}
        </span>

        <ChevronDown
          size={17}
          strokeWidth={1.7}
          className={`text-[#C09721] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="listbox"
          aria-label={placeholder}
          className="animate-in fade-in slide-in-from-top-2 absolute top-[calc(100%+8px)] left-0 z-50 w-full overflow-hidden rounded-xl border border-[#C09721]/25 bg-[#FFFCF5] p-1.5 shadow-[0_12px_35px_rgba(118,83,21,0.14)] duration-200"
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  // Uppdaterar URL via form submission
                  const form = wrapperRef.current?.closest('form');

                  if (form) {
                    const hiddenInput = form.querySelector(`input[name="${name}"]`) as HTMLInputElement | null;

                    if (hiddenInput) {
                      hiddenInput.value = option.value;
                    }
                  }

                  setIsOpen(false);

                  // Trigger form submit
                  const formElement = wrapperRef.current?.closest('form');

                  if (formElement) {
                    formElement.requestSubmit();
                  }
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                  isSelected ? 'bg-[#E8DAB8] text-[#765315]' : 'text-slate-600 hover:bg-[#F3EBD8] hover:text-[#765315]'
                } `}
              >
                <span>{option.label}</span>

                {isSelected && <Check size={16} strokeWidth={2} className="text-[#A77F18]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

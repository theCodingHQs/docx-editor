import { tv } from 'tailwind-variants';

export const baseAccordionItem = tv({
  base: 'text-center relative font-semibold whitespace-nowrap align-middle outline-none inline-flex items-center justify-center border-b border-gray-400 rounded-xl',
  variants: {
    rounded: {
      none: 'rounded-none',
      xs: 'rounded-[2px]',
      sm: 'rounded-[4px]',
      normal: 'rounded-[8px]',
      lg: 'rounded-[12px]',
      full: 'rounded-full',
    },
    behavior: {
      block: 'w-full',
    },
  },
});

// create solid button styles
export const accordionItem = tv({
  extend: baseAccordionItem,
  variants: {
    color: {
      green:
        'relative bg-green-500',
      blue: 'relative bg-blue-500 text-white',
    },
  },
});

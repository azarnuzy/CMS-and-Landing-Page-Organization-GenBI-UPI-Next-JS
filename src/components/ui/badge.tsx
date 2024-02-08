import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        'press-release':
          'bg-secondary-100 text-secondary-900 border-secondary-500 hover:bg-secondary-200',
        article:
          'bg-error-100 text-error-700 border-error-400 hover:bg-error-200',
        marketing:
          'bg-error-300 text-neutral-100 border-error-400 hover:bg-error-400',
        executive:
          'bg-error-100 text-error-400 border-error-300 hover:bg-error-200',
        healthcare:
          'bg-success-300 text-success-600 border-success-400 hover:bg-success-400',
        education:
          'bg-secondary-800 text-secondary-100 border-secondary-900 hover:bg-secondary-900',
        economic:
          'text-purple-main bg-purple-100 border-purple-300 hover:bg-purple-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'navy';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const variantStyles = {
      primary: 'bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-950 border border-navy-900 shadow-sm',
      navy: 'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 border border-slate-900 shadow-sm',
      secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300 border border-slate-200',
      outline: 'bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 border border-slate-300 shadow-xs',
      danger: 'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 border border-rose-600 shadow-xs',
      ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200',
    };

    const sizeStyles = {
      sm: 'h-8 px-2.5 text-xs font-medium rounded',
      md: 'h-9 px-3.5 text-sm font-medium rounded',
      lg: 'h-10 px-4 text-base font-medium rounded-md',
      icon: 'h-8 w-8 p-0 rounded flex items-center justify-center',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

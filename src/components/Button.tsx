
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'emergency' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
      primary: 'bg-blue text-white hover:bg-blue-dark hover:shadow-md focus:ring-blue/50',
      emergency: 'bg-emergency text-white hover:bg-red-600 hover:shadow-md focus:ring-emergency/50',
      outline: 'bg-transparent border-2 border-blue text-blue hover:bg-blue/5 focus:ring-blue/30',
      ghost: 'bg-transparent text-blue hover:bg-blue/5 focus:ring-blue/30',
    };

    const sizeClasses = {
      sm: 'text-sm py-1.5 px-3',
      md: 'text-base py-2 px-4',
      lg: 'text-lg py-3 px-6',
    };

    const activeClasses = disabled || isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]';
    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          activeClasses,
          widthClass,
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : icon && iconPosition === 'left' ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        
        {children}
        
        {!isLoading && icon && iconPosition === 'right' ? (
          <span className="ml-2">{icon}</span>
        ) : null}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

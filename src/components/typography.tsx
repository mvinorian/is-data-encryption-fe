import { cn } from '@/lib/utils';

enum TypographyVariant {
  'h1',
  'h2',
  'h3',
  'h4',
  'p',
  'lead',
  'large',
  'small',
  'detail',
}

type TypographyProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  variant?: keyof typeof TypographyVariant;
  children: React.ReactNode;
};

export default function Typography<T extends React.ElementType>({
  as,
  children,
  className,
  variant = 'p',
  ...rest
}: TypographyProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) {
  const Component = as || 'p';

  return (
    <Component
      className={cn(
        [
          variant === 'h1' &&
            'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
          variant === 'h2' &&
            'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
          variant === 'h3' &&
            'scroll-m-20 text-2xl font-semibold tracking-tight',
          variant === 'h4' &&
            'scroll-m-20 text-xl font-semibold tracking-tight',
          variant === 'p' && 'leading-7 [&:not(:first-child)]:mt-6',
          variant === 'lead' && 'text-xl text-muted-foreground',
          variant === 'large' && 'text-lg font-semibold',
          variant === 'small' && 'text-sm font-medium leading-none',
          variant === 'detail' && 'text-sm leading-none',
        ],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

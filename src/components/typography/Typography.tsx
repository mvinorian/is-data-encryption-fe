import * as React from 'react';

import clsxm from '@/lib/clsxm';

enum TypographyVariant {
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'c',
}

enum FontWeight {
  'light',
  'regular',
  'semibold',
  'bold',
  'extrabold',
}

enum FontVariant {
  'montserrat',
  'open-sans',
}

type TypographyProps<T extends React.ElementType> = {
  /** @default <p> tag */
  as?: T;
  className?: string;
  font?: keyof typeof FontVariant;
  weight?: keyof typeof FontWeight;
  variant?: keyof typeof TypographyVariant;
  children: React.ReactNode;
};

export default function Typography<T extends React.ElementType>({
  as,
  children,
  className,
  font = 'open-sans',
  weight = 'regular',
  variant = 'p',
  ...rest
}: TypographyProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) {
  const Component = as || 'p';
  return (
    <Component
      className={clsxm(
        [
          variant === 'h1' && [
            'text-[48px] leading-[64px]',
            'md:text-[72px] md:leading-[96px]',
          ],
          variant === 'h2' && [
            'text-[40px] leading-[52px]',
            'md:text-[64px] md:leading-[80px]',
          ],
          variant === 'h3' && [
            'text-[32px] leading-[42px]',
            'md:text-[48px] md:leading-[64px]',
          ],
          variant === 'h4' && [
            'text-[24px] leading-[32px]',
            'md:text-[40px] md:leading-[52px]',
          ],
          variant === 'h5' && [
            'text-[20px] leading-[26px]',
            'md:text-[32px] md:leading-[42px]',
          ],
          variant === 'h6' && [
            'text-[18px] leading-[24px]',
            'md:text-[24px] md:leading-[32px]',
          ],
          variant === 'p' && ['text-[16px] leading-[24px]'],
          variant === 'c' && ['text-[14px] leading-[24px]'],
        ],
        [
          font === 'montserrat' && ['font-primary'],
          font === 'open-sans' && ['font-secondary'],
        ],
        [
          weight === 'light' && ['font-light'],
          weight === 'regular' && ['font-regular'],
          weight === 'semibold' && ['font-semibold'],
          weight === 'bold' && ['font-bold'],
          weight === 'extrabold' && ['font-extrabold'],
        ],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

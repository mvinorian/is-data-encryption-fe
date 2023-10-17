import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

enum ButtonVariant {
  'primary',
  'secondary',
  'warning',
  'danger',
  'unstyled',
}

enum ButtonSize {
  'large',
  'base',
  'small',
}

export type ButtonProps = {
  isLoading?: boolean;
  size?: keyof typeof ButtonSize;
  variant?: keyof typeof ButtonVariant;
  icon?: IconType;
  iconClassName?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
  textClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      size = 'base',
      variant = 'primary',
      icon: Icon,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      iconClassName,
      leftIconClassName,
      rightIconClassName,
      textClassName,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'button flex items-center justify-center gap-1 rounded-md',
          'focus:outline-none focus-visible:outline focus-visible:outline-teal',
          'disabled:cursor-default',
          'transition-colors duration-75',
          [
            size === 'large' && [
              'min-h-[44px] px-[28px] py-[10px]',
              Icon && 'px-[10px]',
            ],
            size === 'base' && [
              'min-h-[36px] px-[24px] py-[6px]',
              Icon && 'px-[6px]',
            ],
            size === 'small' && [
              'min-h-[32px] px-[20px] py-[4px]',
              Icon && 'px-[4px]',
            ],
          ],
          [
            variant === 'primary' && [
              'bg-teal text-base-surface',
              'hover:bg-teal-500 active:bg-teal-600',
              'disabled:bg-teal-500 disabled:text-teal-400',
            ],
            variant === 'secondary' && [
              'bg-base-surface ring-2 ring-inset ring-teal text-teal',
              'hover:bg-teal hover:text-base-surface',
              'active:bg-teal-500 active:text-base-surface active:ring-teal-500',
              'disabled:bg-base-surface disabled:text-base-inline',
            ],
            variant === 'warning' && [
              'bg-orange text-base-surface',
              'hover:bg-orange-500 active:bg-orange-600',
              'disabled:bg-orange-500 disabled:text-orange-400',
            ],
            variant === 'danger' && [
              'bg-red text-base-surface',
              'hover:bg-red-500 active:bg-red-600',
              'disabled:bg-red-500 disabled:text-red-400',
            ],
          ],
          isLoading && ['relative disabled:cursor-wait !text-transparent'],
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              [
                variant === 'primary' && 'text-base-surface',
                variant === 'secondary' && 'text-teal',
                variant === 'warning' && 'text-base-surface',
                variant === 'danger' && 'text-base-surface',
              ]
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}

        {Icon && (
          <Icon
            className={clsxm('font-bold text-2xl leading-none', iconClassName)}
          />
        )}

        {!Icon && LeftIcon && (
          <LeftIcon
            className={clsxm(
              'font-bold text-2xl leading-none',
              leftIconClassName
            )}
          />
        )}

        {!Icon && (
          <Typography
            variant='c'
            className={clsxm('font-bold leading-none', textClassName)}
          >
            {children}
          </Typography>
        )}

        {!Icon && RightIcon && (
          <RightIcon
            className={clsxm(
              'font-bold text-2xl leading-none',
              rightIconClassName
            )}
          />
        )}
      </button>
    );
  }
);

export default Button;

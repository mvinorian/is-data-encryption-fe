import * as React from 'react';

import clsxm from '@/lib/clsxm';

type TOptionProps = {
  children: React.ReactNode;
  placeholder?: string;
  value: string | number | readonly string[] | undefined;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export default function TOption({
  children,
  placeholder,
  onChange,
  value,
}: TOptionProps) {
  return (
    <div
      className={clsxm(
        'flex items-center justify-start',
        'border-secondary-250 hover:border-primary-400 hover:ring-0'
      )}
    >
      <div className='relative '>
        <select
          className={clsxm(
            'w-full pl-3 pr-8 py-2.5 truncate',
            'border-none focus:ring-2 focus:ring-inset focus:ring-blue',
            'bg-base-light font-secondary text-base-primary',
            !value && 'text-base-icon'
          )}
          value={value}
          onChange={onChange}
        >
          {placeholder && (
            <option value='' disabled hidden>
              {placeholder}
            </option>
          )}
          {children}
        </select>
      </div>
    </div>
  );
}

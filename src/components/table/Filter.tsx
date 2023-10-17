import { RowData, Table } from '@tanstack/react-table';
import * as React from 'react';
import { FiSearch, FiXCircle } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';

type FilterProps<T extends RowData> = {
  table: Table<T>;
  placeholder?: string;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Filter<T extends RowData>({
  className,
  table,
  placeholder = 'Search...',
  ...rest
}: FilterProps<T>) {
  const [filter, setFilter] = React.useState('');

  const handleClearFilter = () => {
    table.setGlobalFilter('');
    setFilter('');
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      table.setGlobalFilter(filter);
    }, 360);
    return () => clearTimeout(timeout);
  }, [filter, table]);

  return (
    <div className={clsxm('relative mt-1 self-start', className)} {...rest}>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <FiSearch className='text-base-primary text-[1.125rem]' />
      </div>
      <input
        type='text'
        value={filter ?? ''}
        onChange={(e) => {
          setFilter(String(e.target.value));
        }}
        className={clsxm(
          'w-full h-full px-3 pl-9 py-2.5',
          'border-none focus:ring-2 focus:ring-inset focus:ring-blue',
          'bg-base-light font-secondary text-base-primary',
          'placeholder:font-secondary placeholder:text-base-icon'
        )}
        placeholder={placeholder}
      />
      {table.getState().globalFilter !== '' && (
        <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
          <button type='button' onClick={handleClearFilter} className='p-1'>
            <FiXCircle className='text-base-primary text-xl text-danger-main' />
          </button>
        </div>
      )}
    </div>
  );
}

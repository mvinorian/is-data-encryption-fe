import { RowData, Table } from '@tanstack/react-table';
import * as React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import clsxm from '@/lib/clsxm';
import { buildPaginationControl } from '@/lib/pagination';

type PaginationControlProps<T extends RowData> = {
  data: T[];
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

/**
 *
 * @see https://javascript.plainenglish.io/create-a-pagination-in-a-react-way-df5c6fe1e0c7
 */
export default function PaginationControl<T extends RowData>({
  className,
  data,
  table,
  ...rest
}: PaginationControlProps<T>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();
  const paginationControl = buildPaginationControl(currentPage, pageCount);

  const handlePageControlClick = (page: string | number) => {
    if (page !== '...') {
      table.setPageIndex((page as number) - 1);
    }
  };

  return (
    <div
      className={clsxm(
        'flex items-center justify-between gap-x-2 md:justify-end rounded-lg',
        className
      )}
      {...rest}
    >
      <div className='flex gap-2 rounded-lg'>
        <Button
          variant='secondary'
          className={clsxm('w-10 h-10 rounded-lg')}
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <HiChevronLeft size={20} />
        </Button>
        {paginationControl.map((page, index) => (
          <Button
            variant='secondary'
            className={clsxm(
              'w-10 h-10 rounded-lg',
              currentPage === page && '!bg-blue-900 !ring-0 !text-base-white'
            )}
            key={index}
            onClick={() => handlePageControlClick(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant='secondary'
          className={clsxm('w-10 h-10 rounded-lg')}
          disabled={
            !table.getCanNextPage() ||
            data.length < table.getState().pagination.pageSize
          }
          onClick={() => table.nextPage()}
        >
          <HiChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
}

import { flexRender, RowData, Table } from '@tanstack/react-table';
import * as React from 'react';
import { ImSpinner8 } from 'react-icons/im';

import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

type TBodyProps<T extends RowData> = {
  table: Table<T>;
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function TBody<T extends RowData>({
  className,
  table,
  isLoading,
  ...rest
}: TBodyProps<T>) {
  return (
    <tbody
      className={clsxm('border-none divide-y-2 divide-base-outline', className)}
      {...rest}
    >
      {table.getFilteredRowModel().rows.length == 0 ? (
        <tr>
          <td
            className='truncate whitespace-nowrap py-4 px-3 col-span-full text-base-icon text-center'
            colSpan={table.getAllColumns().length}
          >
            {isLoading ? (
              <div className='flex flex-col items-center justify-center text-gray-800'>
                <ImSpinner8 className='my-4 animate-spin text-4xl' />
              </div>
            ) : (
              <Typography>No Data</Typography>
            )}
          </td>
        </tr>
      ) : (
        table.getFilteredRowModel().rows.map((row) => (
          <tr key={row.id} className='bg-white'>
            {row.getVisibleCells().map((cell) => {
              return (
                <td
                  key={cell.id}
                  className='truncate whitespace-nowrap font-secondary text-base-primary py-4 px-3'
                  style={{ maxWidth: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        ))
      )}
    </tbody>
  );
}

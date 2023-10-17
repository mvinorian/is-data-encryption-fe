import { flexRender, RowData, Table } from '@tanstack/react-table';
import * as React from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

type THeadProps<T extends RowData> = {
  omitSort: boolean;
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function THead<T extends RowData>({
  className,
  omitSort,
  table,
  ...rest
}: THeadProps<T>) {
  return (
    <thead
      className={clsxm('bg-blue-900 text-base-white border-none', className)}
      {...rest}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => (
            <th
              {...{
                key: header.id,
                colSpan: header.colSpan,
                style: {
                  width: header.getSize(),
                },
              }}
              key={header.id}
              scope='col'
              className={clsxm(
                'mx-auto items-center py-3 text-center text-sm font-semibold capitalize ',
                'row-span-2'
              )}
            >
              {header.isPlaceholder ? null : (
                <>
                  <div
                    className={clsxm(
                      // if have 2 columns in 1 header, colspan 2
                      'relative mx-auto flex items-center justify-center gap-2 py-1',
                      !omitSort && header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : ''
                    )}
                    onClick={
                      omitSort
                        ? () => null
                        : header.column.getToggleSortingHandler()
                    }
                  >
                    {!omitSort &&
                    header.column.getCanSort() &&
                    !header.column.getIsSorted() ? (
                      <AiFillCaretDown className='group-hover:fill-white w-2 rotate-180 hidden' />
                    ) : (
                      {
                        asc: (
                          <AiFillCaretDown className='fill-white w-2 rotate-180' />
                        ),
                        desc: <AiFillCaretDown className='fill-white w-2' />,
                      }[header.column.getIsSorted() as string] ?? null
                    )}
                    <Typography variant='p'>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Typography>
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `${
                          index != headerGroup.headers.length - 1 && 'resizer'
                        } ${header.column.getIsResizing() ? 'isResizing' : ''}`,
                        style: {
                          transform: header.column.getIsResizing()
                            ? `translateX(${
                                table.getState().columnSizingInfo.deltaOffset
                              }px)`
                            : 'translateX(0px)',
                        },
                      }}
                    />
                  </div>
                </>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

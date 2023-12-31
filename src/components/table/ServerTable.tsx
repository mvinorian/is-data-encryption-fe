import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import Filter from '@/components/table/Filter';
import PaginationControl from '@/components/table/PaginationControl';
import TBody from '@/components/table/TBody';
import THead from '@/components/table/THead';
import TOption from '@/components/table/TOption';
import clsxm from '@/lib/clsxm';
import { DefaultMeta } from '@/types/api';

type ServerTableState = {
  pagination: PaginationState;
  sorting: SortingState;
  globalFilter: string;
};

type SetServerTableState = {
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
};

type ServerTableProps<T extends object, K extends object> = {
  columns: ColumnDef<T>[];
  data: T[];
  header?: React.ReactNode;
  meta?: K & DefaultMeta;
  tableState: ServerTableState;
  setTableState: SetServerTableState;
  omitSort?: boolean;
  withFilter?: boolean;
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function ServerTable<T extends object, K extends object>({
  className,
  columns,
  data,
  header: Header,
  meta,
  tableState,
  setTableState,
  omitSort = false,
  withFilter = false,
  isLoading = false,
  ...rest
}: ServerTableProps<T, K>) {
  const columnResizeMode = 'onEnd';

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    pageCount: meta?.max_page,
    state: {
      ...tableState,
    },
    onGlobalFilterChange: setTableState.setGlobalFilter,
    onPaginationChange: setTableState.setPagination,
    onSortingChange: setTableState.setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  React.useEffect(() => {
    if (meta) {
      if (meta?.max_page < meta?.page) {
        table.setPageIndex(meta.max_page);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta]);

  return (
    <div className={clsxm('flex flex-col', className)} {...rest}>
      <div className='flex flex-col items-stretch gap-3 sm:flex-row sm:justify-between'>
        {withFilter && <Filter table={table} />}
        <div className='flex items-center gap-3'>
          {Header}
          <TOption
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 25, 50, 100, 200, 300].map((page) => (
              <option key={page} value={page}>
                {page} Entries
              </option>
            ))}
          </TOption>
        </div>
      </div>
      <div className='-my-2 -mx-4 mt-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
          <div className='overflow-hidden shadow ring-1 ring-base-primary rounded-xl'>
            <table className='min-w-full divide-y divide-gray-300'>
              <colgroup>
                {table.getAllColumns().map((column) => (
                  <col
                    key={column.id}
                    span={1}
                    style={{
                      width: column.columnDef.size
                        ? column.columnDef.size
                        : 'auto',
                    }}
                  />
                ))}
              </colgroup>
              <THead table={table} omitSort={omitSort} />
              <TBody table={table} isLoading={isLoading} />
            </table>
          </div>
        </div>
      </div>

      <PaginationControl table={table} data={data} className='mt-4' />
    </div>
  );
}

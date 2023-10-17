import { Dispatch, SetStateAction } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import Button from '@/components/buttons/Button';
import { PageNavigationState } from '@/hooks/usePageNavigation';
import clsxm from '@/lib/clsxm';
import { PaginatedApiResponse } from '@/types/api';

type PageNavigationProps<T extends object> = {
  meta: PaginatedApiResponse<T>['data']['meta'];
  pageCount: number;
  pageState: PageNavigationState;
  setPageState: Dispatch<SetStateAction<PageNavigationState>>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function PageNavigation<T extends object>({
  meta,
  pageCount,
  pageState,
  setPageState,
}: PageNavigationProps<T>) {
  const { max_page } = meta;
  const { pageIndex } = pageState;

  const pageControls = () =>
    [...Array(max_page)]
      .map((_, i) => i + 1)
      .slice(
        pageIndex <= Math.floor(pageCount / 2)
          ? 0
          : pageState.pageIndex > max_page - pageCount + 1
          ? max_page - pageCount
          : pageIndex - Math.floor(pageCount / 2),
        pageIndex < Math.floor(pageCount / 2)
          ? pageCount
          : pageIndex + pageCount - Math.floor(pageCount / 2)
      );

  return (
    <div className='flex flex-row gap-1.5'>
      {pageState.pageIndex > 0 ? (
        <Button
          variant='primary'
          icon={IoIosArrowBack}
          iconClassName='text-md'
          className={clsxm('w-9 h-9 p-0')}
          onClick={() =>
            setPageState((prev) => ({
              pageIndex: Math.max(0, prev.pageIndex - 1),
              pageSize: prev.pageSize,
            }))
          }
        />
      ) : (
        <Button
          variant='secondary'
          icon={IoIosArrowBack}
          iconClassName='text-md'
          className='w-9 h-9 p-0 bg-teal-500 ring-0 pointer-events-none'
        />
      )}
      {pageControls().map((pageNumber) => (
        <Button
          key={pageNumber}
          variant='secondary'
          onClick={() =>
            setPageState((prev) => ({
              pageIndex: pageNumber - 1,
              pageSize: prev.pageSize,
            }))
          }
          className={`w-9 h-9 p-0 ${
            pageState.pageIndex == pageNumber - 1 &&
            'bg-teal-500 text-base-surface ring-0 pointer-events-none'
          }`}
        >
          {pageNumber}
        </Button>
      ))}
      {pageState.pageIndex < max_page - 1 ? (
        <Button
          variant='primary'
          icon={IoIosArrowForward}
          iconClassName='text-md'
          className={clsxm('w-9 h-9 p-0')}
          onClick={() =>
            setPageState((prev) => ({
              pageIndex: Math.min(prev.pageIndex + 1, max_page - 1),
              pageSize: prev.pageSize,
            }))
          }
        />
      ) : (
        <Button
          variant='secondary'
          icon={IoIosArrowForward}
          iconClassName='text-md'
          className='w-9 h-9 p-0 bg-teal-500 ring-0 pointer-events-none'
        />
      )}
    </div>
  );
}

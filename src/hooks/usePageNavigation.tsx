import { useState } from 'react';

export type PageNavigationState = {
  pageIndex: number;
  pageSize: number;
};

type usePageNavigationProps = {
  pageSize?: number;
};

export default function usePageNavigation({
  pageSize = 10,
}: usePageNavigationProps) {
  const [pageState, setPageState] = useState<PageNavigationState>({
    pageIndex: 0,
    pageSize,
  });

  return { pageState, setPageState };
}

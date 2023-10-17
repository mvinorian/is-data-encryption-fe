import { Popover } from '@headlessui/react';
import { useCallback, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ImCheckmark } from 'react-icons/im';
import { IoIosArrowDown } from 'react-icons/io';

import clsxm from '@/lib/clsxm';

export type FilterType = {
  id: number;
  value: string;
};

type FilterProps = {
  id: string;
  filters: FilterType[];
  placeholder: string;
  multiple?: boolean;
  defaultValue?: FilterType[];
  onChange: () => void;
};

export default function Filter({
  id,
  filters,
  placeholder,
  multiple = false,
  defaultValue,
  onChange,
}: FilterProps) {
  const { control, setValue } = useFormContext();
  const [filterActive, setFilterActive] = useState<FilterType[]>(
    defaultValue ?? []
  );

  const onFilterClick = useCallback(
    (filter: FilterType) => {
      const newFilterState = filterActive.includes(filter)
        ? multiple
          ? filterActive.filter((item) => item !== filter)
          : []
        : multiple
        ? [...filterActive, filter]
        : [filter];
      setFilterActive(newFilterState);

      setValue(id, newFilterState);
      onChange();
    },
    [filterActive, id, multiple, onChange, setValue]
  );

  return (
    <Controller
      control={control}
      name={id}
      defaultValue={defaultValue ?? []}
      render={() => (
        <Popover
          as='div'
          className='font-secondary text-sm relative font- w-full'
        >
          <Popover.Button
            className={clsxm(
              'w-full h-9 flex flex-row items-center gap-1.5 px-3 rounded-md',
              'outline-none focus:ring-1 focus:ring-inset focus:ring-teal',
              'bg-base-light',
              'text-base-icon text-left'
            )}
          >
            <div className='relative h-full flex-1'>
              <div className='absolute flex items-center w-full h-full overflow-hidden whitespace-nowrap'>
                {!filterActive.length ? (
                  <>{placeholder}</>
                ) : (
                  <div className='flex flex-row gap-1.5'>
                    {filterActive.map(({ id, value }) => (
                      <div
                        key={id}
                        className='text-base-surface px-3 bg-teal-600 rounded-3xl capitalize'
                      >
                        {value.replaceAll('_', ' ')}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <IoIosArrowDown className='text-base' />
          </Popover.Button>
          <Popover.Panel
            className={clsxm(
              'absolute z-10 max-h-[400px] w-full rounded-md overflow-y-auto',
              'outline-none bg-base-light text-base-icon',
              'drop-shadow-lg'
            )}
          >
            {filters.map((filter, index) => (
              <div
                key={index}
                className={clsxm(
                  'flex flex-row justify-between items-center gap-1.5 px-3 py-1.5 select-none capitalize',
                  'hover:bg-teal-50 hover:text-teal-600'
                )}
                onClick={() => onFilterClick(filter)}
              >
                {filter.value.replaceAll('_', ' ')}

                {filterActive.includes(filter) && (
                  <div className='p-1 bg-teal rounded-full'>
                    <ImCheckmark className='text-base-surface text-xs' />
                  </div>
                )}
              </div>
            ))}
          </Popover.Panel>
        </Popover>
      )}
    />
  );
}

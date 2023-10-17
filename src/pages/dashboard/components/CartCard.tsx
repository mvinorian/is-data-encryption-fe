import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { numericFormatter } from 'react-number-format';

import Button from '@/components/buttons/Button';
import Typography from '@/components/typography/Typography';
import api from '@/lib/api';
import { ApiError, ApiReturn } from '@/types/api';
import { CartItem } from '@/types/entity/cart';

type CartCardProps = {
  onChange?: () => void;
} & CartItem;

export default function CartCard({
  manga_id,
  judul_seri,
  volume,
  foto,
  jumlah_tersedia,
  jumlah_sewa,
  harga_sewa,
  harga_sub_total,
  onChange,
}: CartCardProps) {
  const [isImageValid, setImageValid] = useState<boolean>(false);

  const { mutateAsync: addCart } = useMutation<
    AxiosResponse<ApiReturn<null>>,
    AxiosError<ApiError>,
    { manga_id: number; jumlah: number }
  >((data: { manga_id: number; jumlah: number }) => api.post('cart', data));

  const { mutateAsync: subtractCart } = useMutation<
    AxiosResponse<ApiReturn<null>>,
    AxiosError<ApiError>,
    void
  >(() => api.delete(`cart/${manga_id}`));

  const { mutateAsync: deleteCart } = useMutation<
    AxiosResponse<ApiReturn<null>>,
    AxiosError<ApiError>,
    void
  >(() => api.delete(`cart/manga/${manga_id}`));

  const handleAdd = () => {
    if (jumlah_tersedia <= 0) return;
    addCart({ manga_id, jumlah: 1 }).then(() => {
      if (onChange) onChange();
    });
  };

  const handleSubtract = () => {
    subtractCart().then(() => {
      if (onChange) onChange();
    });
  };

  const handleDelete = () => {
    deleteCart().then(() => {
      if (onChange) onChange();
    });
  };

  useEffect(() => {
    const fetchImage = async () =>
      await fetch(foto)
        .then((res) => {
          if (res.ok) setImageValid(true);
        })
        .catch(() => {
          return;
        });

    fetchImage();
  }, [foto]);

  return (
    <div className='flex bg-base-light rounded-xl overflow-clip'>
      <div className='relative w-24'>
        <div className='w-full'>
          {isImageValid ? (
            <Image
              src={foto}
              alt='manga-cover'
              width='96'
              height='110'
              className='w-full h-full object-cover'
            />
          ) : (
            <Image
              src='/images/error.jpg'
              alt='manga-cover'
              width='96'
              height='110'
              className='w-full h-full object-cover'
            />
          )}
        </div>

        <div className='absolute top-0 w-full h-full flex justify-center items-center bg-teal-900 bg-opacity-50'>
          <Typography variant='h5' className='font-semibold text-base-surface'>
            {volume}
          </Typography>
        </div>
      </div>

      <div className='w-full p-6 flex justify-between items-center'>
        <div>
          <Typography className='font-semibold flex gap-1.5 items-center text-teal-600'>
            <span>{judul_seri}</span>
            <span>•</span>
            <span>Volume {volume}</span>
          </Typography>
          <Typography variant='c' className='text-base-icon'>
            Rp. {harga_sewa} / 7 hari
          </Typography>
        </div>

        <div className='flex flex-row gap-6'>
          {/* Set Rent Count */}
          <div className='flex flex-col gap-1.5'>
            <div className='flex flex-row justify-between'>
              <Typography variant='c' className='text-base-icon'>
                Tersisa
              </Typography>
              <Typography
                variant='c'
                weight='semibold'
                className='text-teal-600'
              >
                {jumlah_tersedia} Vol
              </Typography>
            </div>
            <Typography
              variant='c'
              weight='semibold'
              className='flex flex-row justify-between items-center w-24 h-8 px-2 py-1 ring-1 ring-inset ring-teal rounded-md text-teal-600'
            >
              <LuMinus
                className='text-lg cursor-pointer text-teal'
                onClick={() => handleSubtract()}
              />
              {jumlah_sewa}
              <LuPlus
                className='text-lg cursor-pointer text-teal'
                onClick={() => handleAdd()}
              />
            </Typography>
          </div>

          {/* Add To Cart */}
          <div className='flex flex-col gap-1.5'>
            <div className='flex flex-row justify-between gap-2'>
              <Typography variant='c' className='text-base-icon'>
                Subtotal
              </Typography>
              <Typography
                variant='c'
                weight='semibold'
                className='text-teal-600'
              >
                Rp&nbsp;
                {numericFormatter(harga_sub_total.toString(), {
                  thousandSeparator: '.',
                })}
              </Typography>
            </div>
            <Button
              size='small'
              variant='danger'
              leftIconClassName='text-lg'
              leftIcon={BiTrash}
              onClick={() => handleDelete()}
            >
              Pinjaman
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

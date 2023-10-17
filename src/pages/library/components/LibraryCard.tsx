import { Dialog, Transition } from '@headlessui/react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { numericFormatter } from 'react-number-format';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/form/DropzoneInput';
import Input from '@/components/form/Input';
import Typography from '@/components/typography/Typography';
import useDialog from '@/hooks/useDialog';
import api from '@/lib/api';
import { ApiError, ApiReturn } from '@/types/api';
import { Penulis, Rent } from '@/types/entity/manga';

type LibraryCardProps = {
  id: string;
  mangaId: number;
  name: string;
  author: Penulis;
  imageSrc: string;
  volume: number;
  rentDate: Date;
  dueDate: Date;
  fine: number;
  status: Rent['status_peminjaman'];
};

type FinePayment = {
  atas_nama: string;
  bukti_pembayaran: string;
  peminjaman_id: string;
};

export default function LibraryCard({
  id,
  mangaId,
  name,
  author,
  imageSrc,
  volume,
  rentDate,
  dueDate,
  fine,
  status,
}: LibraryCardProps) {
  const methods = useForm<FinePayment>();
  const dialog = useDialog();
  const router = useRouter();
  const { handleSubmit } = methods;
  const [src, setSrc] = useState(imageSrc);
  const [isOpen, setIsOpen] = useState(false);

  const difference = differenceInCalendarDays(dueDate, new Date());

  const { mutateAsync: payFine, isLoading } = useMutation<
    AxiosResponse<ApiReturn<null>> | void,
    AxiosError<ApiError>,
    FinePayment
  >((data: FinePayment) => api.post('peminjaman/denda', data));

  const onSubmit = (data: FinePayment) => {
    payFine({
      atas_nama: data.atas_nama,
      bukti_pembayaran: data.bukti_pembayaran,
      peminjaman_id: id,
    });
  };

  const handleClick = () => {
    const url = `/manga/${mangaId}`;
    router.push(url);
  };

  return (
    <div className='flex flex-row w-full h-[244px] bg-base-light rounded-xl overflow-hidden'>
      <div
        className='relative w-48 h-full cursor-pointer'
        onClick={handleClick}
      >
        <Image
          src={src}
          alt='manga-cover'
          width='200'
          height='300'
          onError={() => setSrc('/images/error.jpg')}
          className='w-full h-full object-cover'
        />
        <div className='absolute w-full space-y-1 px-3 py-1.5 bottom-0 bg-teal-900 opacity-90'>
          <div className='-space-y-1 text-base-surface hover:text-teal-200'>
            <Typography variant='p' weight='bold'>
              {name}
            </Typography>
            <Typography variant='c'>
              {author.nama_belakang +
                (author.nama_depan && `, ${author.nama_depan}`)}
            </Typography>
          </div>
        </div>
      </div>

      <div className='relative flex flex-1 flex-col text-teal-600'>
        <div className='flex-1 space-y-1.5 p-3 overflow-y-hidden hover:overflow-y-auto'>
          <Typography
            variant='c'
            weight='bold'
            className='flex flex-row gap-1.5'
          >
            Vol {volume} •{' '}
            {status === 'Sedang Dipinjam' &&
              (difference >= 0 ? (
                <span>Tersisa {difference} hari</span>
              ) : (
                <span className='text-red-200 '>
                  Terlambat {-difference} hari
                </span>
              ))}
            {status === 'Belum Diambil' && (
              <span className='text-orange'>Belum Diambil</span>
            )}
            {status === 'Menunggu Konfirmasi' && (
              <span className='text-teal-200'>Menunggu Konfirmasi</span>
            )}
          </Typography>
          <div>
            <Typography variant='c' className='text-teal-600'>
              Tanggal Peminjaman
            </Typography>
            <Typography variant='c' className='text-base-icon'>
              {format(rentDate, 'dd MMMM y')}
            </Typography>
          </div>
          <div>
            <Typography variant='c' className='text-teal-600'>
              Batas Pengembalian
            </Typography>
            <Typography variant='c' className='text-base-icon'>
              {format(dueDate, 'dd MMMM y')}
            </Typography>
          </div>
          {fine && (
            <div>
              <Typography variant='c' className='text-teal-600'>
                Denda Terlambat
              </Typography>
              <Typography variant='c' className='text-base-icon'>
                Rp{' '}
                {numericFormatter(fine.toString(), { thousandSeparator: '.' })}
              </Typography>
            </div>
          )}
        </div>
        <div className='h-14 w-full' />

        <div className='absolute bottom-0 w-full h-14 p-2.5 bg-base-outline'>
          {(status === 'Sedang Dipinjam' ||
            status === 'Sudah Membayar Denda') && (
            <div className='flex flex-row gap-2.5'>
              {fine > 0 && status !== 'Sudah Membayar Denda' && (
                <Button className='w-full' onClick={() => setIsOpen(true)}>
                  Bayar Denda
                </Button>
              )}
              <Button
                className='w-full'
                onClick={() => {
                  dialog({
                    title: 'Kembalikan Manga',
                    description:
                      'Mohon meminta tolong kepada pegawai Tamiyochi untuk mengautentikasi pengembalian manga. Silakan datang langsung secara offline ke toko Tamiyochi.',
                    submitText: 'Baik',
                  });
                }}
              >
                Kembalikan
              </Button>
            </div>
          )}
          {status === 'Menunggu Konfirmasi' && (
            <Button
              variant='secondary'
              className='w-full bg-base-outline pointer-events-none'
            >
              Sedang Dikonfirmasi
            </Button>
          )}
          {status === 'Belum Diambil' && (
            <Button
              className='w-full'
              onClick={() =>
                dialog({
                  title: 'Ambil Manga',
                  description:
                    'Mohon meminta tolong kepada pegawai Tamiyochi untuk mengautentikasi pengambilan manga. Silakan datang langsung secara offline ke toko Tamiyochi.',
                  submitText: 'Baik',
                })
              }
            >
              Ambil
            </Button>
          )}
        </div>
        <Transition.Root show={isOpen} as={React.Fragment}>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <Transition.Child
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity' />
            </Transition.Child>
            <Transition.Child
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0 '
            >
              <Dialog.Panel className='fixed flex flex-col items-center w-[400px] gap-3 p-4 rounded-xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-base-light shadow-2xl'>
                <Dialog.Title>
                  <Typography
                    variant='h4'
                    weight='semibold'
                    className='text-teal-600'
                  >
                    Bayar Denda
                  </Typography>
                </Dialog.Title>
                <FormProvider {...methods}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-6 w-full'
                  >
                    <div className='w-full p-4 space-y-6 rounded-lg bg-base-surface'>
                      <Input
                        id='atas_nama'
                        label='Atas Nama'
                        placeholder='Masukkan Nama Rekening Pembayar'
                        className='w-full'
                      />
                      <DropzoneInput
                        id='bukti_pembayaran'
                        label='Bukti Pembayaran'
                        className='w-full'
                      />
                    </div>

                    <Button
                      type='submit'
                      className='w-full'
                      isLoading={isLoading}
                    >
                      Bayar
                    </Button>
                  </form>
                </FormProvider>
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
}

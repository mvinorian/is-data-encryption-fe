import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { numericFormatter } from 'react-number-format';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import withAuth from '@/components/hoc/withAuth';
import SEO from '@/components/SEO';
import Typography from '@/components/typography/Typography';
import { REG_URL } from '@/constant/regex';
import Layout from '@/layouts/Layout';
import api from '@/lib/api';
import CartCard from '@/pages/dashboard/components/CartCard';
import { ApiError, ApiReturn } from '@/types/api';
import { Cart, CartPayment } from '@/types/entity/cart';

export default withAuth(CartPage, ['user']);

function CartPage() {
  const [isFormVisible, setIsFormVisible] = React.useState<boolean>(false);

  const methods = useForm<CartPayment>({
    mode: 'onSubmit',
  });
  const { handleSubmit } = methods;

  const { data: cartData, refetch: refetchCart } = useQuery<ApiReturn<Cart>>([
    'cart',
  ]);

  const { mutateAsync: payCart, isLoading: payCartIsLoading } = useMutation<
    AxiosResponse<ApiReturn<null>> | void,
    AxiosError<ApiError>,
    CartPayment
  >((data: CartPayment) => api.post('peminjaman', data));

  const handlePinjam = () => {
    setIsFormVisible(true);
  };

  const onSubmit = (data: CartPayment) => {
    payCart(data)
      .then(() => refetchCart())
      .then(() => setIsFormVisible(false));
  };

  return (
    <Layout withNavbar>
      <SEO title='Peminjaman' />
      <main className='min-h-screen bg-base-surface pt-[92px]'>
        <div className='px-12 py-8 flex gap-8'>
          <section className='space-y-8 flex-1'>
            {cartData?.data?.cart?.map((cartItem, index) => (
              <CartCard key={index} {...cartItem} onChange={refetchCart} />
            ))}
          </section>

          <section className='p-6 space-y-6 bg-base-light rounded-xl'>
            <Typography
              as='h5'
              variant='h5'
              className='font-bold text-teal-600'
            >
              Ringkasan Pinjaman
            </Typography>

            <div className='w-full space-y-1.5'>
              <Typography className='w-full flex justify-between'>
                <span className='text-base-icon'>Total Pinjaman</span>
                <span className='font-semibold text-teal-600'>
                  {cartData?.data ? cartData.data.total_pinjaman : '-'}
                </span>
              </Typography>

              <Typography className='w-full flex justify-between'>
                <span className='text-base-icon'>Batas Pengembalian</span>
                <span className='font-semibold text-teal-600'>
                  {new Date(
                    new Date().setDate(new Date().getDate() + 7)
                  ).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </Typography>

              <Typography className='w-full flex justify-between'>
                <span className='text-base-icon'>Total Harga Sewa</span>
                <span className='font-semibold text-teal-600'>
                  Rp{' '}
                  {cartData?.data
                    ? numericFormatter(
                        cartData.data.total_harga_sewa.toString(),
                        {
                          thousandSeparator: '.',
                        }
                      )
                    : '-'}
                </span>
              </Typography>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {isFormVisible ? (
                  <div className='w-full space-y-6'>
                    <div className='p-4 space-y-6 rounded-lg bg-base-surface'>
                      <Input
                        id='atas_nama'
                        label='Atas Nama'
                        placeholder='Masukkan Nama Rekening Pembayar'
                        validation={{
                          required: 'Nama rekening pembayar tidak boleh kosong',
                        }}
                        className='w-full'
                      />
                      <Input
                        id='bukti_pembayaran'
                        label='Bukti Pembayaran'
                        placeholder='Masukkan Link Gambar Bukti Pembayaran'
                        validation={{
                          required: 'Bukti pembayaran tidak boleh kosong',
                          pattern: {
                            value: REG_URL,
                            message: 'URL tidak valid',
                          },
                        }}
                        className='w-full'
                      />
                    </div>
                    <Button
                      type='submit'
                      className='w-full'
                      isLoading={payCartIsLoading}
                    >
                      Bayar
                    </Button>
                  </div>
                ) : (
                  <Button
                    type='button'
                    className='w-full'
                    onClick={() => handlePinjam()}
                  >
                    Pinjam
                  </Button>
                )}
              </form>
            </FormProvider>
          </section>
        </div>
      </main>
    </Layout>
  );
}

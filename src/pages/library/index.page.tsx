import { useQuery } from '@tanstack/react-query';

import withAuth from '@/components/hoc/withAuth';
import SEO from '@/components/SEO';
import Typography from '@/components/typography/Typography';
import Layout from '@/layouts/Layout';
import LibraryCard from '@/pages/library/components/LibraryCard';
import { ApiReturn } from '@/types/api';
import { Rent } from '@/types/entity/manga';

export default withAuth(LibraryPage, ['user']);

function LibraryPage() {
  const { data: queryData } = useQuery<ApiReturn<Rent[]>>(['peminjaman']);

  return (
    <Layout withNavbar={true}>
      <SEO title='Manga Terpinjam' />
      <main className='min-h-screen bg-base-surface pt-[92px]'>
        <div className='p-12'>
          <section className='flex flex-col gap-8'>
            {queryData?.data ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {queryData?.data.map((rent) => (
                  <LibraryCard
                    key={rent.id_peminjaman_manga}
                    id={rent.id_peminjaman}
                    mangaId={rent.id_seri}
                    name={rent.judul}
                    author={rent.penulis[0]}
                    imageSrc={rent.foto}
                    volume={rent.volume}
                    rentDate={new Date(rent.tanggal_peminjaman)}
                    dueDate={new Date(rent.batas_pengembalian)}
                    fine={rent.denda}
                    status={rent.status_peminjaman}
                  />
                ))}
              </div>
            ) : (
              <div className='flex w-full justify-center'>
                <Typography
                  variant='h3'
                  weight='semibold'
                  className='text-teal-600'
                >
                  No Manga Being Rented
                </Typography>
              </div>
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
}

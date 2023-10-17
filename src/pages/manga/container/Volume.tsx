import Typography from '@/components/typography/Typography';
import VolumeCard from '@/pages/manga/components/VolumeCard';
import useAuthStore from '@/store/useAuthStore';
import { Manga } from '@/types/entity/manga';

export default function Volume({
  manga,
  refetch,
}: {
  manga: Manga[];
  refetch: () => void;
}) {
  const user = useAuthStore.useUser();
  return (
    <div className='flex flex-col gap-6 w-full'>
      <Typography weight='semibold' className='text-teal-600'>
        Volume Tersedia
      </Typography>
      <div className='flex flex-col gap-6'>
        {manga
          .sort((a, b) => a.volume - b.volume)
          .map(
            ({ id, volume, harga_sewa, jumlah_tersedia }) =>
              jumlah_tersedia > 0 && (
                <VolumeCard
                  key={id}
                  user={user}
                  mangaId={id}
                  volume={volume}
                  harga={harga_sewa}
                  tersedia={jumlah_tersedia}
                  onSubmit={refetch}
                />
              )
          )}
      </div>
    </div>
  );
}

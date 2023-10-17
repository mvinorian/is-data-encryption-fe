import { format } from 'date-fns';
import { AiFillStar } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { numericFormatter } from 'react-number-format';

import Typography from '@/components/typography/Typography';
import formatNumber from '@/lib/helper';
import { Genre, Penulis } from '@/types/entity/manga';

type InformationProps = {
  score: number;
  reviewers: number;
  readers: number;
  volumes: number;
  date: Date;
  authors: Penulis[];
  publisher: string;
  genres?: Genre[];
};

export default function Information({
  score,
  reviewers,
  readers,
  volumes,
  date,
  authors,
  publisher,
  genres,
}: InformationProps) {
  return (
    <div className='space-y-3'>
      <div className='flex flex-row gap-3 items-center bg-base-surface p-3 rounded-lg'>
        <AiFillStar className='text-yellow-500 text-xl' />
        <div className='flex flex-row gap-1'>
          <Typography className='text-teal-600'>{score}</Typography>
          <Typography variant='c' className='text-base-icon'>
            oleh&nbsp;
            {formatNumber(reviewers, 0)}
            &nbsp;pembaca
          </Typography>
        </div>
      </div>
      <div className='flex flex-row gap-3 items-center bg-base-surface p-3 rounded-lg'>
        <BsFillPersonFill className='text-green text-xl' />
        <div className='flex flex-row gap-1'>
          <Typography className='text-teal-600'>
            {numericFormatter(readers.toString(), {
              thousandSeparator: '.',
            })}
          </Typography>
          <Typography variant='c' className='text-base-icon'>
            pembaca
          </Typography>
        </div>
      </div>
      <div className='flex flex-col gap-3 bg-base-surface p-3 rounded-lg'>
        <div>
          <Typography variant='c' weight='semibold' className='text-teal-600'>
            Tanggal Terbit
          </Typography>
          <Typography variant='c' className='text-base-icon'>
            {format(date, 'd MMMM y')}
          </Typography>
        </div>
        <div>
          <Typography variant='c' weight='semibold' className='text-teal-600'>
            Total Volume
          </Typography>
          <Typography variant='c' className='text-base-icon'>
            {volumes} Volume
            {volumes && volumes > 1 && 's'}
          </Typography>
        </div>
        <div>
          <Typography variant='c' weight='semibold' className='text-teal-600'>
            Penulis
          </Typography>
          {authors.map(({ nama_depan, nama_belakang }) => (
            <Typography
              key={`${nama_depan}${nama_belakang}`}
              variant='c'
              className='text-base-icon'
            >
              {nama_belakang + (nama_depan && `, ${nama_depan}`)}
            </Typography>
          ))}
        </div>
        <div>
          <Typography variant='c' weight='semibold' className='text-teal-600'>
            Penerbit
          </Typography>
          <Typography variant='c' className='text-base-icon'>
            {publisher}
          </Typography>
        </div>
        <div>
          <Typography variant='c' weight='semibold' className='text-teal-600'>
            Genre
          </Typography>
          {genres ? (
            genres.map(({ nama }) => (
              <Typography
                key={`${nama}`}
                variant='c'
                className='text-base-icon'
              >
                {nama}
              </Typography>
            ))
          ) : (
            <Typography variant='c' className='text-base-icon'>
              Genre-less
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}

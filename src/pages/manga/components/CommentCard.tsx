import { format } from 'date-fns';
import { FormProvider, useForm } from 'react-hook-form';
import { BsFillPersonFill } from 'react-icons/bs';

import TextArea from '@/components/form/TextArea';
import Typography from '@/components/typography/Typography';

type CommentCardProps = {
  author: string;
  content: string;
  createdAt: string;
};

export default function CommentCard({
  author,
  content,
  createdAt,
}: CommentCardProps) {
  const methods = useForm();
  return (
    <div className='flex flex-col w-full bg-base-surface gap-3 p-3 rounded-lg'>
      <div className='flex flex-row justify-between items-center gap-1.5'>
        <div className='flex flex-row items-center gap-1.5'>
          <div className='w-8 h-8 flex justify-center items-center rounded-full bg-base-light'>
            <BsFillPersonFill className='text-xl text-base-icon' />
          </div>
          <Typography variant='c' weight='semibold' className='text-teal-600'>
            {author}
          </Typography>
        </div>
        <Typography variant='c' className='text-base-icon'>
          {format(new Date(createdAt), 'd MMMM y')}
        </Typography>
      </div>
      <FormProvider {...methods}>
        <TextArea
          id='comment'
          rows={5}
          value={content}
          readOnly
          className='text-teal-600 resize-none'
        />
      </FormProvider>
    </div>
  );
}

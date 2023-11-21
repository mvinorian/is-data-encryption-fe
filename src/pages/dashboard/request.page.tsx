import Button from '@/components/buttons/Button';
import Typography from '@/components/typography/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';

export default function Request() {
  return (
    <DashboardLayout>
      <div>
        <Typography
          variant='h3'
          font='montserrat'
          className='font-bold text-teal-600 '
        >
          List of User
        </Typography>
        <Typography
          variant='p'
          font='montserrat'
          className='mt-[-0.5rem] ml-1 text-teal-600'
        >
          Choose one of the available user
        </Typography>
      </div>
      <div className='mt-8 space-y-4'>
        {dummy.map((user, index) => (
          <div
            key={index}
            className='w-full bg-teal-400 p-6 rounded-md flex flex-row justify-between'
          >
            <Typography
              as='h6'
              variant='h6'
              font='montserrat'
              className='font-semibold text-base-light'
            >
              {user.name}
            </Typography>
            <Button size='base' variant='warning'>
              Request resource
            </Button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

const dummy = [
  { name: 'Alissa' },
  { name: 'Danny' },
  { name: 'Alissa' },
  { name: 'Danny' },
  { name: 'Alissa' },
  { name: 'Danny' },
  { name: 'Alissa' },
  { name: 'Danny' },
  { name: 'Alissa' },
  { name: 'Danny' },
  { name: 'Alissa' },
  { name: 'Danny' },
];

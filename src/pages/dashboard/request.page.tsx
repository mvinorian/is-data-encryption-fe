import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

import Button from '@/components/buttons/Button';
import Modal from '@/components/modal/Modal';
import Typography from '@/components/typography/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import api from '@/lib/api';
import { ApiError } from '@/types/api';

export default function Request() {
  const [email, setEmail] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const { mutate } = useMutation<
    AxiosResponse,
    AxiosError<ApiError>,
    { email: string }
  >(async (data) => {
    const res = await api.post('/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res;
  });

  const requestData = (data: string) => {
    setEmail(data);
    // console.log(email);
    mutate(
      { email: email }
      // {
      //   onSuccess: (response) => {
      //     setOpen(true);
      //   },
      // }
    );
    setOpen(true);
    setResponse('Things');
  };

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
            <Button
              size='base'
              variant='warning'
              onClick={() => requestData(user.email)}
            >
              Request resource
            </Button>
          </div>
        ))}
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        modalContainerClassName='your-custom-class'
      >
        {/* Modal Content */}
        <Modal.Title>Request response</Modal.Title>
        <Modal.Body>
          {/* Your modalwd body content */}
          <p>{response}</p>
        </Modal.Body>
      </Modal>
    </DashboardLayout>
  );
}

const dummy = [
  { name: 'Alissa', email: 'aaaa@gmail.com' },
  { name: 'Danny', email: 'aaaa@gmail.com' },
  { name: 'Alissa', email: 'aaaa@gmail.com' },
  { name: 'Danny', email: 'aaaa@gmail.com' },
  { name: 'Alissa', email: 'aaaa@gmail.com' },
  { name: 'Danny', email: 'aaaa@gmail.com' },
  { name: 'Alissa', email: 'aaaa@gmail.com' },
  { name: 'Danny', email: 'aaaa@gmail.com' },
  { name: 'Alissa', email: 'aaaa@gmail.com' },
  { name: 'Danny', email: 'aaaa@gmail.com' },
  { name: 'Alissa', email: 'aaaa@gmail.com' },
  { name: 'Danny', email: 'aaaa@gmail.com' },
];

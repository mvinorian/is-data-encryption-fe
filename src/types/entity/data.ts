import { FileWithPreview } from '@/types/dropzone';

export type Data = {
  name: string;
  phone_number: string;
  id_card: FileWithPreview[];
  cv: FileWithPreview[];
  video: FileWithPreview[];
};

export type DataResponse = {
  name: string;
  phone_number: string;
  id_card_url: string;
  cv_url: string;
  video_url: string;
  encrypt_method: 'AES' | 'RC4' | 'DES';
  encrypt_time: string;
};

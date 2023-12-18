import { FileWithPreview } from '@/types/dropzone';

export type Data = {
  name: string;
  phone_number: string;
  id_card: FileWithPreview[];
  cv: FileWithPreview[];
  video: FileWithPreview[];
};

export type Files = {
  files: FileWithPreview[];
};

export type FilesResponse = {
  dateTime: string;
  name: string;
  email: string;
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

export type SharedDataResponse = {
  name: string;
  phone_number: string;
  id_card: string;
  cv: string;
  video: string;
};

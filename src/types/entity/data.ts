import { FileWithPreview } from '@/types/dropzone';

export type Data = {
  name: string;
  phone_number: string;
  id_card: FileWithPreview[];
  cv: FileWithPreview[];
  video: FileWithPreview[];
};

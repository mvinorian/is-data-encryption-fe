import { PermissionList } from '@/types/entity/permission-list';

export type User = {
  id: string;
  nama: string;
  email: string;
  no_telp: string;
  password: string;
  alamat: string;
  peran: PermissionList;
  kabupaten_id: number;
  token: string;
};

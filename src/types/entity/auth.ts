export type SignUp = {
  nama: string;
  email: string;
  no_telp: string;
  alamat: string;
  provinsi_id?: number;
  kabupaten_id: number;
  password: string;
};

export type LogIn = {
  email: string;
  password: string;
};

export type Manga = {
  id: number;
  volume: number;
  jumlah_tersedia: number;
  harga_sewa: number;
  seri_id: number;
};

export type Penulis = {
  id: number;
  nama_depan: string;
  nama_belakang: string;
  peran: string;
};

export type Genre = {
  id: number;
  nama: string;
};

export type Seri = {
  id: number;
  judul: string;
  sinopsis: string;
  tahun_terbit: string;
  skor: number;
  total_penilai: number;
  total_pembaca: number;
  foto: string;
  penerbit_id: number;
  nama_penerbit: string;
  manga: Manga[];
  penulis: Penulis[];
  genre?: Genre[];
};

export type Comment = {
  id: string;
  isi: string;
  username: string;
  created_at: string;
  user_id: string;
};

export type Rent = {
  id_peminjaman_manga: string;
  id_seri: number;
  id_penulis: number;
  id_manga: number;
  id_denda: string;
  id_peminjaman: string;
  foto: string;
  judul: string;
  penulis: Penulis[];
  volume: number;
  tanggal_peminjaman: string;
  batas_pengembalian: string;
  status_peminjaman:
    | 'Menunggu Konfirmasi'
    | 'Belum Diambil'
    | 'Sedang Dipinjam'
    | 'Sudah Dikembalikan'
    | 'Sudah Membayar Denda';
  denda: number;
  is_denda_lunas: boolean;
  jumlah_sewa: number;
};

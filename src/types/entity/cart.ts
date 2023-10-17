export type CartItem = {
  manga_id: number;
  judul_seri: string;
  volume: number;
  foto: string;
  jumlah_tersedia: number;
  jumlah_sewa: number;
  harga_sewa: number;
  harga_sub_total: number;
};

export type Cart = {
  cart: CartItem[];
  total_pinjaman: number;
  total_harga_sewa: number;
};

export type CartPayment = {
  bukti_pembayaran: string;
  atas_nama: string;
};

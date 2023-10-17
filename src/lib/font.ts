import { Montserrat, Open_Sans } from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: 'variable',
  display: 'swap',
});

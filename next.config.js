/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
        port: '',
        pathname: '/images/manga/*/*',
      },
    ],
  },

  reactStrictMode: true,
  swcMinify: true,

  pageExtensions: ['page.tsx', 'api.ts'],
};

module.exports = nextConfig;

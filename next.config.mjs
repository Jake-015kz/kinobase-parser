/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kinobase.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kinobase.org.ru',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'tailus.io',
        protocol: 'https',
      },
      {
        hostname: '*.googleusercontent.com',
        protocol: 'https',
      },
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;

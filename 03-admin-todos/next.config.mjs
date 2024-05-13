/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'tailus.io',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;

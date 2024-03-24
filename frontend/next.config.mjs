/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },
};

export default nextConfig;

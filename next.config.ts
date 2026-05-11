/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ['192.168.0.100', 'localhost:3000'],
  },
};

export default nextConfig;
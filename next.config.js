/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["t.scdn.co", "i.scdn.co", "mosaic.scdn.co"],
  },
};

module.exports = nextConfig;

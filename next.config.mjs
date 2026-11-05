/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Pin the workspace root to this app: the Telemetrix workspace has several lockfiles.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default config;

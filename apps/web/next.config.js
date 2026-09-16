/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@school-erp/ui',
    '@school-erp/types',
    '@school-erp/constants',
    '@school-erp/design-tokens',
    '@school-erp/mock-data',
    '@school-erp/validation',
    '@school-erp/utils'
  ],
  images: {
    domains: ['images.unsplash.com']
  }
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.pravatar.cc', 'images.unsplash.com', 'api.dicebear.com'],
  },
  // Allows deployment even if TypeScript or ESLint warnings exist
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig

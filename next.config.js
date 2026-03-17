/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.pravatar.cc', 'images.unsplash.com', 'api.dicebear.com', 'randomuser.me', 'ui-avatars.com'],
  },
  typescript: { ignoreBuildErrors: true },
  eslint:     { ignoreDuringBuilds: true },
}

module.exports = nextConfig

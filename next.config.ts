import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
  async rewrites() {
    return [
      {
        source: '/storybook-static',
        destination: '/storybook-static',
      },
    ]
  },
}

export default nextConfig

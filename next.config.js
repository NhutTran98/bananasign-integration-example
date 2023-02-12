/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.resolve.alias.canvas = false
      config.resolve.alias.encoding = false
      config.module.rules.push({
        test: /pdfjs-dist\/build\/pdf\.worker\.js$/,
        type: "asset/resource",
        generator: {
          filename: "static/chunks/[name].[hash][ext]",
        },
      });
      return config
  },
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/signin',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

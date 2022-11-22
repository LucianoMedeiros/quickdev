/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async function () {
    return [
      {
        source: '/api/:path*',
        destination: 'https://quikdev-ozvf.vercel.app/api/:path*',
      },
    ]
  },
}

export default nextConfig

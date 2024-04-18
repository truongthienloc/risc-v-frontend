/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/coding',
        permanent: true,
      },
      
    ]
  },
}

module.exports = nextConfig

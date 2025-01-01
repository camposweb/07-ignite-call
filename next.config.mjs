/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'https://lh3.googleusercontent.com/',
      },
    ],
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the temporary TypeScript ignore workaround
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  
  // Fix any potential CORS issues by adding crossOrigin: 'anonymous'
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
  
  // Add server external packages for better Vercel compatibility
  serverExternalPackages: ['@supabase/supabase-js'],
}

module.exports = nextConfig 
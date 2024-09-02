/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@galvatron/ui"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3002/:path*", // Proxy to your API server
      },
    ];
  },
};

export default nextConfig;

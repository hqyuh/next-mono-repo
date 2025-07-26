/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  // run with administrator role or open developer mode for window
  output: "standalone",
};

export default nextConfig;

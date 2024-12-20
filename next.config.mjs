/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "output",
  // eslint: {
  // 	ignoreDuringBuilds: true,
  // },
  // typescript: {
  // 	ignoreBuildErrors: true,
  // },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;

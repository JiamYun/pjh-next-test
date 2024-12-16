/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  reactStrictMode: false,
  images: {
    domains: ["pjh-image-bucket.s3.ap-northeast-2.amazonaws.com"],
  },
};

export default nextConfig;

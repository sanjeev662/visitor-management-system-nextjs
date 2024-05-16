// /** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
};

const swcConfig = {
  compiler: {
    styledComponents: true,
  },
};

const mergedConfig = {
  ...nextConfig,
  ...swcConfig,
};

export default mergedConfig;

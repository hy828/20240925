/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        // Disable the canvas module
        config.resolve.alias['canvas'] = false;
        return config;
    },
};

export default nextConfig;
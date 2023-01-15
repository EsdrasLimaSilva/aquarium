/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: false,
    images: {
        domains: ["lh3.googleusercontent.com", "cdn.sanity.io"],
    },
};

module.exports = nextConfig;

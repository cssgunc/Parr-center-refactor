/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      domains: [
        "lh3.googleusercontent.com",
        "api.dicebear.com"
      ],
    },
    // Skip static optimization for pages that use Firebase Auth
    // This ensures they're always rendered dynamically
    experimental: {
      isrMemoryCacheSize: 0,
    },
};

module.exports = nextConfig;

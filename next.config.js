const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            ...(isDev
                ? [{
                    protocol: "http",
                    hostname: "localhost",
                }]
                : []),
        ],
    },
}

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    register: true,
    skipWaiting: true,
});


module.exports = withPWA(nextConfig);

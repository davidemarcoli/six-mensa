/** @type {import('next').NextConfig} */
const nextConfig = {}

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    register: true,
    skipWaiting: true,
});


module.exports = withPWA(nextConfig);

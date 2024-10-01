/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "rapid-mockingbird-774.convex.cloud",
            },
        ],
    },
};

export default nextConfig;

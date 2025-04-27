import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    poweredByHeader: false,
    async headers() {
        const origin =
            process.env.NEXT_PUBLIC_FRONTEND_URL || "https://dev-portal-management.vercel.app";

        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: origin,
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization, Accept",
                    },
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                ],
            },
        ];
    },
};

export default nextConfig;

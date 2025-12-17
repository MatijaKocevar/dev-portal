import type { NextConfig } from "next";

const allowedOrigins = [
    "https://dev-portal-management.vercel.app",
    "https://staging.reduxi.energy",
    "http://localhost:5173",
    "https://localhost:5173",
    "https://localhost:5000",
];

const nextConfig: NextConfig = {
    poweredByHeader: false,
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: allowedOrigins.includes(process.env.NEXT_PUBLIC_FRONTEND_URL || "")
                            ? process.env.NEXT_PUBLIC_FRONTEND_URL ||
                              "https://staging.reduxi.energy"
                            : "https://staging.reduxi.energy",
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
                    { key: "Access-Control-Allow-Max-Age", value: "86400" },
                ],
            },
        ];
    },
};

export default nextConfig;

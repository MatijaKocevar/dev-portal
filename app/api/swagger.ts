import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = () => {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const spec = createSwaggerSpec({
        apiFolder: "app/api",
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Trading Platform Mock API",
                version: "1.0.0",
                description: "Documentation for the Trading Platform Mock API endpoints",
            },
            servers: [
                {
                    url: baseUrl,
                    description: "Current environment",
                },
            ],
        },
    });
    return spec;
};

import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = () => {
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
                    url: "http://localhost:3000",
                    description: "Local development server",
                },
            ],
        },
    });
    return spec;
};

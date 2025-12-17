import SwaggerClient from "./_components/swagger-client";

type OpenAPISchema = {
    type?: string | string[];
    [key: string]: any;
};

type OpenAPISpec = {
    components?: {
        schemas: Record<string, OpenAPISchema>;
    };
    [key: string]: any;
};

async function fetchOpenApiSpec(): Promise<OpenAPISpec> {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const response = await fetch("https://localhost:5000/docs/api", {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }

    return response.json();
}

export default async function ApiDocsPage() {
    const data = await fetchOpenApiSpec();

    const compatibleSpec = {
        ...data,
        openapi: "3.0.0",
        components: {
            ...data.components,
            schemas: Object.entries(data.components?.schemas || {}).reduce<
                Record<string, OpenAPISchema>
            >((acc, [key, schema]) => {
                const converted = JSON.parse(
                    JSON.stringify(schema).replace(/"type":\s*\[\s*"([^"]+)"\s*\]/g, '"type":"$1"')
                ) as OpenAPISchema;
                acc[key] = converted;
                return acc;
            }, {}),
        },
    };

    return <SwaggerClient spec={compatibleSpec} />;
}

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
    const apiUrl = process.env.NEXT_PUBLIC_OPENAPI_URL;

    console.log("Fetching OpenAPI spec from:", apiUrl);

    if (!apiUrl) {
        console.error("NEXT_PUBLIC_OPENAPI_URL is not configured");
        throw new Error("NEXT_PUBLIC_OPENAPI_URL is not configured");
    }

    if (apiUrl.includes("localhost")) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    try {
        const response = await fetch(apiUrl, {
            cache: "no-store",
        });

        console.log("Fetch response status:", response.status);

        if (!response.ok) {
            console.error(`Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`);
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        console.log("Successfully fetched OpenAPI spec");
        return data;
    } catch (error) {
        console.error("Error fetching OpenAPI spec:", error);
        throw error;
    }
}

export default async function ApiDocsPage() {
    try {
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
    } catch (error) {
        console.error("Error in ApiDocsPage:", error);
        return (
            <p className="text-red-500 p-4">
                Failed to load API documentation: {error instanceof Error ? error.message : "Unknown error"}
            </p>
        );
    }
}

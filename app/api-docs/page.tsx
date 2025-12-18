"use client";

import SwaggerClient from "./_components/swagger-client";
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState } from "react";

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

export default function ApiDocsPage() {
    const [spec, setSpec] = useState<OpenAPISpec | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSpec = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_OPENAPI_URL;
                if (!apiUrl) {
                    setError("API URL is not configured");
                    return;
                }

                const token = useAuthStore.getState().accessToken;
                if (!token) {
                    setError("No access token available");
                    return;
                }

                const response = await fetch("/api/openapi-spec", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    setError(`Failed to fetch: ${response.status}`);
                    return;
                }

                const data = await response.json();

                const compatibleSpec = {
                    ...data,
                    openapi: "3.0.0",
                    components: {
                        ...data.components,
                        schemas: Object.entries(data.components?.schemas || {}).reduce<
                            Record<string, OpenAPISchema>
                        >((acc, [key, schema]) => {
                            const converted = JSON.parse(
                                JSON.stringify(schema).replace(
                                    /"type":\s*\[\s*"([^"]+)"\s*\]/g,
                                    '"type":"$1"'
                                )
                            ) as OpenAPISchema;
                            acc[key] = converted;
                            return acc;
                        }, {}),
                    },
                };
                setError("");
                setSpec(compatibleSpec);
            } catch (err: any) {
                setError(`Error: ${err?.message || "Unknown error"}`);
            }
        };

        fetchSpec();
    }, []);

    if (error) {
        return <p className="text-red-500 p-4">{error}</p>;
    }

    if (!spec) {
        return <p>Loading API documentation...</p>;
    }

    return <SwaggerClient spec={spec} />;
}

"use client";

import "swagger-ui-react/swagger-ui.css";
import "./styles.css";

import SwaggerUI from "swagger-ui-react";
import { useAuthStore } from "@/store/auth-store";
import { useCallback, useEffect, useState } from "react";

type OpenAPISchema = {
    type?: string | string[];
    [key: string]: any;
};

type OpenAPISpec = Document & {
    components?: {
        schemas: Record<string, OpenAPISchema>;
    };
};

export default function ApiDocsPage() {
    const [spec, setSpec] = useState<OpenAPISpec | null>(null);
    const [error, setError] = useState("");

    const requestInterceptor = useCallback((req: any) => {
        const newRequest = { ...req };
        if (!newRequest.headers) {
            newRequest.headers = {};
        }
        const token = useAuthStore.getState().accessToken;
        if (token) {
            newRequest.headers.Authorization = `Bearer ${token}`;
        }
        return newRequest;
    }, []);

    useEffect(() => {
        const fetchSpec = async () => {
            try {
                const apiHeaders = new Headers();
                const token = useAuthStore.getState().accessToken;

                if (token) {
                    apiHeaders.set("Authorization", `Bearer ${token}`);
                } else {
                    setError("No access token available");
                    return;
                }

                const apiUrl = process.env.NEXT_PUBLIC_OPENAPI_URL;
                if (!apiUrl) {
                    setError("API URL is not configured");
                    return;
                }

                const response = await fetch(apiUrl, {
                    headers: apiHeaders,
                    credentials: "include",
                });

                if (response.status === 401 || response.status === 403) {
                    setError("Authentication failed. Please try logging in again.");
                    return;
                }

                if (!response.ok) {
                    const errorText = await response.text();
                    setError(`Failed to fetch API documentation: ${errorText}`);
                    return;
                }

                try {
                    const data = await response.json();
                    // Convert OpenAPI 3.1.0 to 3.0.0 for better compatibility
                    const compatibleSpec = {
                        ...data,
                        openapi: "3.0.0",
                        components: {
                            ...data.components,
                            schemas: Object.entries(data.components?.schemas || {}).reduce<
                                Record<string, OpenAPISchema>
                            >((acc, [key, schema]) => {
                                // Convert any 3.1 specific features to 3.0 compatible
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
                } catch (parseError) {
                    console.error("Parse error:", parseError);
                    setError("Failed to parse API documentation");
                }
            } catch (err: any) {
                setError(`Error fetching API documentation: ${err?.message || "Unknown error"}`);
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

    return (
        <section className="h-full w-full">
            <SwaggerUI
                url={undefined}
                spec={spec}
                supportedSubmitMethods={["get", "post", "put", "delete", "patch"]}
                tryItOutEnabled={true}
                displayRequestDuration={true}
                defaultModelExpandDepth={3}
                docExpansion="list"
                showCommonExtensions={true}
                requestInterceptor={requestInterceptor}
            />
        </section>
    );
}

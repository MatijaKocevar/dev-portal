"use client";

import "swagger-ui-react/swagger-ui.css";
import "./styles.css";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
    ssr: false,
    loading: () => <p>Loading Component...</p>,
});

export default function ApiDocsPage() {
    const { accessToken } = useAuthStore.getState();
    const [spec, setSpec] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSpec = async () => {
            try {
                const apiHeaders = new Headers();

                if (accessToken) {
                    apiHeaders.set("Authorization", `Bearer ${accessToken}`);
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

                const data = await response.json();
                setError("");
                setSpec(data);
            } catch (err: any) {
                setError(`Error fetching API documentation: ${err?.message || "Unknown error"}`);
            }
        };

        fetchSpec();
    }, [accessToken]);

    if (error) {
        return <p className="text-red-500 p-4">{error}</p>;
    }

    if (!spec) {
        return <p>Loading API documentation...</p>;
    }

    return (
        <section className="h-full w-full">
            <SwaggerUI
                spec={spec}
                requestInterceptor={(req) => {
                    const reqHeaders = new Headers(req.headers || {});
                    if (accessToken) {
                        reqHeaders.set("Authorization", `Bearer ${accessToken}`);
                    }
                    req.headers = Object.fromEntries(reqHeaders.entries());
                    return req;
                }}
            />
        </section>
    );
}

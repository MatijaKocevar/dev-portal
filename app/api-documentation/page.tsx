"use client";
import "./styles.css";
import { useAuth } from "@/app/providers/auth-provider";
import Script from "next/script";
import { useEffect, useCallback } from "react";

interface SwaggerRequest {
    headers: Record<string, string>;
    [key: string]: unknown;
}

interface SwaggerUIConstructor {
    (config: {
        url: string;
        dom_id: string;
        requestInterceptor?: (req: SwaggerRequest) => SwaggerRequest;
    }): void;
}

declare global {
    interface Window {
        SwaggerUIBundle: SwaggerUIConstructor;
        ui: unknown;
    }
}

export default function APIDocumentationPage() {
    const { token } = useAuth();

    const initSwagger = useCallback(() => {
        if (window.SwaggerUIBundle) {
            window.ui = window.SwaggerUIBundle({
                url: "/api/docs",
                dom_id: "#swagger-ui",
                requestInterceptor: (req) => {
                    if (token) {
                        req.headers.Authorization = `Bearer ${token}`;
                    }

                    return req;
                },
            });
        }
    }, [token]);

    useEffect(() => {
        initSwagger();
    }, [initSwagger]);

    return (
        <div className="flex-1">
            <div className="swagger-wrapper">
                <link rel="stylesheet" href="https://unpkg.com/swagger-ui-react/swagger-ui.css" />
                <div id="swagger-ui" />
                <Script
                    src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"
                    onLoad={initSwagger}
                />
            </div>
        </div>
    );
}

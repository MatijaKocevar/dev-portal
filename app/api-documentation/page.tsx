"use client";
import "./styles.css";
import Script from "next/script";
import { useEffect } from "react";

interface SwaggerUIConstructor {
    (config: {
        url: string;
        dom_id: string;
        withCredentials?: boolean;
    }): void;
}

declare global {
    interface Window {
        SwaggerUIBundle: SwaggerUIConstructor;
        ui: unknown;
    }
}

export default function APIDocumentationPage() {
    const initializeSwagger = () => {
        if (!window.SwaggerUIBundle) return;

        window.ui = window.SwaggerUIBundle({
            url: "/api/docs",
            dom_id: "#swagger-ui",
            withCredentials: true,
        });
    };

    useEffect(() => {
        initializeSwagger();
        return () => {
            if (window.ui && typeof window.ui === "object" && "unmount" in window.ui) {
                (window.ui as { unmount: () => void }).unmount();
            }
        };
    }, []);

    return (
        <div className="flex-1">
            <div className="swagger-wrapper">
                <link rel="stylesheet" href="https://unpkg.com/swagger-ui-react/swagger-ui.css" />
                <div id="swagger-ui" />
                <Script
                    src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"
                    onLoad={initializeSwagger}
                />
            </div>
        </div>
    );
}

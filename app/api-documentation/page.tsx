"use client";
import "./styles.css";
interface SwaggerUIConstructor {
    (config: { url: string; dom_id: string }): void;
}

declare global {
    interface Window {
        SwaggerUIBundle: SwaggerUIConstructor;
        ui: unknown;
    }
}

import Script from "next/script";
import { useEffect } from "react";

const initSwagger = () => {
    if (window.SwaggerUIBundle) {
        window.ui = window.SwaggerUIBundle({
            url: "/api/docs",
            dom_id: "#swagger-ui",
        });
    }
};

export default function APIDocumentationPage() {
    useEffect(() => {
        initSwagger();
    }, []);

    return (
        <div className="flex-1 ">
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

"use client";

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

export default function Home() {
    useEffect(() => {
        const initSwagger = () => {
            if (window.SwaggerUIBundle) {
                window.ui = window.SwaggerUIBundle({
                    url: "/api/docs",
                    dom_id: "#swagger-ui",
                });
            }
        };
        initSwagger();
    }, []);

    return (
        <div className="swagger-wrapper">
            <link rel="stylesheet" href="https://unpkg.com/swagger-ui-react/swagger-ui.css" />
            <div id="swagger-ui" />
            <Script
                src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"
                onLoad={() => {
                    window.ui = window.SwaggerUIBundle({
                        url: "/api/docs",
                        dom_id: "#swagger-ui",
                    });
                }}
                strategy="afterInteractive"
            />
        </div>
    );
}

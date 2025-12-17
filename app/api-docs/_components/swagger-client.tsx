"use client";

import "swagger-ui-react/swagger-ui.css";
import "../styles.css";

import SwaggerUI from "swagger-ui-react";
import { useAuthStore } from "@/store/auth-store";
import { useCallback } from "react";

type OpenAPISpec = {
    [key: string]: any;
};

export default function SwaggerClient({ spec }: { spec: OpenAPISpec }) {
    console.log("SwaggerClient received spec:", spec ? "✓" : "✗");

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

    if (!spec) {
        console.error("No spec provided to SwaggerClient");
        return <p className="text-red-500 p-4">No API specification loaded</p>;
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

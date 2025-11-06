import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins = [
    "https://dev-portal-management.vercel.app",
    "https://reduxi.energy",
    "http://localhost:5173",
    "https://localhost:5173",
    "https://localhost:3000",
    "http://localhost:3000",
    "https://localhost:5000",
    "http://localhost:5000",
];

export function middleware(request: NextRequest) {
    const origin = request.headers.get("origin");

    if (origin && !allowedOrigins.includes(origin)) {
        return new NextResponse(null, {
            status: 403,
            statusText: "Forbidden",
        });
    }

    if (request.method === "OPTIONS") {
        return new NextResponse(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": origin || "https://staging.reduxi.energy",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
                "Access-Control-Allow-Credentials": "true",
            },
        });
    }

    return NextResponse.next();
}

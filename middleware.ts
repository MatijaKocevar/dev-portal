import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const origin =
        process.env.NEXT_PUBLIC_FRONTEND_URL || "https://dev-portal-management.vercel.app";

    if (request.method === "OPTIONS") {
        const response = new NextResponse(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Max-Age": "86400",
            },
        });
        return response;
    }

    return NextResponse.next();
}

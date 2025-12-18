import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_OPENAPI_URL;

        if (!apiUrl) {
            return NextResponse.json(
                { error: "NEXT_PUBLIC_OPENAPI_URL is not configured" },
                { status: 500 }
            );
        }

        const authHeader = request.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json({ error: "No authorization header" }, { status: 401 });
        }

        if (apiUrl.includes("localhost")) {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        }

        const response = await fetch(apiUrl, {
            headers: {
                Authorization: authHeader,
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Backend returned ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

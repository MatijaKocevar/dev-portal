import { NextResponse } from "next/server";

export async function GET() {
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        const response = await fetch("https://localhost:5000/docs/api");

        if (!response.ok) {
            return NextResponse.json(
                { error: `Backend returned ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Fetch error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

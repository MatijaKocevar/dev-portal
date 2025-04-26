import { type NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./auth-service";

export function withAuth(handler: (req: NextRequest) => Promise<NextResponse> | NextResponse) {
    return async function (req: NextRequest) {
        const token = req.headers.get("authorization")?.split(" ")[1];

        if (!token || !(await verifyToken(token))) {
            return new NextResponse(null, {
                status: 401,
                statusText: "Unauthorized",
            });
        }

        return handler(req);
    };
}

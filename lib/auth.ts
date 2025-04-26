import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify, createRemoteJWKSet } from "jose";

const KEYCLOAK_URL = process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:8180";
const KEYCLOAK_REALM = process.env.NEXT_PUBLIC_AUTH_REALM || "flex-development";

const JWKS = createRemoteJWKSet(
    new URL(`${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/certs`)
);

export function withAuth(handler: (req: NextRequest) => Promise<NextResponse> | NextResponse) {
    return async function (req: NextRequest) {
        const headerToken = req.headers.get("authorization")?.split(" ")[1];
        const cookieToken = req.cookies.get("access_token")?.value;
        const token = headerToken || cookieToken;

        if (!token) {
            return new NextResponse(null, {
                status: 401,
                statusText: "Unauthorized",
            });
        }

        try {
            await jwtVerify(token, JWKS, {
                issuer: `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}`,
            });
        } catch {
            return new NextResponse(null, {
                status: 401,
                statusText: "Unauthorized",
            });
        }

        return handler(req);
    };
}

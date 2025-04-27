/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

const KEYCLOAK_URL = process.env.NEXT_PUBLIC_KEYCLOAK_URL;
const KEYCLOAK_REALM = process.env.NEXT_PUBLIC_AUTH_REALM;
const CLIENT_ID = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID;

type TokenResponse = { access_token: string; expires_in: number };

/**
 * Login user.
 * @response: TokenResponse
 */
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const grant_type = formData.get("grant_type");

    if (grant_type === "refresh_token") {
        const refreshToken = request.cookies.get("refresh_token")?.value;

        if (!refreshToken) {
            return NextResponse.json({ error: "No refresh token" }, { status: 401 });
        }

        const body = new URLSearchParams();
        body.append("client_id", CLIENT_ID!);
        body.append("grant_type", "refresh_token");
        body.append("refresh_token", refreshToken);

        const response = await fetch(
            `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: body.toString(),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict" as const,
            path: "/",
        };

        const res = NextResponse.json({
            access_token: data.access_token,
            expires_in: data.expires_in,
        });

        res.cookies.set("access_token", data.access_token, {
            ...cookieOptions,
            maxAge: data.expires_in,
        });

        if (data.refresh_token) {
            res.cookies.set("refresh_token", data.refresh_token, {
                ...cookieOptions,
                maxAge: data.refresh_expires_in,
            });
        }

        return res;
    }

    const body = new URLSearchParams();
    body.append("client_id", CLIENT_ID!);
    body.append("grant_type", "password");
    body.append("username", formData.get("username") as string);
    body.append("password", formData.get("password") as string);

    const response = await fetch(
        `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json(data, { status: response.status });
    }

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict" as const,
        path: "/",
    };

    const res = NextResponse.json({
        access_token: data.access_token,
        expires_in: data.expires_in,
    });

    res.cookies.set("access_token", data.access_token, {
        ...cookieOptions,
        maxAge: data.expires_in,
    });

    if (data.refresh_token) {
        res.cookies.set("refresh_token", data.refresh_token, {
            ...cookieOptions,
            maxAge: data.refresh_expires_in,
        });
    }

    return res;
}

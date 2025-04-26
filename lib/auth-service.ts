import { jwtVerify, createRemoteJWKSet } from "jose";

const KEYCLOAK_URL = process.env.KEYCLOAK_URL || "http://localhost:8180";
const KEYCLOAK_REALM = "Flex";
const CLIENT_ID = "flex-client";

const JWKS = createRemoteJWKSet(
    new URL(`${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/certs`)
);

export type TokenResponse = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    refresh_expires_in: number;
};

export async function loginWithPassword(
    username: string,
    password: string
): Promise<TokenResponse> {
    const response = await fetch(
        `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "password",
                client_id: CLIENT_ID,
                username,
                password,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Invalid credentials");
    }

    return response.json();
}

export async function refreshToken(refreshToken: string): Promise<TokenResponse> {
    const response = await fetch(
        `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                client_id: CLIENT_ID,
                refresh_token: refreshToken,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to refresh token");
    }

    return response.json();
}

export async function logout(refreshToken: string): Promise<void> {
    await fetch(`${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            refresh_token: refreshToken,
        }),
    });
}

export async function verifyToken(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, JWKS, {
            issuer: `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}`,
        });
        return true;
    } catch {
        return false;
    }
}

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    TokenResponse,
    loginWithPassword,
    logout as keycloakLogout,
    refreshToken,
} from "@/lib/auth-service";

type AuthContextType = {
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

let refreshTimeoutId: NodeJS.Timeout;

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (storedToken && storedRefreshToken) {
            setToken(storedToken);
            setRefreshTokenValue(storedRefreshToken);
            scheduleTokenRefresh(storedRefreshToken);
        }

        return () => {
            if (refreshTimeoutId) clearTimeout(refreshTimeoutId);
        };
    }, []);

    const scheduleTokenRefresh = async (currentRefreshToken: string) => {
        if (refreshTimeoutId) clearTimeout(refreshTimeoutId);

        try {
            const tokens = await refreshToken(currentRefreshToken);

            updateTokens(tokens);
            scheduleNextRefresh(tokens);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Token refresh failed:", error.message);
            }

            await logout();
        }
    };

    const scheduleNextRefresh = (tokens: TokenResponse) => {
        const timeoutMs = (tokens.expires_in - 60) * 1000;

        refreshTimeoutId = setTimeout(() => {
            if (refreshTokenValue) {
                scheduleTokenRefresh(refreshTokenValue);
            }
        }, timeoutMs);
    };

    const updateTokens = (tokens: TokenResponse) => {
        localStorage.setItem("token", tokens.access_token);
        localStorage.setItem("refreshToken", tokens.refresh_token);

        setToken(tokens.access_token);
        setRefreshTokenValue(tokens.refresh_token);
    };

    const login = async (username: string, password: string) => {
        const tokens = await loginWithPassword(username, password);

        updateTokens(tokens);
        scheduleNextRefresh(tokens);

        router.push("/dashboard");
    };

    const logout = async () => {
        if (refreshTokenValue) {
            try {
                await keycloakLogout(refreshTokenValue);
            } catch {}
        }

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        setToken(null);
        setRefreshTokenValue(null);

        if (refreshTimeoutId) clearTimeout(refreshTimeoutId);

        router.push("/login");
    };

    return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

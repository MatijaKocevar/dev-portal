import { create } from "zustand";

interface AuthResponseDTO {
    access_token: string;
    expires_in: number;
}

interface TokenResponse {
    accessToken: string;
    expiresIn: number;
}

interface LoginCredentials {
    username: string;
    password: string;
}

const mapAuthResponse = (dto: AuthResponseDTO): TokenResponse => ({
    accessToken: dto.access_token,
    expiresIn: dto.expires_in,
});

interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
    refreshTimer: number | null;
    startRefreshTimer: (expiresIn: number) => void;
    stopRefreshTimer: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,
    refreshTimer: null,

    startRefreshTimer: (expiresIn: number) => {
        const { refreshTimer, refresh } = get();

        if (refreshTimer) {
            window.clearTimeout(refreshTimer);
        }

        if (!expiresIn || expiresIn <= 0) {
            return;
        }

        const refreshDelay = Math.max(0, expiresIn - 30) * 1000;
        const timer = window.setTimeout(() => {
            void refresh();
        }, refreshDelay);

        set({ refreshTimer: timer });
    },

    stopRefreshTimer: () => {
        const { refreshTimer } = get();

        if (refreshTimer) {
            window.clearTimeout(refreshTimer);
            set({ refreshTimer: null });
        }
    },

    refresh: async () => {
        const { isLoading } = get();
        if (isLoading) return;

        set({ isLoading: true });

        try {
            const response = await fetch("/api/auth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "refresh_token",
                }),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Token refresh failed");
            }

            const dto = await response.json();
            const data = mapAuthResponse(dto);

            set({
                accessToken: data.accessToken,
                isAuthenticated: true,
                isLoading: false,
            });

            get().startRefreshTimer(data.expiresIn);
        } catch {
            get().stopRefreshTimer();
            set({
                accessToken: null,
                isAuthenticated: false,
                isLoading: false,
            });

            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }
    },

    login: async ({ username, password }: LoginCredentials) => {
        set({ isLoading: true });

        try {
            const response = await fetch("/api/auth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "password",
                    username,
                    password,
                }),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const dto = await response.json();
            const data = mapAuthResponse(dto);

            set({
                accessToken: data.accessToken,
                isAuthenticated: true,
                isLoading: false,
            });

            get().startRefreshTimer(data.expiresIn);
        } catch {
            set({
                accessToken: null,
                isAuthenticated: false,
                isLoading: false,
            });
            throw new Error("Login failed");
        }
    },

    logout: async () => {
        set({ isLoading: true });
        get().stopRefreshTimer();

        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
        } finally {
            set({
                accessToken: null,
                isAuthenticated: false,
                isLoading: false,
            });

            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }
    },
}));

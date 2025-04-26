import { create } from "zustand";

type AuthStore = {
    isAuthenticated: boolean;
    expiresIn: number;
    refreshTimer: ReturnType<typeof setInterval> | null;
    setAuthenticated: (value: boolean) => void;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
    startRefreshTimer: () => void;
    stopRefreshTimer: () => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
    isAuthenticated: false,
    refreshTimer: null,
    expiresIn: 300,
    setAuthenticated: (value: boolean) => {
        set({ isAuthenticated: value });

        if (value) {
            get().startRefreshTimer();
        } else {
            get().stopRefreshTimer();
        }
    },

    startRefreshTimer: () => {
        const currentTimer = get().refreshTimer;
        const { expiresIn } = get();

        if (currentTimer) {
            clearInterval(currentTimer);
        }

        const timer = setInterval(async () => {
            try {
                await get().refresh();
            } catch {
                get().stopRefreshTimer();
                set({ isAuthenticated: false });
            }
        }, (expiresIn - 30) * 1000);

        set({ refreshTimer: timer });
    },

    stopRefreshTimer: () => {
        const currentTimer = get().refreshTimer;

        if (currentTimer) {
            clearInterval(currentTimer);
            set({ refreshTimer: null });
        }
    },

    login: async (username: string, password: string) => {
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
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        set({ isAuthenticated: true });
        get().startRefreshTimer();
    },

    refresh: async () => {
        const response = await fetch("/api/auth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
            }),
        });

        if (!response.ok) {
            get().stopRefreshTimer();
            set({ isAuthenticated: false });
            throw new Error("Failed to refresh token");
        }

        set({ isAuthenticated: true });
    },

    logout: async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        get().stopRefreshTimer();
        set({ isAuthenticated: false });
    },
}));

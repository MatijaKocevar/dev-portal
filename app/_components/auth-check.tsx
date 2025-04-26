"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";

export function AuthCheck({ children }: { children: React.ReactNode }) {
    const refresh = useAuthStore((state) => state.refresh);
    const silentRefresh = useAuthStore((state) => state.silentRefresh);
    const isLoading = useAuthStore((state) => state.isLoading);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        if (!isAuthenticated) {
            refresh();
        } else {
            silentRefresh();
        }
    }, [refresh, silentRefresh, isAuthenticated]);

    return (
        <>
            {mounted && !isLoading && children}
        </>
    );
}

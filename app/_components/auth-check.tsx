"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";

export function AuthCheck({ children }: { children: React.ReactNode }) {
    const { refresh, isLoading } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        refresh();
    }, []);

    if (!mounted) {
        return null;
    }

    if (isLoading) {
        return null;
    }

    return <>{children}</>;
}

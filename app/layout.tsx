"use client";

import "./globals.css";
import { useEffect } from "react";
import { LayoutContent } from "@/app/_components/layout-content";
import { useAuthStore } from "@/store/auth-store";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { refresh, setAuthenticated } = useAuthStore();

    useEffect(() => {
        const initAuth = async () => {
            try {
                await refresh();
                setAuthenticated(true);
            } catch {
                setAuthenticated(false);
            }
        };

        initAuth();
    }, []);

    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <body className="min-h-screen bg-background">
                <LayoutContent>{children}</LayoutContent>
            </body>
        </html>
    );
}

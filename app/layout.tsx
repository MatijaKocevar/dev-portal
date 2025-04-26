"use client";

import "./globals.css";
import { useEffect } from "react";
import { LayoutContent } from "@/app/_components/layout-content";
import { useAuthStore } from "@/store/auth-store";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { refresh } = useAuthStore();

    useEffect(() => {
        refresh();
    }, []);

    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <body className="min-h-screen bg-background">
                <LayoutContent>{children}</LayoutContent>
            </body>
        </html>
    );
}

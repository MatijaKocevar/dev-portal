"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function LayoutContent({ children }: { children: React.ReactNode }) {
    const [pageTitle, setPageTitle] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                const breadcrumbMeta = document.querySelector('meta[name="breadcrumb"]');
                if (breadcrumbMeta) {
                    setPageTitle(breadcrumbMeta.getAttribute("content") || "");
                }
            });
        });

        observer.observe(document.head, {
            subtree: true,
            characterData: true,
            childList: true,
        });

        const breadcrumbMeta = document.querySelector('meta[name="breadcrumb"]');
        if (breadcrumbMeta) {
            setPageTitle(breadcrumbMeta.getAttribute("content") || "");
        }

        return () => observer.disconnect();
    }, [pathname]);

    return (
        <SidebarProvider>
            <div className="relative flex min-h-screen max-h-screen w-full overflow-hidden">
                <AppSidebar />
                <main className="flex-1 overflow-auto">
                    <div className="sticky top-0 z-10 w-full border-b bg-background h-16 px-4 flex items-center gap-3">
                        <SidebarTrigger />
                        <h1 className="text-xl font-semibold">{pageTitle}</h1>
                    </div>
                    <div className="p-4">{children}</div>
                </main>
            </div>
        </SidebarProvider>
    );
}

import { cookies } from "next/headers";
import "./globals.css";
import { LayoutContent } from "@/app/_components/layout-content";

export const metadata = {
    title: "Trading Platform Mock API",
    description: "Mock API for the Trading Platform",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const sidebarState = cookieStore.get("sidebar_state")?.value === "true";

    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <body className="min-h-screen bg-background">
                <LayoutContent defaultSidebarState={sidebarState}>{children}</LayoutContent>
            </body>
        </html>
    );
}

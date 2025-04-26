import "./globals.css";
import { cookies } from "next/headers";
import { LayoutContent } from "@/app/_components/layout-content";
import { AuthProvider } from "@/app/providers/auth-provider";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const sidebarState = cookieStore.get("sidebar_state")?.value === "true";

    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <body className="min-h-screen bg-background">
                <AuthProvider>
                    <LayoutContent defaultSidebarState={sidebarState}>{children}</LayoutContent>
                </AuthProvider>
            </body>
        </html>
    );
}

import "./globals.css";
import { LayoutContent } from "@/app/_components/layout-content";

export const metadata = {
    title: "Trading Platform Mock API",
    description: "Mock API for the Trading Platform",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <body className="min-h-screen bg-background">
                <LayoutContent>{children}</LayoutContent>
            </body>
        </html>
    );
}

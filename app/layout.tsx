import "./globals.css";
import { LayoutContent } from "@/components/layout-content";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <body className="min-h-screen bg-background">
                <LayoutContent>{children}</LayoutContent>
            </body>
        </html>
    );
}

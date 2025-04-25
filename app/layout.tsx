import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Trading Platform Mock API Documentation",
    description: "API documentation for the Trading Platform Mock API",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "API Documentation | Dev Portal",
    description: "OpenAPI/Swagger documentation for the Trading Platform Mock API endpoints",
    other: {
        breadcrumb: "API Documentation",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

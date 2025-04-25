import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Trading Platform Mock API",
    description: "Component test dashboard for the Trading Platform Mock API",
    other: {
        breadcrumb: "Dashboard",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

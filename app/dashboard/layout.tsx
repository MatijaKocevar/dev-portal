import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Dev Portal",
    description: "Component test dashboard for the Dev Portal",
    other: {
        breadcrumb: "Dashboard",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

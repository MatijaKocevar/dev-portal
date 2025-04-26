import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Dev Portal",
    description: "Login to the Dev Portal",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return children;
}

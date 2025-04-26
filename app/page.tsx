"use client";

import { redirect } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function Page() {
    const { isAuthenticated } = useAuthStore();

    return isAuthenticated ? redirect("/dashboard") : redirect("/login");
}

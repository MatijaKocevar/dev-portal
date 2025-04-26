"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/app/providers/auth-provider";

export default function Page() {
    const { token } = useAuth();
    return token ? redirect("/dashboard") : redirect("/login");
}

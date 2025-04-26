"use client";

import * as React from "react";
import Link from "next/link";
import { FileCode, LayoutDashboard, LogOut } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

const mainNav = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "API Documentation",
        href: "/api-documentation",
        icon: FileCode,
    },
];

export function AppSidebar() {
    const { logout } = useAuthStore();

    return (
        <Sidebar>
            <SidebarHeader className="h-16 mb-2 flex justify-center border-b">
                <Link href="/" className="px-4">
                    <h2 className="text-2xl font-semibold tracking-tight">Dev Portal</h2>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={mainNav} />
            </SidebarContent>
            <SidebarFooter>
                <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}

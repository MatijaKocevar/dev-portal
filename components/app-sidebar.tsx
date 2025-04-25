"use client";

import * as React from "react";
import Link from "next/link";
import { FileCode, LayoutDashboard } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";

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
    return (
        <Sidebar>
            <SidebarHeader className="h-16 mb-2 flex justify-center border-b">
                <Link href="/" className="px-4">
                    <h2 className="text-2xl font-semibold tracking-tight">Mock API</h2>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={mainNav} />
            </SidebarContent>
        </Sidebar>
    );
}

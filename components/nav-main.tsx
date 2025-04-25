"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
}

interface NavProps {
    items: NavItem[];
}

export function NavMain({ items }: NavProps) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-1">
            {items.map((item, index) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={index}
                        href={item.href}
                        className={cn(
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            isActive && "bg-accent text-accent-foreground"
                        )}
                    >
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                    </Link>
                );
            })}
        </div>
    );
}

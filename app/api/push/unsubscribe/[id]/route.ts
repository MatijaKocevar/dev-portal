import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";

interface Subscription {
    id: number;
    endpoint: string;
    p256dh: string;
    auth: string;
    userId: string;
}

export const DELETE = withAuth(async (req: NextRequest) => {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const subscriptionId = parseInt(id || "");

    const subscriptions: Subscription[] = require("../../subscribe/route").subscriptions;
    const index = subscriptions.findIndex((sub: Subscription) => sub.id === subscriptionId);

    if (index === -1) {
        return new NextResponse("Subscription not found", { status: 404 });
    }

    subscriptions.splice(index, 1);
    return new NextResponse("Subscription deleted", { status: 200 });
});

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";

interface Subscription {
    id: number;
    endpoint: string;
    p256dh: string;
    auth: string;
    userId: string;
}

const subscriptions: Subscription[] = [];
let nextId = 1;

export const POST = withAuth(async (req: NextRequest) => {
    const { endpoint, p256dh, auth } = await req.json();
    const userId = req.headers.get("user-id") || "unknown";

    const existingSubscription = subscriptions.find((sub) => sub.endpoint === endpoint);
    if (existingSubscription) {
        existingSubscription.p256dh = p256dh;
        existingSubscription.auth = auth;
        existingSubscription.userId = userId;
        return NextResponse.json(existingSubscription);
    }

    const subscription = {
        id: nextId++,
        endpoint,
        p256dh,
        auth,
        userId,
    };

    subscriptions.push(subscription);
    return NextResponse.json(subscription);
});

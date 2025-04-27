import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { VAPID_CONFIG } from "@/lib/vapid";
import { withAuth } from "@/lib/auth";
import { PushSubscription } from "@/lib/types";

const subscriptions: PushSubscription[] = [];

webpush.setVapidDetails(VAPID_CONFIG.subject, VAPID_CONFIG.publicKey, VAPID_CONFIG.privateKey);

export const GET = withAuth(async () => {
    return NextResponse.json({ publicKey: VAPID_CONFIG.publicKey });
});

export const POST = withAuth(async (req: NextRequest) => {
    const subscription = await req.json();
    const userId = req.headers.get("user-id") || "unknown";

    const pushSubscription: PushSubscription = {
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
        userId,
    };

    const existingIndex = subscriptions.findIndex(
        (sub) => sub.endpoint === pushSubscription.endpoint
    );
    if (existingIndex >= 0) {
        subscriptions[existingIndex] = pushSubscription;
    } else {
        subscriptions.push(pushSubscription);
    }

    return NextResponse.json({ message: "Subscription saved" });
});

export const DELETE = withAuth(async (req: NextRequest) => {
    const subscription = await req.json();
    const index = subscriptions.findIndex((sub) => sub.endpoint === subscription.endpoint);

    if (index >= 0) {
        subscriptions.splice(index, 1);
        return NextResponse.json({ message: "Subscription removed" });
    }

    return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
});

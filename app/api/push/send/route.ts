import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { withAuth } from "@/lib/auth";
import { VAPID_CONFIG } from "@/lib/vapid";

if (!VAPID_CONFIG.publicKey || !VAPID_CONFIG.privateKey || !VAPID_CONFIG.subject) {
    throw new Error("Missing VAPID configuration environment variables");
}

webpush.setVapidDetails(VAPID_CONFIG.subject, VAPID_CONFIG.publicKey, VAPID_CONFIG.privateKey);

export const POST = withAuth(async (req: NextRequest) => {
    const { title, body }: { title: string; body: string } = await req.json();
    const subscriptions = require("../subscribe/route").subscriptions;

    const payload = JSON.stringify({
        notification: {
            title,
            body,
        },
    });

    const notifications = subscriptions.map((subscription: any) =>
        webpush.sendNotification(
            {
                endpoint: subscription.endpoint,
                keys: {
                    p256dh: subscription.p256dh,
                    auth: subscription.auth,
                },
            },
            payload
        )
    );

    try {
        await Promise.all(notifications);
        return new NextResponse("Notifications sent", { status: 200 });
    } catch (error) {
        console.error("Error sending notifications:", error);
        return new NextResponse("Error sending notifications", { status: 500 });
    }
});

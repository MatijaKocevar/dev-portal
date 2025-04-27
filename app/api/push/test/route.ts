import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import webpush from "web-push";
import { VAPID_CONFIG } from "@/lib/vapid";

if (!VAPID_CONFIG.publicKey || !VAPID_CONFIG.privateKey || !VAPID_CONFIG.subject) {
    throw new Error("Missing VAPID configuration environment variables");
}

webpush.setVapidDetails(VAPID_CONFIG.subject, VAPID_CONFIG.publicKey, VAPID_CONFIG.privateKey);

export const POST = withAuth(async (req: NextRequest) => {
    const { title, body, url, subscription } = await req.json();

    const payload = JSON.stringify({
        notification: {
            title,
            body,
            data: { url },
        },
    });

    try {
        await webpush.sendNotification(
            {
                endpoint: subscription.endpoint,
                keys: {
                    p256dh: subscription.p256dh,
                    auth: subscription.auth,
                },
            },
            payload
        );

        return new NextResponse("Notification sent", { status: 200 });
    } catch (error) {
        console.error("Error sending notification:", error);
        return new NextResponse("Error sending notification", { status: 500 });
    }
});

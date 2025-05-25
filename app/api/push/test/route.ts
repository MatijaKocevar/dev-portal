/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import { withAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import webpush from "web-push";
import { VAPID_CONFIG } from "@/lib/vapid";

type TestNotificationResponse = string;

webpush.setVapidDetails(VAPID_CONFIG.subject, VAPID_CONFIG.publicKey, VAPID_CONFIG.privateKey);

/**
 * Send test push notification.
 * @auth: bearer
 * @response: TestNotificationResponse
 */
export const POST = withAuth(async (req: NextRequest) => {
    try {
        const { title, body, url } = await req.json();
        const token =
            req.headers.get("authorization")?.split(" ")[1] ||
            req.cookies.get("access_token")?.value;
        const decoded = decodeJwt(token!);
        const userId = decoded.sub as string;

        const subscription = await prisma.pushSubscription.findFirst({
            where: { userId },
        });

        if (!subscription) {
            return new NextResponse("No subscription found for user", { status: 404 });
        }

        const payload = JSON.stringify({
            notification: {
                title,
                body,
                data: { url },
            },
        });

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

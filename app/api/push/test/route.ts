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

        const subscriptions = await prisma.pushSubscription.findMany({
            where: { userId },
        });

        if (!subscriptions.length) {
            return new NextResponse("No subscriptions found for user", { status: 404 });
        }

        const payload = JSON.stringify({
            notification: {
                title,
                body,
                data: { url },
            },
        });

        const results = await Promise.allSettled(
            subscriptions.map((subscription) =>
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
            )
        );

        const failedCount = results.filter((result) => result.status === "rejected").length;
        const successCount = results.filter((result) => result.status === "fulfilled").length;

        if (failedCount > 0) {
            console.error(`Failed to send notifications to ${failedCount} devices`);
        }

        return new NextResponse(
            `Notifications sent successfully to ${successCount} devices, failed for ${failedCount} devices`,
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending notifications:", error);
        return new NextResponse("Error sending notifications", { status: 500 });
    }
});

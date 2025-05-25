/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import { withAuth } from "@/lib/auth";
import { VAPID_CONFIG } from "@/lib/vapid";
import { savePushSubscription } from "@/actions/push";

type VapidKeyResponse = string;

type SubscriptionResponse = {
    id: string;
    endpoint: string;
    p256dh: string;
    auth: string;
    userId: string;
};

/**
 * Subscribe to push notifications.
 * @auth: bearer
 * @response: SubscriptionResponse
 */
export const POST = withAuth(async (req: NextRequest) => {
    try {
        const subscription = await req.json();

        const token =
            req.headers.get("authorization")?.split(" ")[1] ||
            req.cookies.get("access_token")?.value;

        const decoded = decodeJwt(token!);

        console.log("Decoded JWT:", decoded);

        const userId = decoded.sub as string;

        const savedSubscription = await savePushSubscription({
            endpoint: subscription.endpoint,
            p256dh: subscription.p256dh,
            auth: subscription.auth,
            userId,
        });

        return NextResponse.json(savedSubscription);
    } catch (error) {
        console.error("Error in push subscription endpoint:", error);
        if (error instanceof Error) {
            console.error("Error details:", {
                message: error.message,
                stack: error.stack,
            });
        }
        return new NextResponse(
            JSON.stringify({
                error: "Error processing request",
                details: error instanceof Error ? error.message : String(error),
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
});

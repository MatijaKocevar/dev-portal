/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { sendPushNotification } from "@/actions/push";

type SendNotificationResponse = {
    message: string;
};

/**
 * Send push notification.
 * @auth: bearer
 * @response: SendNotificationResponse
 */
export const POST = withAuth(async (req: NextRequest) => {
    const { title, body } = await req.json();

    try {
        await sendPushNotification(title, body);
        return new NextResponse("Notifications sent", { status: 200 });
    } catch (error) {
        console.error("Error sending notifications:", error);
        return new NextResponse("Error sending notifications", { status: 500 });
    }
});

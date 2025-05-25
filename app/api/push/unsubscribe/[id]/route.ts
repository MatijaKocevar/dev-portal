/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type UnsubscribeResponse = string;

/**
 * Unsubscribe from push notifications.
 * @auth: bearer
 * @response: UnsubscribeResponse
 */
export const DELETE = withAuth(async (req: NextRequest) => {
    try {
        const { endpoint } = await req.json();

        await prisma.pushSubscription.delete({
            where: { endpoint },
        });

        return new NextResponse("Subscription deleted", { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Error processing request", { status: 500 });
    }
});

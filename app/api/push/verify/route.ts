/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import { withAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type VerifyResponse = {
    isValid: boolean;
    subscription?: {
        id: string;
        endpoint: string;
        p256dh: string;
        auth: string;
        userId: string;
    };
};

/**
 * Verify a push subscription.
 * @auth: bearer
 * @response: VerifyResponse
 */
export const POST = withAuth(async (req: NextRequest) => {
    try {
        const { endpoint } = await req.json();

        const token =
            req.headers.get("authorization")?.split(" ")[1] ||
            req.cookies.get("access_token")?.value;
        const decoded = decodeJwt(token!);
        const userId = decoded.sub as string;

        const subscription = await prisma.pushSubscription.findFirst({
            where: {
                endpoint,
                userId,
            },
        });

        return NextResponse.json({
            isValid: !!subscription,
            subscription,
        });
    } catch (error) {
        console.error("Error in push subscription verification endpoint:", error);
        return new NextResponse(
            JSON.stringify({
                error: "Error processing request",
                details: error instanceof Error ? error.message : String(error),
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
});

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
        let endpoint;
        try {
            const body = await req.text();
            console.log("Received body:", body);
            if (body) {
                const data = JSON.parse(body);
                endpoint = data.endpoint;
            }
        } catch (e) {
            console.error("Error parsing request body:", e);
        }

        if (!endpoint) {
            console.error("No endpoint provided in request");
            return new NextResponse(JSON.stringify({ error: "No endpoint provided" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        try {
            const result = await prisma.pushSubscription.delete({
                where: { endpoint },
            });

            return new NextResponse(
                JSON.stringify({ message: "Subscription deleted", subscription: result }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        } catch (error) {
            console.error("Database error while deleting subscription:", error);
            if (error instanceof Error && "code" in error && error.code === "P2025") {
                return new NextResponse(JSON.stringify({ error: "Subscription not found" }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                });
            }
            throw error;
        }
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse(
            JSON.stringify({
                error: "Error processing request",
                details: error instanceof Error ? error.message : String(error),
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
});

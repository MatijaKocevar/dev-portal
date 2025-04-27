import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const DELETE = withAuth(async (req: NextRequest) => {
    try {
        const id = parseInt(req.url.split('/').pop() || '');

        await prisma.pushSubscription.delete({
            where: { id }
        });

        return new NextResponse("Subscription deleted", { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Error processing request", { status: 500 });
    }
});

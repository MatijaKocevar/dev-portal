import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import { withAuth } from "@/lib/auth";
import { VAPID_CONFIG } from "@/lib/vapid";
import { savePushSubscription } from "@/actions/push";

export const GET = async () => {
    if (!VAPID_CONFIG.publicKey) {
        return new NextResponse("VAPID public key not configured", { status: 500 });
    }
    return new NextResponse(VAPID_CONFIG.publicKey);
};

export const POST = withAuth(async (req: NextRequest) => {
    try {
        const subscription = await req.json();
        const token =
            req.headers.get("authorization")?.split(" ")[1] ||
            req.cookies.get("access_token")?.value;
        const decoded = decodeJwt(token!);
        const userId = decoded.preferred_username as string;

        const savedSubscription = await savePushSubscription({
            endpoint: subscription.endpoint,
            p256dh: subscription.p256dh,
            auth: subscription.auth,
            userId,
        });

        return NextResponse.json(savedSubscription);
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Error processing request", { status: 500 });
    }
});

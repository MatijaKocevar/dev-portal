import { NextResponse } from "next/server";
import { VAPID_CONFIG } from "@/lib/vapid";

export const GET = async () => {
    if (!VAPID_CONFIG.publicKey) {
        return new NextResponse("VAPID public key not configured", { status: 500 });
    }

    return new NextResponse(VAPID_CONFIG.publicKey);
};

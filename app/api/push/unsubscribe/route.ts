import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { PushSubscription } from "@/lib/types";

const subscriptions: PushSubscription[] = [];

export const POST = withAuth(async (req: NextRequest) => {
    const subscription = await req.json();
    const index = subscriptions.findIndex((sub) => sub.endpoint === subscription.endpoint);

    if (index >= 0) {
        subscriptions.splice(index, 1);
        return NextResponse.json({ message: "Subscription removed" });
    }

    return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
});

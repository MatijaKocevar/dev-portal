import { NextResponse } from "next/server";
import { getBatteryData } from "./_data";
import { withAuth } from "@/lib/auth";

export const GET = withAuth(async () => {
    return NextResponse.json(getBatteryData());
});

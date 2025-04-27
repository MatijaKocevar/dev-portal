/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server";
import { BatteryDataPoint, getBatteryData } from "./_data";
import { withAuth } from "@/lib/auth";

/**
 * Get battery status data.
 * @auth: bearer
 * @response: BatteryDataPoint[]
 */
export const GET = withAuth(async () => {
    return NextResponse.json(getBatteryData());
});

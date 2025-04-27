/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server";
import { getPowerData, PowerDataPoint } from "./_data";
import { withAuth } from "@/lib/auth";

/**
 * Get power data.
 * @auth: bearer
 * @response: PowerDataPoint[]
 */
export const GET = withAuth(async () => {
    return NextResponse.json(getPowerData());
});

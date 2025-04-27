/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server";
import { getFrequencyData, FrequencyDataPoint } from "./_data";
import { withAuth } from "@/lib/auth";

/**
 * Get frequency data.
 * @auth: bearer
 * @response: FrequencyDataPoint[]
 */
export const GET = withAuth(async () => {
    return NextResponse.json(getFrequencyData());
});

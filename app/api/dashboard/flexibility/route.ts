/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server";
import { getFlexibilityData, FlexibilityDataPoint } from "./_data";
import { withAuth } from "@/lib/auth";

/**
 * Get flexibility data.
 * @auth: bearer
 * @response: FlexibilityDataPoint[]
 */
export const GET = withAuth(async () => {
    return NextResponse.json(getFlexibilityData());
});

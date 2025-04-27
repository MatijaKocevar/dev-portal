/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server";
import { Bid, getAcceptedBids } from "./_data";
import { withAuth } from "@/lib/auth";

/**
 * Get accepted bids data.
 * @auth: bearer
 * @response: Bid[]
 */
export const GET = withAuth(async () => {
    return NextResponse.json(getAcceptedBids());
});

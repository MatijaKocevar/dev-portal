/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { unitsData, Unit } from "../../../../data/units";
import { withAuth } from "../../../../lib/auth";

/**
 * Get all units.
 * @auth: bearer
 * @response: Unit[]
 */
export const GET = withAuth(async () => {
    return NextResponse.json(unitsData());
});

import { NextResponse } from "next/server";
import { unitsData } from "./_data";
import { withAuth } from "../../../../lib/auth";

export const GET = withAuth(async () => {
    return NextResponse.json(unitsData());
});

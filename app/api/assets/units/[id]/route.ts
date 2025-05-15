/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { unitsData, Unit } from "../../../../../data/units";
import { withAuth } from "../../../../../lib/auth";

type UnitParams = {
    id: string;
};

/**
 * Get unit by id.
 * @auth: bearer
 * @pathParams: UnitParams
 * @response: Unit[]
 */
export const GET = withAuth(async (req: Request) => {
    const id = req.url.split("/units/")[1];
    const unit = unitsData().find((unit: Unit) => unit.id === id);

    if (!unit) {
        return NextResponse.json({ error: "Unit not found" }, { status: 404 });
    }

    return NextResponse.json(unit);
});

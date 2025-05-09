/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { unitsData, Unit } from "../_data";

type UnitParams = {
    id: string;
};

/**
 * Get unit by id.
 * @auth: bearer
 * @params: UnitParams
 * @response: Unit[]
 */
export async function GET(
    request: Request,
    { params }: Readonly<{ params: Promise<{ id: string }> }>
) {
    const { id } = await params;
    const unit = unitsData().find((unit) => unit.id === id);

    if (!unit) {
        return NextResponse.json({ error: "Unit not found" }, { status: 404 });
    }

    return NextResponse.json(unit);
}

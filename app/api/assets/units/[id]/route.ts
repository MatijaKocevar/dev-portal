import { NextResponse } from "next/server";
import { unitsData } from "../_data";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const unit = unitsData().find((unit) => unit.id === params.id);

    if (!unit) {
        return NextResponse.json({ error: "Unit not found" }, { status: 404 });
    }

    return NextResponse.json(unit);
}

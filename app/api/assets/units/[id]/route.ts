import { NextResponse } from "next/server";
import { unitsData } from "../_data";

export async function GET(request: Request, { params }: Readonly<{ params: Promise<{ id: string }> }>) {
    const { id } = await params;
    const unit = unitsData().find((unit) => unit.id === id);

    if (!unit) {
        return NextResponse.json({ error: "Unit not found" }, { status: 404 });
    }

    return NextResponse.json(unit);
}

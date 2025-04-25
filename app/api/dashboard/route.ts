import { NextResponse } from "next/server";
import { getBatteryData } from "./battery-status/route";
import { getFlexibilityData } from "./flexibility/route";
import { getPowerData } from "./power/route";
import { getFrequencyData } from "./frequency/route";
import { getAcceptedBids } from "./accepted-bids/route";

export async function GET() {
    const dashboardData = {
        acceptedBids: getAcceptedBids(),
        batteryStatus: getBatteryData(),
        flexibility: getFlexibilityData(),
        power: getPowerData(),
        frequency: getFrequencyData(),
    };

    return NextResponse.json(dashboardData);
}

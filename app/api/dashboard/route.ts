import { NextResponse } from "next/server";
import { getBatteryData } from "./battery-status/_data";
import { getFlexibilityData } from "./flexibility/_data";
import { getPowerData } from "./power/_data";
import { getFrequencyData } from "./frequency/_data";
import { getAcceptedBids } from "./accepted-bids/_data";
import { withAuth } from "@/lib/auth";

export const GET = withAuth(async () => {
    const dashboardData = {
        acceptedBids: getAcceptedBids(),
        batteryStatus: getBatteryData(),
        flexibility: getFlexibilityData(),
        power: getPowerData(),
        frequency: getFrequencyData(),
    };

    return NextResponse.json(dashboardData);
});

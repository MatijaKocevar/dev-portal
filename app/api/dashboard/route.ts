/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server";
import { getBatteryData, BatteryDataPoint } from "./battery-status/_data";
import { getFlexibilityData, FlexibilityDataPoint } from "./flexibility/_data";
import { getPowerData, PowerDataPoint } from "./power/_data";
import { getFrequencyData, FrequencyDataPoint } from "./frequency/_data";
import { Bid, getAcceptedBids } from "./accepted-bids/_data";
import { withAuth } from "@/lib/auth";

type DashboardResponse = {
    acceptedBids: Bid[];
    batteryStatus: BatteryDataPoint[];
    flexibility: FlexibilityDataPoint[];
    power: PowerDataPoint[];
    frequency: FrequencyDataPoint[];
};

/**
 * Get all dashboard data.
 * @auth: bearer
 * @response: DashboardResponse
 */
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

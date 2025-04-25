/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get all dashboard data
 *     description: Returns a comprehensive set of data for the dashboard including accepted bids, battery status, flexibility, power, and frequency data
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Complete dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acceptedBids:
 *                   type: array
 *                   description: List of accepted bids
 *                   items:
 *                     $ref: '#/components/schemas/Bid'
 *                 batteryStatus:
 *                   type: array
 *                   description: Battery status data points
 *                   items:
 *                     $ref: '#/components/schemas/BatteryDataPoint'
 *                 flexibility:
 *                   type: array
 *                   description: Flexibility data points
 *                   items:
 *                     $ref: '#/components/schemas/FlexibilityDataPoint'
 *                 power:
 *                   type: array
 *                   description: Power data points
 *                   items:
 *                     $ref: '#/components/schemas/PowerDataPoint'
 *                 frequency:
 *                   type: array
 *                   description: Frequency data points
 *                   items:
 *                     $ref: '#/components/schemas/FrequencyDataPoint'
 */

import { NextResponse } from "next/server";
import { getBatteryData } from "./battery-status/_data";
import { getFlexibilityData } from "./flexibility/_data";
import { getPowerData } from "./power/_data";
import { getFrequencyData } from "./frequency/_data";
import { getAcceptedBids } from "./accepted-bids/_data";

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

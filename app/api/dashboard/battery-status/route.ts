/**
 * @swagger
 * /api/dashboard/battery-status:
 *   get:
 *     summary: Get battery status data
 *     description: Returns an array of battery data points containing time, state of charge (SOC), and power values
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Array of battery data points
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   time:
 *                     type: string
 *                     description: Time in HH:mm format
 *                     example: "13:45"
 *                   soc:
 *                     type: number
 *                     description: State of Charge percentage
 *                     minimum: 0
 *                     maximum: 100
 *                     example: 75.5
 *                   power:
 *                     type: number
 *                     description: Power value in watts
 *                     example: 500
 */

import { NextResponse } from "next/server";
import { getBatteryData } from "./_data";
import { withAuth } from "@/lib/auth";

export const GET = withAuth(async () => {
    return NextResponse.json(getBatteryData());
});

/**
 * @swagger
 * /api/dashboard/power:
 *   get:
 *     summary: Get power data
 *     description: Returns power data points containing grid, consumption, production, and baseline values over time
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Array of power data points
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
 *                   grid:
 *                     type: number
 *                     description: Grid power value
 *                     example: 250
 *                   consumption:
 *                     type: number
 *                     description: Power consumption value
 *                     example: 180
 *                   production:
 *                     type: number
 *                     description: Power production value
 *                     example: 120
 *                   baseline:
 *                     type: number
 *                     description: Baseline power value
 *                     example: 200
 */

import { NextResponse } from "next/server";
import { getPowerData } from "./_data";

export async function GET() {
    return NextResponse.json(getPowerData());
}

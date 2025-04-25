/**
 * @swagger
 * /api/dashboard/frequency:
 *   get:
 *     summary: Get grid frequency data
 *     description: Returns grid frequency data points in 15-minute intervals
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Array of frequency data points
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
 *                     example: "13:15"
 *                   frequency:
 *                     type: number
 *                     description: Grid frequency in Hz
 *                     example: 50.1
 */

import { NextResponse } from "next/server";
import { getFrequencyData } from "./_data";

export async function GET() {
    return NextResponse.json(getFrequencyData());
}

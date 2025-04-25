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

export type FrequencyDataPoint = {
    time: string;
    frequency: number;
};

export function getFrequencyData(): FrequencyDataPoint[] {
    return Array.from({ length: 24 * 4 }, (_, i) => {
        const hour = Math.floor(i / 4);
        const minute = (i % 4) * 15;
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

        const baseFrequency = 50;
        const variation = (Math.random() - 0.5) * 0.2;
        const frequency = baseFrequency + variation;

        return { time, frequency };
    });
}

export async function GET() {
    return NextResponse.json(getFrequencyData());
}

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

export interface BatteryDataPoint {
    time: string;
    soc: number;
    power: number;
}

interface WaveConfig {
    frequency: number;
    amplitude: number;
    offset: number;
}

const socWave: WaveConfig = {
    frequency: -1.2,
    amplitude: 10,
    offset: 77,
};

const powerWave: WaveConfig = {
    frequency: -1.8,
    amplitude: 700,
    offset: 476,
};

function calculatePowerValue(minuteFraction: number): number {
    const phase = Math.asin(powerWave.offset / powerWave.amplitude);
    return (
        Math.sin(minuteFraction * 2 * Math.PI * powerWave.frequency + phase) * powerWave.amplitude
    );
}

export function getBatteryData(): BatteryDataPoint[] {
    return Array.from({ length: 24 * 60 }, (_, index) => {
        const hour = Math.floor(index / 60);
        const minute = index % 60;
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

        const minuteFraction = index / (24 * 60);
        const socValue =
            Math.sin(minuteFraction * 2 * Math.PI * socWave.frequency) * socWave.amplitude +
            socWave.offset;

        return {
            time,
            soc: Math.min(100, Math.max(0, socValue)),
            power: calculatePowerValue(minuteFraction),
        };
    });
}

export async function GET() {
    return NextResponse.json(getBatteryData());
}

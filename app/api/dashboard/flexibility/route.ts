/**
 * @swagger
 * /api/dashboard/flexibility:
 *   get:
 *     summary: Get flexibility data
 *     description: Returns hourly flexibility data including estimated, offered, ordered, and supplied values for both up and down regulation
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Array of hourly flexibility data points
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   hour:
 *                     type: string
 *                     description: Hour in HH:00 format
 *                     example: "13:00"
 *                   estimatedUp:
 *                     type: number
 *                     description: Estimated upward flexibility
 *                     example: 85
 *                   offeredUp:
 *                     type: number
 *                     description: Offered upward flexibility
 *                     example: 75
 *                   orderedUp:
 *                     type: number
 *                     description: Ordered upward flexibility
 *                     example: 60
 *                   suppliedUp:
 *                     type: number
 *                     description: Supplied upward flexibility
 *                     example: 58
 *                   estimatedDown:
 *                     type: number
 *                     description: Estimated downward flexibility
 *                     example: -80
 *                   offeredDown:
 *                     type: number
 *                     description: Offered downward flexibility
 *                     example: -70
 *                   orderedDown:
 *                     type: number
 *                     description: Ordered downward flexibility
 *                     example: -50
 *                   suppliedDown:
 *                     type: number
 *                     description: Supplied downward flexibility
 *                     example: -48
 */

import { NextResponse } from "next/server";

export type FlexibilityDataPoint = {
    hour: string;
    estimatedUp: number;
    offeredUp: number;
    orderedUp: number;
    suppliedUp: number;
    estimatedDown: number;
    offeredDown: number;
    orderedDown: number;
    suppliedDown: number;
};

export function getFlexibilityData(): FlexibilityDataPoint[] {
    return Array.from({ length: 24 }, (_, i) => {
        const hour = `${i.toString().padStart(2, "0")}:00`;
        const randomPositive = () => Math.floor(Math.random() * 100);
        const randomNegative = () => -Math.floor(Math.random() * 100);

        return {
            hour,
            estimatedUp: randomPositive(),
            offeredUp: randomPositive(),
            orderedUp: randomPositive(),
            suppliedUp: randomPositive(),
            estimatedDown: randomNegative(),
            offeredDown: randomNegative(),
            orderedDown: randomNegative(),
            suppliedDown: randomNegative(),
        };
    });
}

export async function GET() {
    return NextResponse.json(getFlexibilityData());
}

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
import { getFlexibilityData } from "./_data";
import { withAuth } from "@/lib/auth";

export const GET = withAuth(async () => {
    return NextResponse.json(getFlexibilityData());
});

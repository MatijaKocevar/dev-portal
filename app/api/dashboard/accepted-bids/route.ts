/**
 * @swagger
 * /api/dashboard/accepted-bids:
 *   get:
 *     summary: Get accepted bids data
 *     description: Returns a list of accepted bids with product, volume, price, and delivery start time information
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: List of accepted bids
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   product:
 *                     type: string
 *                     description: The product type (FCR, aFRR Up, mFRR)
 *                     example: "FCR"
 *                   volume:
 *                     type: number
 *                     description: The volume of the bid
 *                     example: 10
 *                   price:
 *                     type: number
 *                     description: The price of the bid
 *                     example: 75.5
 *                   deliveryStart:
 *                     type: string
 *                     description: The delivery start time
 *                     example: "2:00:00 AM"
 */

import { NextResponse } from "next/server";
import { getAcceptedBids } from "./_data";
import { withAuth } from "@/lib/auth";

export const GET = withAuth(async () => {
    return NextResponse.json(getAcceptedBids());
});

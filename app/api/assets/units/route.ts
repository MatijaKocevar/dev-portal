import { NextResponse } from "next/server";
import { unitsData } from "./_data";
import { withAuth } from "../../../../lib/auth";
/**
 * @swagger
 * /api/assets/units:
 *   get:
 *     summary: Get units data
 *     description: Returns a list of units with their details
 *     tags:
 *       - Assets
 *     responses:
 *       200:
 *         description: List of units
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the unit
 *                     example: "unit-1"
 *                   name:
 *                     type: string
 *                     description: The name of the unit
 *                     example: "Unit 1"
 */
export const GET = withAuth(async () => {
    return NextResponse.json(unitsData());
});

import { NextResponse } from "next/server";

export type PowerDataPoint = {
    time: string;
    grid: number;
    consumption: number;
    production: number;
    baseline: number;
};

export function getPowerData(): PowerDataPoint[] {
    return Array.from({ length: 24 * 60 }, (_, index) => {
        const hour = Math.floor(index / 60);
        const minute = index % 60;
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

        const minuteFraction = index / (24 * 60);

        const gridFrequency = 1.3;
        const consumptionFrequency = 1.9;
        const productionFrequency = 2.5;

        const grid =
            288 *
            (Math.sin(minuteFraction * 2 * Math.PI * gridFrequency + Math.PI / 2) * 0.5 + 0.5);
        const consumption =
            225 *
            (Math.sin(minuteFraction * 2 * Math.PI * consumptionFrequency + Math.PI / 2) * 0.5 +
                0.5);
        const production =
            90 * Math.sin(minuteFraction * 2 * Math.PI * productionFrequency + (3 * Math.PI) / 2) +
            90;
        const baseline = grid;

        return {
            time,
            grid,
            consumption,
            production,
            baseline,
        };
    });
}

export async function GET() {
    return NextResponse.json(getPowerData());
}

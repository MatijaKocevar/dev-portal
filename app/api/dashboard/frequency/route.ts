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

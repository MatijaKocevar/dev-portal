export type PowerDataPoint = {
    time: string;
    grid: number;
    consumption: number;
    production: number;
    baseline: number;
};

export type PowerResponse = {
    current: PowerDataPoint[];
    forecast: PowerDataPoint[];
};

export function getPowerData(): PowerResponse {
    const now = new Date();
    const isProd = process.env.NODE_ENV === "production";
    const currentHour = isProd ? (now.getHours() + 22) % 24 : now.getHours();
    const currentMinute = Math.floor(now.getMinutes() / 15) * 15;

    console.log("Current date object:", now);
    console.log("Timezone offset in minutes:", now.getTimezoneOffset());
    console.log("ISO string:", now.toISOString());
    console.log("Local string:", now.toString());
    console.log("Current hour:", currentHour);
    console.log("Rounded current minute:", currentMinute);

    const allData = Array.from({ length: 24 * 60 }, (_, index) => {
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

    const current = allData.filter((point) => {
        const [hours, minutes] = point.time.split(":").map(Number);
        return hours < currentHour || (hours === currentHour && minutes <= currentMinute);
    });

    const forecast = allData.filter((point) => {
        const [hours, minutes] = point.time.split(":").map(Number);
        return hours > currentHour || (hours === currentHour && minutes > currentMinute);
    });

    return {
        current,
        forecast,
    };
}

export interface FlexibilityDataPoint {
    hour: string;
    estimatedUp: number;
    offeredUp: number;
    orderedUp: number;
    suppliedUp: number;
    estimatedDown: number;
    offeredDown: number;
    orderedDown: number;
    suppliedDown: number;
}

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

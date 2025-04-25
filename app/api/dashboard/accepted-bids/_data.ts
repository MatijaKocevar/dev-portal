export interface Bid {
    product: string;
    volume: number;
    price: number;
    deliveryStart: string;
}

export function getAcceptedBids(): Bid[] {
    return [
        {
            product: "FCR",
            volume: 10,
            price: 75.5,
            deliveryStart: "2:00:00 AM",
        },
        {
            product: "aFRR Up",
            volume: 15,
            price: 82.3,
            deliveryStart: "3:00:00 AM",
        },
        {
            product: "mFRR",
            volume: 20,
            price: 68.9,
            deliveryStart: "4:00:00 AM",
        },
    ];
}

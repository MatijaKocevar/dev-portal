"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/lib/api-client";

type DashboardData = {
    acceptedBids: Array<{
        product: string;
        volume: number;
        price: number;
        deliveryStart: string;
    }>;
    batteryStatus: Array<{
        time: string;
        soc: number;
        power: number;
    }>;
    flexibility: Array<{
        hour: string;
        estimatedUp: number;
        offeredUp: number;
        orderedUp: number;
        suppliedUp: number;
        estimatedDown: number;
        offeredDown: number;
        orderedDown: number;
        suppliedDown: number;
    }>;
    power: Array<{
        time: string;
        grid: number;
        consumption: number;
        production: number;
        baseline: number;
    }>;
    frequency: Array<{
        time: string;
        frequency: number;
    }>;
};

export default function Page() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await apiClient("/api/dashboard");
                if (!response) return;
                const json = await response.json();
                setData(json);
            } catch {
                setError("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div className="flex flex-1 items-center justify-center">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <Card>
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{error}</p>
                        <Button onClick={() => window.location.reload()} className="mt-4">
                            Retry
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="flex flex-1">
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Latest Battery Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {data.batteryStatus.slice(-1)[0]?.soc.toFixed(1)}% SOC
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Latest Grid Frequency</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {data.frequency.slice(-1)[0]?.frequency.toFixed(2)} Hz
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Latest Power</CardTitle>
                        </CardHeader>
                        <CardContent>{data.power.slice(-1)[0]?.grid.toFixed(0)} W</CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Accepted Bids</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-4 gap-4 font-medium">
                            <div>Product</div>
                            <div>Volume</div>
                            <div>Price</div>
                            <div>Delivery Start</div>
                            {data.acceptedBids.map((bid, i) => (
                                <div key={i} className="contents">
                                    <div>{bid.product}</div>
                                    <div>{bid.volume}</div>
                                    <div>{bid.price}</div>
                                    <div>{bid.deliveryStart}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

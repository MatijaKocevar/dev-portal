"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/auth-store";

type ApiStatus = {
    status: "pending" | "healthy" | "unhealthy" | "error";
    lastChecked: string | null;
};

type ApiStatuses = {
    [key: string]: ApiStatus;
};

type Endpoint = {
    name: string;
    healthUrl?: string;
    serverUrl?: string;
};

export default function Page() {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [timeInfo, setTimeInfo] = useState({
        currentTime: new Date(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        offset: -(new Date().getTimezoneOffset() / 60),
        region: Intl.DateTimeFormat().resolvedOptions().locale,
        isProduction: process.env.NODE_ENV === "production",
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeInfo((prev) => ({
                ...prev,
                currentTime: new Date(),
            }));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const [apiStatuses, setApiStatuses] = useState<ApiStatuses>({
        FRONTEND: { status: "pending", lastChecked: null },
        BACKEND: { status: "pending", lastChecked: null },
        KEYCLOAK: { status: "pending", lastChecked: null },
        AGENT: { status: "pending", lastChecked: null },
    });

    const [endpoints] = useState<Endpoint[]>([
        { name: "FRONTEND", serverUrl: process.env.NEXT_PUBLIC_SERVICE_FRONTEND_URL },
        { name: "BACKEND", healthUrl: process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL },
        { name: "KEYCLOAK", healthUrl: process.env.NEXT_PUBLIC_SERVICE_KEYCLOAK_URL },
        { name: "AGENT", healthUrl: process.env.NEXT_PUBLIC_SERVICE_AGENT_URL },
    ]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    const pingServer = async (url: string): Promise<boolean> => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            const response = await fetch(url, {
                method: "HEAD",
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            return response.ok;
        } catch {
            return false;
        }
    };

    useEffect(() => {
        const checkAllApis = async () => {
            const results = await Promise.all(
                endpoints.map(async (endpoint) => {
                    try {
                        if (endpoint.healthUrl) {
                            const response = await fetch(endpoint.healthUrl);
                            return {
                                name: endpoint.name,
                                status: response.ok ? "healthy" : "unhealthy",
                                lastChecked: new Date().toLocaleTimeString(),
                            };
                        } else if (endpoint.serverUrl) {
                            const isServerUp = await pingServer(endpoint.serverUrl);
                            return {
                                name: endpoint.name,
                                status: isServerUp ? "healthy" : "error",
                                lastChecked: new Date().toLocaleTimeString(),
                            };
                        }

                        return {
                            name: endpoint.name,
                            status: "error",
                            lastChecked: new Date().toLocaleTimeString(),
                        };
                    } catch {
                        if (endpoint.serverUrl) {
                            const isServerUp = await pingServer(endpoint.serverUrl);
                            return {
                                name: endpoint.name,
                                status: isServerUp ? "healthy" : "error",
                                lastChecked: new Date().toLocaleTimeString(),
                            };
                        }
                        return {
                            name: endpoint.name,
                            status: "error",
                            lastChecked: new Date().toLocaleTimeString(),
                        };
                    }
                })
            );

            const updatedStatuses: ApiStatuses = {};
            results.forEach((result) => {
                updatedStatuses[result.name] = {
                    status: result.status as ApiStatus["status"],
                    lastChecked: result.lastChecked,
                };
            });

            setApiStatuses((prev) => ({ ...prev, ...updatedStatuses }));
        };

        checkAllApis();

        const intervalId = setInterval(checkAllApis, 30000);

        return () => clearInterval(intervalId);
    }, [endpoints]);

    if (!isAuthenticated) {
        return null;
    }

    const getStatusColor = (status: ApiStatus["status"]) => {
        switch (status) {
            case "healthy":
                return "bg-green-500";
            case "unhealthy":
                return "bg-red-500";
            case "error":
                return "bg-yellow-500";
            default:
                return "bg-gray-300";
        }
    };

    const handleCheckNow = async (apiName: string) => {
        setApiStatuses((prev) => ({
            ...prev,
            [apiName]: { ...prev[apiName], status: "pending" },
        }));

        const endpoint = endpoints.find((ep) => ep.name === apiName);

        if (!endpoint) {
            return;
        }

        try {
            if (endpoint.healthUrl) {
                const response = await fetch(endpoint.healthUrl);
                setApiStatuses((prev) => ({
                    ...prev,
                    [apiName]: {
                        status: response.ok ? "healthy" : "unhealthy",
                        lastChecked: new Date().toLocaleTimeString(),
                    },
                }));
            } else if (endpoint.serverUrl) {
                const isServerUp = await pingServer(endpoint.serverUrl);
                setApiStatuses((prev) => ({
                    ...prev,
                    [apiName]: {
                        status: isServerUp ? "healthy" : "error",
                        lastChecked: new Date().toLocaleTimeString(),
                    },
                }));
            } else {
                setApiStatuses((prev) => ({
                    ...prev,
                    [apiName]: {
                        status: "error",
                        lastChecked: new Date().toLocaleTimeString(),
                    },
                }));
            }
        } catch {
            if (endpoint.serverUrl) {
                const isServerUp = await pingServer(endpoint.serverUrl);
                setApiStatuses((prev) => ({
                    ...prev,
                    [apiName]: {
                        status: isServerUp ? "healthy" : "error",
                        lastChecked: new Date().toLocaleTimeString(),
                    },
                }));
            } else {
                setApiStatuses((prev) => ({
                    ...prev,
                    [apiName]: {
                        status: "error",
                        lastChecked: new Date().toLocaleTimeString(),
                    },
                }));
            }
        }
    };

    return (
        <div className="flex flex-1">
            <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">System Status</h2>
                </div>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>Time Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2">
                            <p>
                                <strong>Current Time:</strong>{" "}
                                {timeInfo.currentTime.toLocaleString()}
                            </p>
                            <p>
                                <strong>ISO String:</strong> {timeInfo.currentTime.toISOString()}
                            </p>
                            <p>
                                <strong>Timezone:</strong> {timeInfo.timezone}
                            </p>
                            <p>
                                <strong>UTC Offset:</strong> UTC{timeInfo.offset >= 0 ? "+" : ""}
                                {timeInfo.offset}:00
                            </p>
                            <p>
                                <strong>Region:</strong> {timeInfo.region}
                            </p>
                            <p>
                                <strong>Environment:</strong>{" "}
                                {timeInfo.isProduction ? "Production" : "Development"}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(apiStatuses).map(([apiName, data]) => {
                        const endpoint = endpoints.find((ep) => ep.name === apiName);
                        const endpointUrl = endpoint?.healthUrl || endpoint?.serverUrl;

                        return (
                            <Card key={apiName}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <div
                                            className={`h-3 w-3 rounded-full ${getStatusColor(
                                                data.status
                                            )}`}
                                        ></div>
                                        {apiName.charAt(0).toUpperCase() + apiName.slice(1)} Service
                                    </CardTitle>
                                    <CardDescription>
                                        Status: {data.status.toUpperCase()}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="min-h-[60px]">
                                    <p>Endpoint: {endpointUrl}</p>
                                    {data.status === "pending" ? (
                                        <Skeleton className="h-5 w-[180px] mt-1" />
                                    ) : (
                                        <p>
                                            {data.lastChecked
                                                ? `Last checked: ${data.lastChecked}`
                                                : "\u00A0"}
                                        </p>
                                    )}
                                </CardContent>
                                <CardFooter>
                                    <Button size="sm" onClick={() => handleCheckNow(apiName)}>
                                        Check Now
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

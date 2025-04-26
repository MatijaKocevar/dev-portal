"use client";

import { useEffect } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/auth-store";

export default function Page() {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex flex-1">
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Component Test Dashboard</h2>
                    <Button>Test Button</Button>
                </div>

                <Separator className="my-4" />

                <Tabs defaultValue="card" className="w-full">
                    <TabsList>
                        <TabsTrigger value="card">Card Test</TabsTrigger>
                        <TabsTrigger value="buttons">Button Test</TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Card Component Test</CardTitle>
                                <CardDescription>
                                    Testing if shadcn components are working properly
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    This is a test of the shadcn card component. If you can see this
                                    with proper styling, the components are working!
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Cancel</Button>
                                <Button>Submit</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="buttons" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Button Variants Test</CardTitle>
                                <CardDescription>Testing different button styles</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-4">
                                <Button variant="default">Default</Button>
                                <Button variant="destructive">Destructive</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="link">Link</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

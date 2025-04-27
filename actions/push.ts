"use server";

import { prisma } from "@/lib/prisma";
import { PushSubscription } from "@/lib/generated/prisma/index";

export async function savePushSubscription(subscription: {
    endpoint: string;
    p256dh: string;
    auth: string;
    userId: string;
}) {
    return prisma.pushSubscription.upsert({
        where: { endpoint: subscription.endpoint },
        update: {
            p256dh: subscription.p256dh,
            auth: subscription.auth,
            userId: subscription.userId,
        },
        create: subscription,
    });
}

export async function deletePushSubscription(endpoint: string) {
    return prisma.pushSubscription.delete({
        where: { endpoint },
    });
}

export async function getAllSubscriptions() {
    return prisma.pushSubscription.findMany();
}

export async function sendPushNotification(title: string, body: string) {
    const subscriptions = await getAllSubscriptions();
    const webpush = require("web-push");
    const { VAPID_CONFIG } = require("@/lib/vapid");

    webpush.setVapidDetails(VAPID_CONFIG.subject, VAPID_CONFIG.publicKey, VAPID_CONFIG.privateKey);

    const payload = JSON.stringify({
        notification: {
            title,
            body,
        },
    });

    const notifications = subscriptions.map((subscription: PushSubscription) =>
        webpush.sendNotification(
            {
                endpoint: subscription.endpoint,
                keys: {
                    p256dh: subscription.p256dh,
                    auth: subscription.auth,
                },
            },
            payload
        )
    );

    await Promise.all(notifications);
}

export async function sendTestNotification(
    subscription: {
        endpoint: string;
        p256dh: string;
        auth: string;
    },
    title: string,
    body: string,
    url?: string
) {
    const webpush = require("web-push");
    const { VAPID_CONFIG } = require("@/lib/vapid");

    webpush.setVapidDetails(VAPID_CONFIG.subject, VAPID_CONFIG.publicKey, VAPID_CONFIG.privateKey);

    const payload = JSON.stringify({
        notification: {
            title,
            body,
            data: { url },
        },
    });

    await webpush.sendNotification(
        {
            endpoint: subscription.endpoint,
            keys: {
                p256dh: subscription.p256dh,
                auth: subscription.auth,
            },
        },
        payload
    );
}

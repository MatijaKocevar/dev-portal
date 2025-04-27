export interface PushSubscription {
    id?: number;
    endpoint: string;
    p256dh: string;
    auth: string;
    userId: string;
}

export interface PushMessage {
    title: string;
    body: string;
    icon?: string;
    data?: any;
}

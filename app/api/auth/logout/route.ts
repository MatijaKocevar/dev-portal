/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";

type LogoutResponse = {
    success: boolean;
};

/**
 * Logout user.
 * @response: LogoutResponse
 */
export async function POST() {
    const response = NextResponse.json({ success: true });

    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");

    return response;
}

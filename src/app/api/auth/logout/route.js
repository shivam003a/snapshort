import { NextResponse } from "next/server";

export async function POST(req) {
    const response = NextResponse.json({
        success: true,
        data: null,
        message: "logout successful"
    });

    response.cookies.set("auth_token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
    })

    return response;
}
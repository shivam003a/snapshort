import { connectToDB } from "@/config/db";
import { verifyJWT } from "@/helpers/jwt";
import Url from "@/models/urlSchema";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(req) {
    const token = req.cookies.get('auth_token')?.value

    if (!token) {
        return NextResponse.json({
            success: false,
            data: null,
            message: "unauthorized"
        }, { status: 401 })
    }

    
    try {
        const user = verifyJWT(token, process.env.JWT_SECRET)
        
        const { originalUrl } = await req.json()
        if (!originalUrl) {
            return NextResponse.json({
                success: false,
                data: null,
                message: "original url is required"
            }, { status: 400 });
        }
        
        const shortId = nanoid(8)
        
        await connectToDB();
        try {
            const shortendedUrl = await Url.create({
                shortId,
                originalUrl,
                userId: user?.id,
                clickCount: 0,
                clicks: []
            })

            return NextResponse.json({
                success: true,
                shortUrl: `${process.env.BASE_URL}/${shortId}`,
                message: "url shortened successfully",
            }, { status: 201 })

        } catch (e) {
            return NextResponse.json({
                success: false,
                data: null,
                message: "error shortening url"
            }, { status: 500 });
        }

    } catch (e) {
        return NextResponse.json({
            success: false,
            message: 'invalid token'
        }, { status: 401 });
    }
}
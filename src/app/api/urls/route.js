import { connectToDB } from "@/config/db";
import { verifyJWT } from "@/helpers/jwt";
import Url from "@/models/urlSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
    const token = req.cookies.get('auth_token')?.value

    if (!token) {
        return NextResponse.json({
            success: false,
            data: null,
            message: "unauthorized"
        }, { status: 401 })
    }

    await connectToDB()

    try {
        const user = verifyJWT(token, process.env.JWT_SECRET)

        const allUrlByUserId = await Url.find({ userId: user?.id }).select(' -clicks.ip')
        if (!allUrlByUserId?.length) {
            return NextResponse.json({
                success: false,
                data: null,
                message: "no url available"
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            data: allUrlByUserId,
            message: "all url fetched successfully",
        }, { status: 200 })

    } catch (e) {
        return NextResponse.json({
            success: false,
            message: 'Invalid token'
        }, { status: 401 });
    }
}
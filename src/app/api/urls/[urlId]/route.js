import { connectToDB } from "@/config/db";
import { verifyJWT } from "@/helpers/jwt";
import Url from "@/models/urlSchema";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
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

        const { urlId } = await params
        const urlByUserId = await Url.findOne({
            _id: urlId,
            userId: user?.id
        })
        if (!urlByUserId) {
            return NextResponse.json({
                success: false,
                data: null,
                message: "url not found"
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            data: urlByUserId,
            message: "all url fetched successfully",
        }, { status: 200 })

    } catch (e) {
        console.log(e)
        return NextResponse.json({
            success: false,
            message: 'Invalid token'
        }, { status: 401 });
    }
}
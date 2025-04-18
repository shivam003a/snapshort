import { connectToDB } from "@/config/db";
import { verifyJWT } from "@/helpers/jwt";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) {
        return NextResponse.json({
            success: false,
            data: null,
            message: 'no token found'
        }, { status: 401 })
    }

    await connectToDB();
    try {
        const decoded = verifyJWT(token)
        const user = await User.findById(decoded?.id).lean()

        if (!user) {
            return NextResponse.json({
                success: false,
                data: null,
                message: 'user not found'
            }, { status: 404 })
        }

        delete user.password
        return NextResponse.json({
            success: true,
            data: user,
            message: "logged in"
        }, { status: 200 })

    } catch (e) {
        return NextResponse.json({
            success: false,
            message: 'invalid token'
        }, { status: 401 });
    }

}
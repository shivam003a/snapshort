import { connectToDB } from "@/config/db";
import { comparePassword } from "@/helpers/hash";
import { signJWT } from "@/helpers/jwt";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDB();

    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                data: null,
                message: "all fields are required",
            }, { status: 400 });
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return NextResponse.json({
                success: false,
                data: null,
                message: "user not found",
            }, { status: 404 });
        }

        const isPasswordCorrect = await comparePassword(password, userExist?.password)
        if (!isPasswordCorrect) {
            return NextResponse.json({
                success: false,
                message: "invalid credentials",
            }, { status: 401 });
        }

        const token = signJWT({
            id: userExist?._id,
            email: userExist?.email
        })

        const userObj = userExist?.toObject();
        delete userObj.password

        const response = NextResponse.json({
            success: true,
            data: userObj,
            token: token,
            message: "login successful"
        }, { status: 200 })

        response.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60
        })

        return response;
    } catch (e) {
        console.log("Login Error", e?.message)
        return NextResponse.json({
            success: false,
            data: null,
            message: e?.message || "internal server error"
        }, { status: 500 })
    }
}
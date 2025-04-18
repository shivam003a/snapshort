import { connectToDB } from "@/config/db";
import { hashPassword } from "@/helpers/hash";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";
import { signJWT } from "@/helpers/jwt";

export async function POST(req) {
    await connectToDB();

    try {
        const { name, email, password } = await req.json()

        if (!name || !email || !password) {
            return NextResponse.json({
                success: false,
                data: null,
                message: "all fields are required"
            }, { status: 403 })
        }

        const doesUserExist = await User.findOne({ email })
        if (doesUserExist) {
            return NextResponse.json({
                success: false,
                data: null,
                message: "email already registered"
            }, { status: 409 })
        }

        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = signJWT({
            id: user?._id,
            email: user?.email
        })

        const userObj = user.toObject();
        delete userObj.password

        const response = NextResponse.json({
            success: true,
            data: userObj,
            message: 'user registered'
        }, { status: 201 })

        response.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60
        })

        return response;
    } catch (e) {
        console.log("SignUp Error", e?.message)
        return NextResponse.json({
            success: false,
            data: null,
            message: e?.message || "internal server error"
        }, { status: 500 })
    }
}
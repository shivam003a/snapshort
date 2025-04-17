import { NextResponse } from "next/server";

const protectedRoutes = ['/api/shorten', '/api/urls']

export async function middleware(req){
    const { pathname } = req.nextUrl;

    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))
    if(!isProtected){
        return NextResponse.next()
    }

    const cookie = req.cookies.get('auth_token')
    if(!cookie){
        return NextResponse.json({
            success: false,
            data: null,
            message: "unauthorized"
        }, { status: 401 })
    }

    return NextResponse.next()
}
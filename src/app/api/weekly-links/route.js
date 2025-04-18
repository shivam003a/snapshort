import { connectToDB } from "@/config/db";
import Url from "@/models/urlSchema";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDB();

    const startOfWeek = moment().startOf('isoWeek')
    const endOfWeek = moment().endOf('isoWeek')

    try {
        const count = await Url.countDocuments({
            createdAt: { $gte: startOfWeek, $lte: endOfWeek }
        })

        return NextResponse.json({
            success: true,
            data: count,
            message: "fetched"
        }, { status: 200 })
    } catch (e) {
        return NextResponse.json({
            success: false,
            data: null,
            message: "intern server error"
        }, { status: 500 })
    }
}
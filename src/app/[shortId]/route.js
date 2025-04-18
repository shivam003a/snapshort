import { connectToDB } from "@/config/db"
import Url from "@/models/urlSchema";
import { headers } from "next/headers"
import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import { html } from "@/helpers/invalidLinkHtml";

export async function GET(req, { params }) {
    await connectToDB()

    try {
        const { shortId } = await params;

        const headersList = await headers()
        const userAgentString = headersList.get('user-agent')
        const ip = headersList.get("x-forwarded-for") || "unknown";

        const parser = new UAParser(userAgentString)
        const result = parser.getResult();

        const device = result.device.type || "Desktop";
        const browser = result.browser.name || "Unknown";
        const os = result.os.name || "Unknown";

        const urlDoc = await Url.findOne({ shortId });
        // if (!urlDoc) {
        //     return NextResponse.json({
        //         success: false,
        //         message: "url not found"
        //     }, { status: 404 });
        // }

        if (!urlDoc) {
            return new NextResponse(html, {
                status: 404,
                headers: {
                    'Content-Type': 'text/html',
                },
            });
        }

        urlDoc.clickCount += 1;
        urlDoc.clicks.push({
            uAgent: userAgentString,
            ip,
            device,
            browser,
            os,
        });

        await urlDoc.save();
        return NextResponse.redirect(urlDoc.originalUrl);

    } catch (e) {
        return NextResponse.json({
            success: false,
            data: null,
            message: 'internal server error'
        }, { status: 401 })
    }
}
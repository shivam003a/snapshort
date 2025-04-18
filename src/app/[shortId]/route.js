import { connectToDB } from "@/config/db"
import Url from "@/models/urlSchema";
import { headers } from "next/headers"
import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import { html } from "@/helpers/invalidLinkHtml";

export async function GET(req, { params }) {
    const isRSC = req.nextUrl.searchParams.has('_rsc') || req.headers.get('user-agent')?.includes('ReactServer');
    if (isRSC) {
        return new NextResponse(null, {
            status: 204
        })
    }

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
        }, { status: 500 })
    }
}
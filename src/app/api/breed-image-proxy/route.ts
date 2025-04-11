import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG, ERROR_MESSAGES } from "@/config";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
        return NextResponse.json({ error: ERROR_MESSAGES.IMG_URL_MISSING }, { status: 400 });
    }

    try {
        const imageResponse = await fetch(imageUrl, {
            headers: { "User-Agent": "Next.js Image Proxy" },
        });

        if (!imageResponse.ok) {
            return NextResponse.json({ error: ERROR_MESSAGES.IMG_FETCH_FAILED }, { status: imageResponse.status });
        }

        const imageBuffer = await imageResponse.arrayBuffer();

        return new NextResponse(imageBuffer, {
            headers: {
                "Content-Type": imageResponse.headers.get("Content-Type") || "image/jpeg",
                "Cache-Control": `public, s-maxage=${API_CONFIG.REVALIDATE_TIME}, stale-while-revalidate=${API_CONFIG.STALE_WHILE_REVALIDATE_TIME}`,
            },
        });

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }

}
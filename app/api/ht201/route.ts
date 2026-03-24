import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    const language = req.nextUrl.searchParams.get('language') || 'de';
    return NextResponse.json(await fetch(process.env.API_URL + "ht201/-1?language=" + language, {
        next: { revalidate: 60 * 60 },
    }).then((response) => response.json()));
}
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json(await fetch(process.env.API_URL + "pdf-links", {
        next: { revalidate: 60 * 60 },
    }).then((response) => response.json()));
}
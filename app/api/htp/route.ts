import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json(await fetch(process.env.API_URL + "htp/-1", {
        next: { revalidate: 60 * 60 * 4 },
    }).then((response) => response.json()));
}
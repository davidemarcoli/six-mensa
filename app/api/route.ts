import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json(await fetch("https://server.davidemarcoli.dev/six-mensa/-1", {
        next: { revalidate: 60 * 60 * 4 },   
    }).then((response) => response.json()));
}

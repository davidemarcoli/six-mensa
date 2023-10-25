import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json(await fetch(process.env.API_URL + "ht201/-1").then((response) => response.json()));
}
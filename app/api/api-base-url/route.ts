import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    return NextResponse.json({url: process.env.API_URL});
}
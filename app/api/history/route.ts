import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    const restaurant = req.nextUrl.searchParams.get('restaurant') || '';
    const from = req.nextUrl.searchParams.get('from') || '';
    const to = req.nextUrl.searchParams.get('to') || '';

    const params = new URLSearchParams();
    if (from) params.set('from', from);
    if (to) params.set('to', to);

    const path = restaurant ? `history/${restaurant}` : 'history';
    const queryString = params.toString() ? `?${params.toString()}` : '';

    const response = await fetch(`${process.env.API_URL}${path}${queryString}`, {
        next: { revalidate: 60 * 60 },
    });

    return NextResponse.json(await response.json());
}

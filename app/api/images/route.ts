import { writeFileSync } from 'fs';
import {NextRequest, NextResponse} from 'next/server';

export interface Image {
    link: string;
}

export async function GET(req: NextRequest) {
    const menues = JSON.parse(req.nextUrl.searchParams.get('menues') || '{}');

    const data = await fetchImagesForMenues(menues)

    return NextResponse.json(data);
}

async function fetchImagesForMenues(menues: any[]): Promise<{[title: string]: Image} | undefined> {
    const url = process.env.API_URL + "images/by-titles";

    try {
        const response = await fetch(url, {
            body: JSON.stringify({
                titles: menues.map((menu) => menu.title)
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            // cache: "force-cache",
        });
        if (!response.body) {
            return {};
        }
        
        const data = await response.json();

        
        const images_results: {[title: string]: Image} = Object.entries(data).sort((a, b) => {
            const aTitle = a[0].toLowerCase();
            const bTitle = b[0].toLowerCase();
            return menues.findIndex((menu) => menu.title.toLowerCase() === aTitle) - menues.findIndex((menu) => menu.title.toLowerCase() === bTitle);
        }).map(([title, image]) => {
            const anyImage = image as any;
            return {
                [title]: process.env.API_URL + anyImage.url.replace(/^\//, ""),
            }
        }).reduce((acc, curr) => {
            const key = Object.keys(curr)[0];
            const value = curr[key];
            acc[key] = value;
            return acc;
        }, {});

        return images_results;
    } catch (error) {
        console.error("Error fetching images:", error);
        return {};
    }
}
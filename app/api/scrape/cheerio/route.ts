import { writeFileSync } from 'fs';
import {NextRequest, NextResponse} from 'next/server';

const unirest = require("unirest");
const cheerio = require("cheerio");

export interface Image {
    link: string;
}

export async function GET(req: NextRequest) {
    const menues = JSON.parse(req.nextUrl.searchParams.get('menues') || '{}');

    const data = await Promise.all(menues.map((menu: any) =>
        fetchImageForObjectProperty(menu.title + " " + menu.description)
    ));

    return NextResponse.json(data);
}

async function fetchImageForObjectProperty(searchTerm: string): Promise<Image | undefined> {
    searchTerm = encodeURIComponent(searchTerm);
    const user_agent = selectRandom();
    const header = {
        "User-Agent": user_agent,
    };

    const url = `https://www.bing.com/images/search?q=${searchTerm}`;

    try {
        const response = await unirest.get(url).headers(header);
        if (!response.body) {
            return undefined;
        }
        const $ = cheerio.load(response.body);
        const images_results: Image[] = [];

        $(".mimg").each((i: number, el: Element) => {
            const source = $(el).attr("src");
            if (!source) return;
            images_results.push({
                link: $(el).attr("src").split("?")[0],
            });
        });

        return getHttpsImage(images_results);

    } catch (error) {
        console.error("Error fetching images:", error);
        return undefined;
    }
}

const getHttpsImage = (images: Image[]) => {
    return images.filter((image) => image.link)[0];
}

function selectRandom(): string {
    const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
    ];
    const randomNumber = Math.floor(Math.random() * userAgents.length);
    return userAgents[randomNumber];
}

import {NextRequest, NextResponse} from 'next/server';

const unirest = require("unirest");
const cheerio = require("cheerio");

export interface Image {
    title: string;
    source: string;
    link: string;
    original: string;
    thumbnail: string;
}

export async function GET(req: NextRequest) {
    const object = JSON.parse(req.nextUrl.searchParams.get('object') || '{}');

    const data = await Promise.all(Object.keys(object).map(async (key) => {
        if (key === 'day') return undefined;
        const menu = object[key];
        return await fetchImageForObjectProperty(menu.title + " " + menu.description);
    }));

    const imageObject: any = {};
    Object.keys(object).forEach((key, index) => {
        imageObject[key] = data[index];
    });

    return NextResponse.json(imageObject);
}

async function fetchImageForObjectProperty(searchTerm: string): Promise<Image | undefined> {
    searchTerm = encodeURIComponent(searchTerm);
    const user_agent = selectRandom();
    const header = {
        "User-Agent": user_agent,
    };

    const url = `https://www.google.com/search?q=${searchTerm}&oq=${searchTerm}&hl=en&tbm=isch&asearch=ichunk&async=_id:rg_s,_pms:s,_fmt:pc&sourceid=chrome&ie=UTF-8`;

    try {
        const response = await unirest.get(url).headers(header);
        const $ = cheerio.load(response.body);
        const images_results: Image[] = [];

        $("div.rg_bx").each((i: number, el: Element) => {
            const json_string = $(el).find(".rg_meta").text();
            images_results.push({
                title: $(el).find(".iKjWAf .mVDMnf").text(),
                source: $(el).find(".iKjWAf .FnqxG").text(),
                link: JSON.parse(json_string).ru,
                original: JSON.parse(json_string).ou,
                thumbnail: $(el).find(".rg_l img").attr("src") || $(el).find(".rg_l img").attr("data-src"),
            });
        });

        return getHttpsImage(images_results);

    } catch (error) {
        console.error("Error fetching images:", error);
        return undefined;
    }
}

const isValidImage = (url: string) => {
    return /^https:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
const getHttpsImage = (images: Image[]) => {
    return images.filter((image) => isValidImage(image.original))[0];
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

const unirest = require("unirest");
const cheerio = require("cheerio");
import {NextRequest, NextResponse} from 'next/server';

export interface Image {
    title: string;
    source: string;
    link: string;
    original: string;
    thumbnail: string;
}

export async function POST(req: NextRequest) {
    // const response = await fetch('https://www.google.com/search?q=rinds-sauerbraten+aus+dem+ofen+kartoffelgratin+wirsing&tbm=isch');
    // const html = await response.text();
    //
    // const $ = cheerio.load(html);
    // let imageUrls = $('img').map((index, element) => $(element).attr('src'));
    //
    // imageUrls = imageUrls.filter((index, value) => !value.includes('/images/branding'));
    // imageUrls.map((i, el) => {
    //     console.log(el);
    // })
    //
    // const images = await Promise.all(
    //     imageUrls.map(async (index, url) => {
    //         const response = await fetch(url);
    //         const buffer = await response.arrayBuffer();
    //         return buffer.toString();
    //     })
    // );
    //
    // NextResponse.json({ images });

    // rinds-sauerbraten+aus+dem+ofen+kartoffelgratin+wirsing

    const searchTerm = encodeURIComponent((await req.json()).searchTerm);

    const selectRandom = () => {
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
    };
    let user_agent = selectRandom();
    let header = {
        "User-Agent": `${user_agent}`,
    };

    const url =  `https://www.google.com/search?q=${searchTerm}&oq=${searchTerm}&hl=en&tbm=isch&asearch=ichunk&async=_id:rg_s,_pms:s,_fmt:pc&sourceid=chrome&ie=UTF-8`;

    return await unirest
        .get(url)
        .headers(header)
        .then((response: any) => {
            let $ = cheerio.load(response.body);

            let images_results: any[] = [];
            $("div.rg_bx").each((i: number, el: Element) => {
                let json_string = $(el).find(".rg_meta").text();
                images_results.push({
                    title: $(el).find(".iKjWAf .mVDMnf").text(),
                    source: $(el).find(".iKjWAf .FnqxG").text(),
                    link: JSON.parse(json_string).ru,
                    original: JSON.parse(json_string).ou,
                    thumbnail: $(el).find(".rg_l img").attr("src") ? $(el).find(".rg_l img").attr("src") : $(el).find(".rg_l img").attr("data-src"),
                });
            });

            return NextResponse.json(images_results);
        });
}
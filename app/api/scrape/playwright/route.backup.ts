import {chromium} from "playwright";
import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest) {
    const browser = await chromium.launch({headless: true})
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://www.google.com/search?q=rinds-sauerbraten+aus+dem+ofen+kartoffelgratin+wirsing&tbm=isch');
    const images = await page.$$eval('img.rg_i Q4LuWd', (allImages: any[]) => {
        const data: any[] = []
        allImages.forEach(image => {
            const url = image.getAttribute('src')
            data.push({url})
        });
        return data
    })

    return NextResponse.json(images);
}
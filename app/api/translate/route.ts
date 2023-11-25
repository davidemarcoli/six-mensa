import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const object = JSON.parse(url.searchParams.get('object') || '{}');
    const translationEngine = url.searchParams.get('translationEngine') || 'myMemory';

    // Recursive function to translate properties
    const translateObject = async (obj: any): Promise<any> => {
        const translatedObject: any = {};
        for (const key of Object.keys(obj)) {
            if (key !== 'price') {
                if (!obj[key]) {
                    translatedObject[key] = null;
                    continue;
                }
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    translatedObject[key] = await translateObject(obj[key]);
                } else {
                    translatedObject[key] = await translateText(obj[key], translationEngine);
                }
            } else {
                translatedObject[key] = obj[key];
            }
        }
        return translatedObject;
    };

    // Translate a single text
    const translateText = async (text: string, engine: string): Promise<string> => {
        switch (engine) {
            case "libreTranslate":
                return await getLibreTranslateTranslation(text);
            case "myMemory":
                return await getMyMemoryTranslation(text);
            default:
                return await getLibreTranslateTranslation(text);
        }
    };

    // Call the recursive function
    const translatedObject = await translateObject(object);

    return NextResponse.json(translatedObject);
}


const getLibreTranslateTranslation = async (text: string) => {
    const res = await fetch("https://translator.davidemarcoli.dev/translate", {
        method: "POST",
        body: JSON.stringify({
            q: text,
            source: "de",
            target: "en",
            format: "text",
            api_key: ""
        }),
        headers: {"Content-Type": "application/json"},
        cache: "force-cache"
    });

    const data = await res.json();
    return data.translatedText;
}

const getMyMemoryTranslation = async (text: string) => {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=de|en&de=fakemail@fakemail.ch`, {
        cache: "force-cache"
    });

    const data = (await res.json());
    return data.responseData.translatedText;
}
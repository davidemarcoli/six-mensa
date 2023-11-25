import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const object = JSON.parse(url.searchParams.get('object') || '{}');
    const translationEngine = url.searchParams.get('translationEngine');

    // translate each property of the object
    const data = await Promise.all(Object.keys(object).map(async (key) => {
        const text = object[key];
        let translatedText = "";

        switch (translationEngine) {
            case "libreTranslate":
                translatedText = await getLibreTranslateTranslation(text);
                break;
            case "myMemory":
                translatedText = await getMyMemoryTranslation(text);
                break;
            default:
                translatedText = await getLibreTranslateTranslation(text);
        }

        return translatedText;
    }));

    // consruct the new object
    const translatedObject: any = {};
    Object.keys(object).forEach((key, index) => {
        translatedObject[key] = data[index];
    });

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
        headers: { "Content-Type": "application/json" },
        cache: "force-cache"
    });

    const data = await res.json();
    return data.translatedText;
}

const getMyMemoryTranslation = async (text: string) => {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=de|en`, {
        cache: "force-cache"
    });

    const data = (await res.json());
    return data.responseData.translatedText;
}
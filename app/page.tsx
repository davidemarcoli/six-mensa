"use client";

import {useSearchParams} from "next/navigation";
import PDFPageSkeleton from "@/app/_components/pdf-page";
import MenuPage from "@/app/_components/menu-page";
import {useLocalStorage} from "usehooks-ts";

export default function Home() {

    const searchParams = useSearchParams()
    const viewMode = searchParams.get('viewMode') || 'text';
    const mensa = searchParams.get('mensa') || 'htp';

    const [language] = useLocalStorage('language', 'de');
    const [translationEngine] = useLocalStorage('translationEngine', 'libreTranslate');

    return (
        <>
            {viewMode === 'text' ?
                <MenuPage pageType={mensa === 'htp' ? 'HTP' : 'HT201'} language={language == 'en' ? 'en' : 'de'}
                          translationEngine={translationEngine == 'myMemory' ? 'myMemory' : 'libreTranslate'}/> :
                <PDFPageSkeleton/>}
        </>
    )
}

"use client";

import {useSearchParams} from "next/navigation";
import PDFPageSkeleton from "@/components/pdf-page";
import MenuPage from "@/components/menu-page";
import {useLocalStorage} from "usehooks-ts";

export default function Home() {

    const searchParams = useSearchParams()
    const viewMode = searchParams.get('viewMode') || 'text';
    const mensa = searchParams.get('mensa') || 'htp';

    const [language] = useLocalStorage('language', 'de');
    const [translationEngine] = useLocalStorage('translationEngine', 'myMemory');

    return (
        <>
            {viewMode === 'text' ?
                <MenuPage pageType={mensa === 'htp' ? 'HTP' : 'HT201'} language={language == 'en' ? 'en' : 'de'}
                          translationEngine={translationEngine == 'myMemory' ? 'myMemory' : 'libreTranslate'}/> :
                <PDFPageSkeleton/>}
        </>
    )
}

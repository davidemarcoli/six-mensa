"use client";

import CompareAllMenusPage from "@/components/compare-all-menus-page";
import useStore from "@/lib/store";

export default function Page() {

    const {language, translationEngine} = useStore();
    return (
        <>
            <CompareAllMenusPage language={language == 'en' ? 'en' : 'de'}
                                 translationEngine={translationEngine == 'myMemory' ? 'myMemory' : 'libreTranslate'} />
        </>
    )
}
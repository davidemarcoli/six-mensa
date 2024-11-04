"use client";

import PDFPageSkeleton from "@/components/pdf-page";
import MenuPage from "@/components/menu-page";
import useStore from "@/lib/store";

export default function Home() {
    const {language, translationEngine, displayFeaturedMenu, selectedMensa, selectedViewMode} = useStore();

    return (
        <>
            {selectedViewMode === 'text' ?
                <MenuPage pageType={selectedMensa === 'htp' ? 'HTP' : 'HT201'} language={language == 'en' ? 'en' : 'de'}
                          translationEngine={translationEngine == 'myMemory' ? 'myMemory' : 'libreTranslate'}
                          displayFeaturedMenu={displayFeaturedMenu}/> :
                <PDFPageSkeleton/>}
        </>
    )
}

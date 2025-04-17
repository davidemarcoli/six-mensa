"use client";

import PDFPageSkeleton from "@/components/pdf-page";
import MenuPage from "@/components/menu-page";
import {useEffect} from "react";
import useStore from "@/lib/store";

export default function Home() {
    const {language, displayFeaturedMenu, selectedMensa, selectedViewMode} = useStore();

    return (
        <>
            {selectedViewMode === 'text' ?
                <MenuPage pageType={selectedMensa === 'htp' ? 'HTP' : 'HT201'} language={language == 'en' ? 'en' : 'de'}
                          displayFeaturedMenu={displayFeaturedMenu}/> :
                <PDFPageSkeleton/>}
        </>
    )
}

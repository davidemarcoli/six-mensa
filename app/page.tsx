"use client";

import {useSearchParams} from "next/navigation";
import PDFPageSkeleton from "@/components/pdf-page";
import MenuPage from "@/components/menu-page";
import {useEffect} from "react";
import useStore from "@/lib/store";

export default function Home() {

    const searchParams = useSearchParams()
    const viewMode = searchParams.get('viewMode') || 'text';
    const mensa = searchParams.get('mensa') || 'htp';


    const {language, translationEngine, displayFeaturedMenu} = useStore();

    // const [language] = useLocalStorage('language', 'de');
    // const [translationEngine] = useLocalStorage('translationEngine', 'myMemory');
    // const [displayFeaturedMenu] = useLocalStorage('displayFeaturedMenu', true);

    // const [language, setLanguage] = useState('de')
    // const [translationEngine, setTranslationEngine] = useState('myMemory')
    // const [displayFeaturedMenu, setDisplayFeaturedMenu] = useState(true)
    //
    // useEffect(() => {
    //     setLanguage(localStorage.getItem('language') || 'de')
    //     setTranslationEngine(localStorage.getItem('translationEngine') || 'myMemory')
    //     setDisplayFeaturedMenu(localStorage.getItem('displayFeaturedMenu') === 'true')
    // }, []);

    useEffect(() => {
        console.log("change")
    }, [language, translationEngine, displayFeaturedMenu])

    return (
        <>
            {viewMode === 'text' ?
                <MenuPage pageType={mensa === 'htp' ? 'HTP' : 'HT201'} language={language == 'en' ? 'en' : 'de'}
                          translationEngine={translationEngine == 'myMemory' ? 'myMemory' : 'libreTranslate'}
                          displayFeaturedMenu={displayFeaturedMenu}/> :
                <PDFPageSkeleton/>}
        </>
    )
}

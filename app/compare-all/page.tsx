"use client";

import CompareAllMenusPage from "@/components/compare-all-menus-page";
import useStore from "@/lib/store";

export default function Page() {

    const {language} = useStore();
    return (
        <>
            <CompareAllMenusPage language={language == 'en' ? 'en' : 'de'} />
        </>
    )
}
"use client";

import useStore from "@/lib/store";
import CompareMenusPage from "@/components/compare-menus-page";

export default function Page() {

    const {language} = useStore();
    return (
        <>
            <CompareMenusPage language={language == 'en' ? 'en' : 'de'} />
        </>
    )
}
"use client";

import {useSearchParams} from "next/navigation";
import PDFPageSkeleton from "@/app/_components/pdf-page";
import MenuPage from "@/app/_components/menu-page";

export default function Home() {

    const searchParams = useSearchParams()
    const viewMode = searchParams.get('viewMode') || 'text';
    const mensa = searchParams.get('mensa') || 'htp';

    return (
        <>
            {viewMode === 'text' ? <MenuPage pageType={mensa === 'htp' ? 'HTP' : 'HT201'}/> : <PDFPageSkeleton/>}
        </>
    )
}

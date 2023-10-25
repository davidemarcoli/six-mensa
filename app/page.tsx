"use client";

import {useSearchParams} from "next/navigation";
import HT201Page from "@/app/_components/ht201-page";
import HTPPage from "@/app/_components/htp-page";
import PDFPageSkeleton from "@/app/_components/pdf-page";

export default function Home() {

    const searchParams = useSearchParams()
    const viewMode = searchParams.get('viewMode') || 'text';
    const mensa = searchParams.get('mensa') || 'htp';

    return (
        <>
            {viewMode === 'text' ? (mensa === 'htp' ? <HTPPage/> : <HT201Page/>) : <PDFPageSkeleton/>}
        </>
    )
}

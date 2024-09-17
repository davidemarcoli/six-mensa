import {Suspense, useEffect, useState} from "react";

export default function PDFPageSkeleton() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PDFPage/>
        </Suspense>
    )
}

export function PDFPage() {

    const [pdfDataUrls, setPdfDataUrls] = useState<any[]>([])

    useEffect(() => {
        getPdfUrls().then((urls) => {
            setPdfDataUrls(urls)
        })
    }, [])

    return (
        <>
            <main className="flex h-full items-center justify-between flex-row p-2">
                {pdfDataUrls.map((pdf, i) => (
                    <div key={i} className="w-full h-full p-5">
                        <h2 className="text-lg font-semibold mb-5 uppercase tracking-wide shadow-md p-3 rounded">
                            {pdf.title}
                        </h2>
                        {/*<embed src={pdf.dataUrl} type="application/pdf" style={{ width: '100%', height: 'calc(100vh - 200px)' }}></embed>*/}
                        <object data={pdf.dataUrl} type="application/pdf"
                                style={{width: '100%', height: 'calc(100vh - 200px)'}}></object>
                    </div>
                ))}
            </main>
        </>
    )
}


async function getPdfUrls() {
    const pdfData = [
        {
            url: "https://www.betriebsrestaurants-migros.ch/media/sxeelt4n/menueplan_six-ht201.pdf",
            title: "Menu Plan HT201"
        },
        {
            url: "https://www.betriebsrestaurants-migros.ch/media/ptvpzskx/landingpage_menueplan_htp.pdf",
            title: "Menu Plan HTP"
        }
    ];

    return await Promise.all(pdfData.map(async (data) => {
        const response = await fetch(data.url, {next: {revalidate: 60 * 60 * 4}});
        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        return {
            title: data.title,
            dataUrl: `data:application/pdf;base64,${base64}#zoom=100&view=FitW&toolbar=0`
        };
    }));
}

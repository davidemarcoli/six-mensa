export default async function Home() {
    const pdfDataUrls = await getPdfUrls();

    return (
        <main className="flex min-h-screen items-center justify-between flex-row">
            {pdfDataUrls.map((pdfDataUrl, i) => (
                <embed key={i} src={pdfDataUrl} type="application/pdf" style={{ width: '100%', height: '100vh' }}></embed>
            ))}
        </main>
    )
}


async function getPdfUrls() {
    const pdfUrls = [
        "https://www.betriebsrestaurants-migros.ch/media/x4vjg4pd/menueplan_six-ht201.pdf",
        "https://www.betriebsrestaurants-migros.ch/media/k5dnh0sd/landingpage_menueplan_htp.pdf",
    ]

    // fetch the pdfs
    const pdfs = await Promise.all(pdfUrls.map(async (url) => {
        const response = await fetch(url, {next: { revalidate: 60 * 60 * 24 }});
        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();
        return Buffer.from(buffer).toString('base64');
    }));

    // const response = await fetch(pdfUrls[0]);
    // const blob = await response.blob();
    // const buffer = await blob.arrayBuffer();
    // const base64 = Buffer.from(buffer).toString('base64');

    return pdfs.map((pdf) => `data:application/pdf;base64,${pdf}#page=1&zoom=100&view=FitH`);
}

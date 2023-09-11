import Image from "next/image";
import { fromBase64 } from "pdf2pic";

export default async function Home() {
  const pdfDataUrls = await getPdfUrls();

  return (
    <main className="flex min-h-screen items-center justify-between flex-row p-5 bg-gray-900 text-white">
      {pdfDataUrls.map((element, i) => (
        <div key={i} className="w-full h-full p-5">
          <h2 className="text-lg font-semibold mb-5 uppercase tracking-wide shadow-md p-3 rounded bg-gray-800">
            {element.title}
          </h2>
          {/*<embed src={pdf.dataUrl} type="application/pdf" style={{ width: '100%', height: 'calc(100vh - 200px)' }}></embed>*/}
          {/*<object
            data={element.pdfDataUrl}
            type="application/pdf"
            style={{ width: "100%", height: "calc(100vh - 200px)" }}
            ></object>*/}
          <Image src={element.imageDataUrl} alt={element.title} width="100" height="100" style={{ width: "100%" }}></Image>
        </div>
      ))}
    </main>
  );
}

function getCurrentWeekday() {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentWeekday = weekdays[dayOfWeek];
  return currentWeekday;
}

async function getPdfUrls() {
  const pdfData = [
    {
      url: "https://www.betriebsrestaurants-migros.ch/media/x4vjg4pd/menueplan_six-ht201.pdf",
      title: "Menu Plan HT201",
    },
    {
      url: "https://www.betriebsrestaurants-migros.ch/media/k5dnh0sd/landingpage_menueplan_htp.pdf",
      title: "Menu Plan HTP",
    },
  ];

  return await Promise.all(
    pdfData.map(async (data) => {
      const response = await fetch(data.url);
      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");

      const convert = fromBase64(base64, {
        density: 500,
        format: "png",
        width: 3000,
        height: 2000
      })

      return await {
        title: data.title,
        imageDataUrl: "data:image/png;base64," + (await convert(1, { responseType: "base64" })).base64,
        pdfDataUrl: `data:application/pdf;base64,${base64}#zoom=100&view=FitW&toolbar=0`
      }
    })
  );
}

export default async function Home() {
  const pdfDataUrls = await getPdfUrls();

  return (
    <main className="flex min-h-screen items-center justify-between flex-row p-5 bg-gray-900 text-white">
      {pdfDataUrls.map((pdf, i) => (
        <div key={i} className="w-full h-full p-5">
          <h2 className="text-lg font-semibold mb-5 uppercase tracking-wide shadow-md p-3 rounded bg-gray-800">
            {pdf.title}
          </h2>
          {/*<embed src={pdf.dataUrl} type="application/pdf" style={{ width: '100%', height: 'calc(100vh - 200px)' }}></embed>*/}
          <object
            data={pdf.dataUrl}
            type="application/pdf"
            style={{ width: "100%", height: "calc(100vh - 200px)" }}
          ></object>
        </div>
      ))}
    </main>
  );
}

// function getCurrentWeekday() {
//   const currentDate = new Date();
//   const dayOfWeek = currentDate.getDay();
//   const weekdays = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const currentWeekday = weekdays[dayOfWeek];
//   return currentWeekday;
// }

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
      const response = await fetch(data.url, {
          next: {
              revalidate: 60 * 60 * 24
          }
      });
      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      return {
        title: data.title,
        dataUrl: `data:application/pdf;base64,${base64}#zoom=100&view=FitW&toolbar=0`,
      };
    })
  );
}

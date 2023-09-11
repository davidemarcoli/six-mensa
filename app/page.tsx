import { useEffect, useState } from "react";

export default async function Home() {
  const pdfDataUrls = await getPdfUrls();
  
  useEffect(() => {
    setSelectedDay(getCurrentWeekday());
  }, []);

  const getCurrentWeekday = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayIndex = new Date().getDay();
    return days[currentDayIndex];
  };

  
  const getAllWeekdays = () => {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  };

  const [selectedDay, setSelectedDay] = useState(getCurrentWeekday());


  return (
    <main className="flexSelf min-h-screen p-5 bg-gray-900 text-white">
      <div className="changeWidth">
<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Day</label>
<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
      {getAllWeekdays().map((day, i) => (
        <option key={i} value={day}>
          {day}
        </option>
      ))}
    </select>
</div>

<div className="flex min-h-screen items-center justify-between flex-row p-5 bg-gray-900 text-white">
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
</div>
    </main>
  );
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
      return {
        title: data.title,
        dataUrl: `data:application/pdf;base64,${base64}#zoom=100&view=FitW&toolbar=0`,
      };
    })
  );
}

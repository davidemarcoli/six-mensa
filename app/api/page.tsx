import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface Menu {
    day: string;
    Local: string;
    Vegi: string;
    Globetrotter: string | undefined;
    Buffet: string | undefined;
}

async function getMenuData(): Promise<Menu[]> {
    return await fetch("http://server.davidemarcoli.dev:3000/-1").then((response) => response.json());
}

export default async function APIPage() {

    const menuData = await getMenuData();

    const currentDay = new Date().getDay() - 1;
    const currentDate = new Date().getTime();

    let featuredMenus: Menu | undefined = undefined;
    // if is weekday, show featured menu
    if (currentDay > 0 && currentDay < 5) {
        featuredMenus = menuData[currentDay];
        menuData.splice(currentDay, 1);
    }

    return (
        <>
        {currentDate}
            {{/*<main className="flex h-full items-center justify-center flex-col p-3">
                {featuredMenus && (
                    <div className="w-full flex justify-center mb-4">
                        <Card className="flex-grow w-1/4">
                            <CardHeader>
                                <CardTitle><span className="underline">Heute</span> <span className="text-lg">({featuredMenus.day})</span></CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><b>Local:</b> {featuredMenus.Local}</p>
                                <p><b>Vegi:</b> {featuredMenus.Vegi}</p>
                                {featuredMenus.Globetrotter && <p><b>Globetrotter:</b> {featuredMenus.Globetrotter}</p>}
                                {featuredMenus.Buffet && <p><b>Buffet:</b> {featuredMenus.Buffet}</p>}
                            </CardContent>
                        </Card>
                    </div>
                )}

                <div className="flex flex-wrap justify-center items-stretch">
                    {menuData.map((menu, i) => (
                        <Card key={i} className={`flex-grow w-full md:w-1/6 ${i == menuData.length - 1 ? '' : 'mr-2'}`}>
                            <CardHeader>
                                <CardTitle>{menu.day}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><b>Local:</b> {menu.Local}</p>
                                <p><b>Vegi:</b> {menu.Vegi}</p>
                                {menu.Globetrotter && <p><b>Globetrotter:</b> {menu.Globetrotter}</p>}
                                {menu.Buffet && <p><b>Buffet:</b> {menu.Buffet}</p>}
                            </CardContent>
                        </Card>
                    ))}
                </div>
                    </main>*/}}

        </>
    )
}
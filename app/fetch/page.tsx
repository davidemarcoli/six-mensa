"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useEffect, useState} from "react";

interface Menu {
    day: string;
    Local: string;
    Vegi: string;
    Globetrotter: string | undefined;
    Buffet: string | undefined;
}

async function getMenuData(): Promise<Menu[]> {
    return await fetch("api").then((response) => response.json());
}

export default function APIPage() {

    const [menuData, setMenuData] = useState<Menu[]>([])
    const [featuredMenus, setFeaturedMenus] = useState<Menu | undefined>(undefined)

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            setMenuData(await getMenuData());
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    if (menuData.length == 0) return <p>Loading...</p>

    const currentDay = new Date().getDay() - 1;

    // if is weekday, show featured menu
    if (!featuredMenus && currentDay > 0 && currentDay < 5) {
        setFeaturedMenus(menuData[currentDay]);
        menuData.splice(currentDay, 1);
    }

    return (
        <>
            <main className="flex h-full items-center justify-center flex-col p-3">
                {featuredMenus && (
                    <div className="w-full flex justify-center mb-4">
                        <Card className="flex-grow w-1/4">
                            <CardHeader>
                                <CardTitle><span className="underline">Heute</span> <span
                                    className="text-lg">({featuredMenus.day})</span></CardTitle>
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
            </main>

        </>
    )
}
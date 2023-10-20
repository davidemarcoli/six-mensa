"use client";

import MenuCard from "@/components/menu-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import {useEffect, useState} from "react";

export interface Menu {
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
    const [menuData, setMenuData] = useState<Menu[]>([]);
    const [featuredMenus, setFeaturedMenus] = useState<Menu | undefined>(undefined);
    const [hasShownAlert, setHasShownAlert] = useState<boolean>(localStorage ? localStorage.getItem('hasShownHoverAlert') === 'true' : false);

    if (!hasShownAlert) {
        localStorage.setItem('hasShownHoverAlert', 'true');
    }

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const fetchedMenuData = await getMenuData();
            const updatedMenuData = handleFeaturedMenu(fetchedMenuData);
            setMenuData(updatedMenuData);
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    if (menuData.length == 0) return <p>Loading...</p>

    return (
        <>
            <main className="flex h-full items-center justify-center flex-col p-3">
                {!hasShownAlert && (
                    <Alert className="mb-4 -z-10">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>
                            You can hover over a menu to see a symbolic image of the food.
                        </AlertDescription>
                    </Alert>
                )}

                {featuredMenus && (
                    <div className="w-full flex justify-center mb-4">
                        <MenuCard className={`flex-grow w-1/4`} menu={featuredMenus} featured={true}/>
                    </div>
                )}

                <div className="flex flex-wrap justify-center items-stretch">
                    {menuData.map((menu, i) => (
                        <MenuCard key={i} className={`flex-grow w-full lg:w-1/6 ${i == menuData.length - 1 ? '' : 'lg:mr-4 mb-4 lg:mb-0'}`} menu={menu}/>
                    ))}
                </div>
            </main>
        </>
    )

    // Handle featured menu logic outside the useEffect callback
    function handleFeaturedMenu(data: Menu[]): Menu[] {
        const currentDay = new Date().getDay() - 1;

        if (!featuredMenus && currentDay > 0 && currentDay < 5) {
            const featured = data[currentDay];
            setFeaturedMenus(featured);
            const updatedData = [...data];
            updatedData.splice(currentDay, 1);
            return updatedData;
        }

        return data;
    }
}

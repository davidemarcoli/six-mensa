"use client";

import MenuCardHTP from "@/components/menu-card-htp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import {useEffect, useState} from "react";
import MenuCardHT201 from "@/components/menu-card-ht201";

export interface HT201Menu {
    day: string;
    Local: string;
    Global: string | undefined;
    Vegi: string;
    "Pizza & Pasta": string;
}

async function getMenuData(): Promise<HT201Menu[]> {
    return await fetch("api/ht201").then((response) => response.json());
}

export default function HT201Page() {
    const [menuData, setMenuData] = useState<HT201Menu[]>([]);
    const [featuredMenus, setFeaturedMenus] = useState<HT201Menu | undefined>(undefined);
    const [hasShownAlert, setHasShownAlert] = useState<boolean>(true);

    useEffect(() => {
        // check localStorage on the client side
        const alertShown = localStorage.getItem('hoverAlertShown') === 'true';
        setHasShownAlert(alertShown);

        if (!alertShown) {
            localStorage.setItem('hoverAlertShown', 'true');
        }

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
                        <MenuCardHT201 className={`flex-grow w-1/4`} menu={featuredMenus} featured={true}/>
                    </div>
                )}

                <div className="flex flex-wrap justify-center items-stretch w-full">
                    {menuData.map((menu, i) => (
                        <MenuCardHT201 key={i} className={`flex-grow w-full lg:w-1/6 ${i == menuData.length - 1 ? '' : 'lg:mr-4 mb-4 lg:mb-0'}`} menu={menu}/>
                    ))}
                </div>
            </main>
        </>
    )

    // Handle featured menu logic outside the useEffect callback
    function handleFeaturedMenu(data: HT201Menu[]): HT201Menu[] {
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

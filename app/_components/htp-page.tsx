"use client";

import MenuCardHTP from "@/components/menu-card-htp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import {useEffect, useState} from "react";

export interface HTPMenu {
    day: string;
    Local: string;
    Vegi: string;
    Globetrotter: string | undefined;
    Buffet: string | undefined;
}

async function getMenuData(): Promise<HTPMenu[]> {
    return await fetch("api/htp").then((response) => response.json());
}

export default function HTPPage() {
    const [menuData, setMenuData] = useState<HTPMenu[]>([]);
    const [featuredMenus, setFeaturedMenus] = useState<HTPMenu | undefined>(undefined);
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
                        <MenuCardHTP className={`flex-grow w-1/4`} menu={featuredMenus} featured={true}/>
                    </div>
                )}

                <div className="flex flex-wrap justify-center items-stretch">
                    {menuData.map((menu, i) => (
                        <MenuCardHTP key={i} className={`flex-grow w-full lg:w-1/6 ${i == menuData.length - 1 ? '' : 'lg:mr-4 mb-4 lg:mb-0'}`} menu={menu}/>
                    ))}
                </div>
            </main>
        </>
    )

    // Handle featured menu logic outside the useEffect callback
    function handleFeaturedMenu(data: HTPMenu[]): HTPMenu[] {
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

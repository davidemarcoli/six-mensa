"use client";

import MenuCard from "@/components/menu-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";

// Define the prop type for the combined page
interface CombinedPageProps {
    pageType: 'HT201' | 'HTP';
}

// Define the menu item structures for HT201 and HTP
const menuItemsHT201 = [
    { name: 'Local', imageKey: 'Local', menuKey: 'Local' },
    { name: 'Global', imageKey: 'Global', menuKey: 'Global' },
    { name: 'Vegi', imageKey: 'Vegi', menuKey: 'Vegi' },
    { name: 'Pizza & Pasta', imageKey: 'PizzaPasta', menuKey: 'Pizza & Pasta' },
];

const menuItemsHTP = [
    { name: 'Local', imageKey: 'Local', menuKey: 'Local' },
    { name: 'Vegi', imageKey: 'Vegi', menuKey: 'Vegi' },
    { name: 'Globetrotter', imageKey: 'Globetrotter', menuKey: 'Globetrotter' },
    { name: 'Buffet', imageKey: 'Buffet', menuKey: 'Buffet' },
];

export default function MenuPage({ pageType }: CombinedPageProps) {
    const [menuData, setMenuData] = useState<any[]>([]);
    const [featuredMenus, setFeaturedMenus] = useState<any | undefined>(undefined);
    const [hasShownAlert, setHasShownAlert] = useState<boolean>(true);
    const apiPath = pageType === 'HT201' ? 'api/ht201' : 'api/htp';
    const menuItems = pageType === 'HT201' ? menuItemsHT201 : menuItemsHTP;

    useEffect(() => {
        const alertShown = localStorage.getItem('hoverAlertShown') === 'true';
        setHasShownAlert(alertShown);

        if (!alertShown) {
            localStorage.setItem('hoverAlertShown', 'true');
        }

        const fetchData = async () => {
            const fetchedMenuData = await fetch(apiPath).then((response) => response.json());
            const updatedMenuData = handleFeaturedMenu(fetchedMenuData);
            setMenuData(updatedMenuData);
        };

        fetchData().catch(console.error);
    }, [pageType]);

    if (menuData.length === 0) return <p>Loading...</p>;

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
                        <MenuCard className={`flex-grow w-1/4`} menu={featuredMenus} featured={true} menuItems={menuItems}/>
                    </div>
                )}

                <div className="flex flex-wrap justify-center items-stretch w-full">
                    {menuData.map((menu, i) => (
                        <MenuCard key={i} className={`flex-grow w-full lg:w-1/6 ${i === menuData.length - 1 ? '' : 'lg:mr-4 mb-4 lg:mb-0'}`} menu={menu} menuItems={menuItems}/>
                    ))}
                </div>
            </main>
        </>
    );

    function handleFeaturedMenu(data: any[]): any[] {
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

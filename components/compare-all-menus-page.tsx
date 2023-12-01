"use client";

import MenuCard from "@/components/menu-card";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Info} from "lucide-react";
import {useEffect, useState} from "react";
import LoadingSpinner from "@/components/loading-spinner";

// Define the prop type for the combined page
interface CompareMenusPageProps {
    language: 'en' | 'de';
    translationEngine: 'libreTranslate' | 'myMemory';
}

// Define the menu item structures for HT201 and HTP
const menuItemsHT201 = [
    {name: 'Local', imageKey: 'Local', menuKey: 'Local'},
    {name: 'Global', imageKey: 'Global', menuKey: 'Global'},
    {name: 'Vegi', imageKey: 'Vegi', menuKey: 'Vegi'},
    {name: 'Pizza & Pasta', imageKey: 'PizzaPasta', menuKey: 'Pizza & Pasta'},
];

const menuItemsHTP = [
    {name: 'Local', imageKey: 'Local', menuKey: 'Local'},
    {name: 'Vegi', imageKey: 'Vegi', menuKey: 'Vegi'},
    {name: 'Globetrotter', imageKey: 'Globetrotter', menuKey: 'Globetrotter'},
    {name: 'Buffet', imageKey: 'Buffet', menuKey: 'Buffet'},
];

export default function CompareAllMenusPage({language, translationEngine}: CompareMenusPageProps) {
    const [leftMenuData, setLeftMenuData] = useState<any[]>([]);
    const [rightMenuData, setRightMenuData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const leftMenuData = await fetch('api/ht201').then((response) => response.json());
            const rightMenuData = await fetch('api/htp').then((response) => response.json());
            setLeftMenuData(leftMenuData);
            setRightMenuData(rightMenuData);
        };

        fetchData().catch(console.error);
    }, []);

    if (leftMenuData.length === 0 || rightMenuData.length === 0) return (
        <LoadingSpinner/>
    );

    return (
        <>
            <main className="flex h-full grid-cols-2">
                <div className="flex flex-col flex-wrap w-full m-4">
                    {leftMenuData.map((menu, i) => (
                        <MenuCard key={i}
                                  className={`flex-grow w-full m-4`}
                                  menu={menu} menuItems={menuItemsHT201} language={language}
                                  translationEngine={translationEngine} />
                    ))}
                </div>
                <div className="flex flex-col flex-wrap w-full m-4">
                    {rightMenuData.map((menu, i) => (
                        <MenuCard key={i}
                                  className={`flex-grow w-full m-4`}
                                  menu={menu} menuItems={menuItemsHTP} language={language}
                                  translationEngine={translationEngine} />
                    ))}
                </div>
            </main>
        </>
    );
}

"use client";

import MenuCard from "@/components/menu-card";
import {useEffect, useState} from "react";
import LoadingSpinner from "@/components/loading-spinner";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"

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

export default function CompareMenusPage({language, translationEngine}: CompareMenusPageProps) {
    const [leftMenuData, setLeftMenuData] = useState<any[]>([]);
    const [rightMenuData, setRightMenuData] = useState<any[]>([]);
    const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const leftMenuData = await fetch('api/ht201').then((response) => response.json());
            const rightMenuData = await fetch('api/htp').then((response) => response.json());
            setLeftMenuData(leftMenuData);
            setRightMenuData(rightMenuData);
            console.log(leftMenuData)
            console.log(rightMenuData)
        };

        fetchData().catch(console.error);
    }, []);

    if (leftMenuData.length === 0 || rightMenuData.length === 0) return (
        <LoadingSpinner/>
    );

    const selectedMenu = (mensa: string) => {
        console.log(selectedDay)
        console.log(leftMenuData)
        if (mensa === 'htp') {
            return rightMenuData.find((menu) => menu.day === selectedDay)
        } else {
            return leftMenuData.find((menu) => menu.day === selectedDay)
        }
    }

    return (
        <>
            <div className={'flex flex-wrap sm:flex-nowrap grid-cols-2'}>
                <div className={'w-full m-4 flex flex-row justify-center'}>
                    <Select onValueChange={setSelectedDay}>
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select day to compare"/>
                        </SelectTrigger>
                        <SelectContent>
                            {leftMenuData.map((menu, i) => (
                                <SelectItem key={i} value={menu.day}>{menu.day}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <main className="flex h-full grid-cols-2">
                <div className="flex flex-col flex-wrap w-full m-4">
                    {selectedDay && <>
                        <h1 className={'text-2xl font-bold text-center mb-4'}>HT 201</h1>
                        <MenuCard key={selectedDay + "-ht201"}
                                  className={`flex-grow w-full`}
                                  menu={selectedMenu('ht201')} menuItems={menuItemsHT201}
                                  language={language}
                                  translationEngine={translationEngine}/>
                    </>}
                </div>
                <div className="flex flex-col flex-wrap w-full m-4">
                    {selectedDay && <>
                        <h1 className={'text-2xl font-bold text-center mb-4'}>HTP</h1>
                        <MenuCard key={selectedDay + "-htp"}
                                  className={`flex-grow w-full `}
                                  menu={selectedMenu('ht201')} menuItems={menuItemsHT201}
                                  language={language}
                                  translationEngine={translationEngine}/>
                    </>}
                </div>
            </main>
        </>
    );
}

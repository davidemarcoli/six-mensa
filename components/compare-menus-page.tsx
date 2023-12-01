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
    const [selectedLeftMenu, setSelectedLeftMenu] = useState<any | undefined>(undefined);
    const [selectedRightMenu, setSelectedRightMenu] = useState<any | undefined>(undefined);

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

    return (
        <>
            <div className={'flex flex-wrap sm:flex-nowrap grid-cols-2'}>
                <div className={'w-full m-4 flex flex-row'}>
                    <Select onValueChange={setSelectedLeftMenu}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select the HT201 menu"/>
                        </SelectTrigger>
                        <SelectContent>
                            {leftMenuData.map((menu, i) => (
                                <SelectItem key={i} value={menu}>{menu.day}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <h1 className={'ml-4 text-3xl'}>HT 201</h1>
                </div>
                <div className={'w-full m-4 flex flex-row'}>
                    <Select onValueChange={setSelectedRightMenu}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select the HTP menu"/>
                        </SelectTrigger>
                        <SelectContent>
                            {rightMenuData.map((menu, i) => (
                                <SelectItem key={i} value={menu}>{menu.day}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <h1 className={'ml-4 text-3xl'}>HTP</h1>
                </div>
            </div>

            <main className="flex h-full grid-cols-2">
                <div className="flex flex-col flex-wrap w-full m-4">
                    {selectedLeftMenu && <MenuCard key={selectedLeftMenu.date}
                                                   className={`flex-grow w-full `}
                                                   menu={selectedLeftMenu} menuItems={menuItemsHT201}
                                                   language={language}
                                                   translationEngine={translationEngine}/>}
                </div>
                <div className="flex flex-col flex-wrap w-full m-4">
                    {selectedRightMenu && <MenuCard key={selectedRightMenu.date}
                                                    className={`flex-grow w-full `}
                                                    menu={selectedRightMenu} menuItems={menuItemsHTP}
                                                    language={language}
                                                    translationEngine={translationEngine}/>}
                </div>
            </main>
        </>
    );
}

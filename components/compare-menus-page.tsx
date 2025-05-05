"use client";

import MenuCard from "@/components/menu-card";
import {useEffect, useState} from "react";
import LoadingSpinner from "@/components/loading-spinner";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Button} from "./ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";

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
            try {
                const leftResponse = await fetch('/api/ht201');
                const rightResponse = await fetch('/api/htp');
                
                if (!leftResponse.ok || !rightResponse.ok) {
                  console.error('API response not OK');
                  return;
                }
                
                const leftData = await leftResponse.json();
                const rightData = await rightResponse.json();
                
                setLeftMenuData(leftData);
                setRightMenuData(rightData);
            } catch (error) {
                console.error('Error fetching data:', error);
                return;
            }
        };


        fetchData().catch(console.error);
    }, []);

    useEffect(() => {
        if (leftMenuData.length === 0 || rightMenuData.length === 0) {
            console.error('No data found');
            return;
        }

        const today = new Date();
        const day = today.getDay();
        const dayInWord = leftMenuData[day - 1]?.day;
        setSelectedDay(dayInWord || leftMenuData[0]?.day);
    }, [leftMenuData, rightMenuData]);

    if (leftMenuData.length === 0 || rightMenuData.length === 0) return (
        <LoadingSpinner/>
    );

    const selectedMenu = (mensa: 'ht201' | 'htp') => {
        if (mensa === 'htp') {
            return rightMenuData.find((menu) => menu.day === selectedDay)
        } else {
            return leftMenuData.find((menu) => menu.day === selectedDay)
        }
    }

    const changeDay = (direction: 'left' | 'right') => {
        const indexOfDay = leftMenuData.findIndex((value: any) => value.day == selectedDay)
        if (direction === 'left') {
            if (indexOfDay === 0) {
                setSelectedDay(leftMenuData[leftMenuData.length - 1].day)
            } else {
                setSelectedDay(leftMenuData[indexOfDay - 1].day)
            }
        } else {
            if (indexOfDay === leftMenuData.length - 1) {
                setSelectedDay(leftMenuData[0].day)
            } else {
                setSelectedDay(leftMenuData[indexOfDay + 1].day)
            }
        }
    }

    return (
        <>
            <div className={'flex flex-wrap sm:flex-nowrap grid-cols-2'}>
                <div className={'w-full m-4 flex flex-row justify-center'}>
                    <Button variant="outline" size="icon" onClick={() => changeDay('left')} className={'mr-4'}>
                        <ChevronLeft className="h-4 w-4"/>
                    </Button>
                    <Select onValueChange={setSelectedDay} value={selectedDay}>
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select day to compare"/>
                        </SelectTrigger>
                        <SelectContent>
                            {leftMenuData.map((menu, i) => (
                                <SelectItem key={i} value={menu.day}>{menu.day}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" onClick={() => changeDay('right')} className={'ml-4'}>
                        <ChevronRight className="h-4 w-4"/>
                    </Button>
                </div>
            </div>

            <main className="flex flex-col sm:flex-row h-full grid-cols-2">
                <div className="flex flex-col sm:w-full m-4">
                    {selectedDay && <>
                        <h1 className={'text-2xl font-bold text-center mb-4'}>HT 201</h1>
                        <MenuCard key={selectedDay + "-ht201"}
                                  className={`flex-grow w-full`}
                                  menu={selectedMenu('ht201')} menuItems={menuItemsHT201}
                                  language={language}
                                  translationEngine={translationEngine}/>
                    </>}
                </div>
                <div className="flex flex-col sm:w-full m-4">
                    {selectedDay && <>
                        <h1 className={'text-2xl font-bold text-center mb-4'}>HTP</h1>
                        <MenuCard key={selectedDay + "-htp"}
                                  className={`flex-grow w-full`}
                                  menu={selectedMenu('htp')} menuItems={menuItemsHTP}
                                  language={language}
                                  translationEngine={translationEngine}/>
                    </>}
                </div>
            </main>
        </>
    );
}

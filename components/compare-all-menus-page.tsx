"use client";

import MenuCard from "@/components/menu-card";
import {useEffect, useState} from "react";
import LoadingSpinner from "@/components/loading-spinner";

interface CompareMenusPageProps {
    language: 'en' | 'de';
}

export default function CompareAllMenusPage({language}: CompareMenusPageProps) {
    const [leftMenuData, setLeftMenuData] = useState<any[]>([]);
    const [rightMenuData, setRightMenuData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const leftMenuData = await fetch(`api/ht201?language=${language}`).then((response) => response.json());
            const rightMenuData = await fetch(`api/htp?language=${language}`).then((response) => response.json());
            setLeftMenuData(leftMenuData);
            setRightMenuData(rightMenuData);
        };

        fetchData().catch(console.error);
    }, [language]);

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
                                  menu={menu} />
                    ))}
                </div>
                <div className="flex flex-col flex-wrap w-full m-4">
                    {rightMenuData.map((menu, i) => (
                        <MenuCard key={i}
                                  className={`flex-grow w-full m-4`}
                                  menu={menu} />
                    ))}
                </div>
            </main>
        </>
    );
}

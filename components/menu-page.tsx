"use client";

import MenuCard, { MenuItem } from "@/components/menu-card";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Info} from "lucide-react";
import {useEffect, useState} from "react";
import LoadingSpinner from "@/components/loading-spinner";

// Define the prop type for the combined page
interface CombinedPageProps {
    pageType: 'HT201' | 'HTP';
    language: 'en' | 'de';
    translationEngine: 'libreTranslate' | 'myMemory';
    displayFeaturedMenu: boolean;
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

export default function MenuPage({pageType, language, translationEngine, displayFeaturedMenu}: CombinedPageProps) {
    const [menuData, setMenuData] = useState<any[]>([]);
    const [featuredMenu, setFeaturedMenu] = useState<any | undefined>(undefined);
    const [hasShownAlert, setHasShownAlert] = useState<boolean>(true);
    const apiPath = pageType === 'HT201' ? 'api/ht201' : 'api/htp';
    const [menuItems, setMenuitems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const alertShown = localStorage.getItem('hoverAlertShown') === 'true';
        setHasShownAlert(alertShown);

        if (!alertShown) {
            localStorage.setItem('hoverAlertShown', 'true');
        }

        const fetchData = async () => {
            const fetchedMenuData = await fetch(apiPath).then((response) => response.json());
            setMenuitems(pageType === 'HT201' ? menuItemsHT201 : menuItemsHTP);
            if (displayFeaturedMenu) {
                const updatedMenuData = handleFeaturedMenu(fetchedMenuData);
                setMenuData(updatedMenuData);
            } else {
                setFeaturedMenu(undefined)
                setMenuData(fetchedMenuData);
            }
        };

        fetchData().catch(console.error);
    }, [pageType, displayFeaturedMenu]);

    if (menuData.length === 0) return (
        <LoadingSpinner/>
    );

    return (
        <>
            <main className="flex h-full items-center justify-center flex-col p-3">
                {/*{displayFeaturedMenu + ""}*/}
                {!hasShownAlert && (
                    <Alert className="mb-4 -z-10">
                        <Info className="h-4 w-4"/>
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>
                            You can hover over a menu to see a symbolic image of the food.
                        </AlertDescription>
                    </Alert>
                )}
                {/*{language === 'en' && (*/}
                {/*    <Alert className="mb-4 -z-10">*/}
                {/*        <Info className="h-4 w-4" />*/}
                {/*        <AlertTitle>Using Translation Engine: <span className={'underline'}>{translationEngine === 'myMemory' ? 'My Memory' : 'Libre Translate'}</span></AlertTitle>*/}
                {/*    </Alert>*/}
                {/*)}*/}

                {featuredMenu && (
                    <div className="w-full flex justify-center mb-4">
                        <MenuCard className={`flex-grow w-1/4`} menu={featuredMenu} featured={true}
                                  menuItems={menuItems} language={language} translationEngine={translationEngine}/>
                    </div>
                )}

                <div className="flex flex-wrap justify-center items-stretch w-full">
                    {menuData.map((menu, i) => (
                        <MenuCard key={i}
                                  className={`flex-grow w-full lg:w-1/6 ${i === menuData.length - 1 ? '' : 'lg:mr-4 mb-4 lg:mb-0'}`}
                                  menu={menu} menuItems={menuItems} language={language}
                                  translationEngine={translationEngine} featured={featuredMenu ? false : isCurrentDay(menu.day)}/>
                    ))}
                </div>
            </main>
        </>
    );

    // Helper function to get current day name in both languages
    function getCurrentDayName() {
        const today = new Date();
        const germanDay = today.toLocaleDateString('de-DE', { weekday: 'long' });
        const englishDay = today.toLocaleDateString('en-US', { weekday: 'long' });
        return { german: germanDay, english: englishDay };
    }

    function isCurrentDay(menuDay: string) {
        const currentDayNames = getCurrentDayName();
        return menuDay.toLowerCase() === currentDayNames.german.toLowerCase() || 
               menuDay.toLowerCase() === currentDayNames.english.toLowerCase();
    }

    function handleFeaturedMenu(data: any[]): any[] {
        const currentDayNames = getCurrentDayName();
        
        const featuredIndex = data.findIndex(menu => 
            menu.day.toLowerCase() === currentDayNames.german.toLowerCase() || 
            menu.day.toLowerCase() === currentDayNames.english.toLowerCase()
        );

        if (featuredIndex !== -1) {
            const featured = data[featuredIndex];
            setFeaturedMenu(featured);
            const updatedData = [...data];
            updatedData.splice(featuredIndex, 1);
            return updatedData;
        }

        return data;
    }
}

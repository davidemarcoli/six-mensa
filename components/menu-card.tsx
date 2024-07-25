"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Image as ScrapedImage} from "@/app/api/scrape/cheerio/route";
import {useEffect, useState} from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "./ui/hover-card";
import Image from "next/image";
import useStore from "@/lib/store";

interface MenuItem {
    name: string;
    imageKey: string;
    menuKey: string;
}

interface GenericMenuProps {
    menu: any;  // You might want to replace `any` with a more specific type if possible
    featured?: boolean;
    className?: string;
    menuItems: MenuItem[];
    language: 'en' | 'de';
    translationEngine: 'libreTranslate' | 'myMemory';
}

async function getImages(menu: any): Promise<any> {

    const stringifiedMenu = encodeURIComponent(JSON.stringify(menu));

    const abortController = new AbortController();

    return await fetch(`api/scrape/cheerio?singleResult=true&object=${stringifiedMenu}`, {
        next: {
            revalidate: 60 * 60 * 24
        },
        signal: abortController.signal
    }).then((response) => response.json()).catch((error) => {
        if (!abortController.signal.aborted) {
            console.error('Error:', error.message);
        }
        return [];
    });
}

async function getTranslatedMenu(menu: any, translationEngine: string): Promise<any> {
    const stringifiedMenu = encodeURIComponent(JSON.stringify(menu));
    return await fetch(`api/translate?object=${stringifiedMenu}&translationEngine=${translationEngine}`).then((response) => response.json());
}

export default function GenericMenuCard({menu, className, featured, menuItems, language, translationEngine}: GenericMenuProps) {
    const [translatedMenu, setTranslatedMenu] = useState<any>(menu);
    const [menuImages, setMenuImages] = useState<any>();
    const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);

    const {color} = useStore();

    useEffect(() => {
        const filteredMenuItems = menuItems.filter(item => {
            return menu[item.menuKey] !== undefined
        })
        setFilteredMenuItems(filteredMenuItems)
        const fetchData = async () => {
            const menuCopy = {...menu};
            delete menuCopy.day;
            const images = await getImages(menuCopy);
            const newMenuImages = filteredMenuItems.reduce((acc, item) => ({
                ...acc,
                [item.imageKey]: images[item.imageKey]?.link || ''
            }), {});

            setMenuImages({
                day: menu.day,
                ...newMenuImages
            });
        };

        fetchData().catch(console.error);
    }, [menu, menuItems]);

    useEffect(() => {
        const fetchData = async () => {
            if (language === 'en') {
                // const translatedMenuItems = await Promise.all(filteredMenuItems.map(item => getTranslatedMenu(menu[item.menuKey])));
                // setFilteredMenuItems(translatedMenuItems)

                setTranslatedMenu(() => menu)
                setTranslatedMenu(await getTranslatedMenu(menu, translationEngine))
            } else {
                setTranslatedMenu(menu)
            }
        }
        fetchData().catch(console.error);
    }, [language, menu, translationEngine])

    if (!menu || !menu.day) return <p>Loading...</p>;

    return (
        <Card style={{borderColor: featured ? color : undefined}} className={`${className} ${featured ? `border-2` : ''}`} tabIndex={0}>
            <CardHeader>
                {/*{featured && <CardTitle><span className="underline">Heute</span> <span*/}
                {/*    className="text-lg">({menu.day})</span></CardTitle>}*/}
                {/*{!featured && <CardTitle>{menu.day}</CardTitle>}*/}
                <CardTitle>{menu.day}</CardTitle>
            </CardHeader>
            <CardContent>
                {filteredMenuItems.filter(item => menu[item.menuKey]).filter(item => translatedMenu[item.menuKey]).map((item, index) => (
                    <HoverCard key={item.name}>
                        <HoverCardTrigger asChild>
                            <div className={index !== 0 ? 'mt-4' : ''}>
                                <p><b className={'underline'}>{item.name}</b></p>
                                <p><b>{translatedMenu[item.menuKey].title}</b> {translatedMenu[item.menuKey].description}</p>
                                {menu[item.menuKey].price?.intern && <p>Intern: {menu[item.menuKey].price.intern}.- /
                                    Extern: {menu[item.menuKey].price.extern}.-</p>}
                                <p>{menu[item.menuKey].origin && <span> ({translatedMenu[item.menuKey].origin})</span>}</p>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-96">
                            <Image src={menuImages?.[item.imageKey]} width={500} height={500} alt={item.name} priority={true} />
                        </HoverCardContent>
                    </HoverCard>
                    ))}
            </CardContent>
        </Card>
    )
}

"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Image as ScrapedImage} from "@/app/api/scrape/cheerio/route";
import {useEffect, useState} from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "./ui/hover-card";
import Image from "next/image";

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

    const stringifiedMenu = JSON.stringify(menu);

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
    const stringifiedMenu = JSON.stringify(menu);
    return await fetch(`api/translate?object=${stringifiedMenu}&translationEngine=${translationEngine}`).then((response) => response.json());
}

export default function GenericMenuCard({menu, className, featured, menuItems, language, translationEngine}: GenericMenuProps) {
    const [translatedMenu, setTranslatedMenu] = useState<any>(menu);
    const [menuImages, setMenuImages] = useState<any>();
    const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const filteredMenuItems = menuItems.filter(item => {
            return menu[item.menuKey] !== undefined
        })
        setFilteredMenuItems(filteredMenuItems)
        const fetchData = async () => {
            const menuCopy = {...menu};
            delete menuCopy.day;
            const images = await getImages(menuCopy);
            console.log(images)
            const newMenuImages = filteredMenuItems.reduce((acc, item) => ({
                ...acc,
                [item.imageKey]: images[item.imageKey]?.original || ''
            }), {});

            console.log(newMenuImages)

            setMenuImages({
                day: menu.day,
                ...newMenuImages
            });
        };

        fetchData().catch(console.error);
    }, [menu, menuItems]);

    useEffect(() => {
        const fetchData = async () => {
            console.log(language)
            if (language === 'en') {
                // const translatedMenuItems = await Promise.all(filteredMenuItems.map(item => getTranslatedMenu(menu[item.menuKey])));
                // setFilteredMenuItems(translatedMenuItems)

                setTranslatedMenu(await getTranslatedMenu(menu, translationEngine))
            } else {
                setTranslatedMenu(menu)
            }
        }
        fetchData().catch(console.error);
    }, [language, menu, translationEngine])

    return (
        <Card className={`${className} ${featured ? 'border-black dark:border-white' : ''}`}>
            <CardHeader>
                {featured && <CardTitle><span className="underline">Heute</span> <span
                    className="text-lg">({menu.day})</span></CardTitle>}
                {!featured && <CardTitle>{menu.day}</CardTitle>}
            </CardHeader>
            <CardContent>
                {filteredMenuItems.map((item, index) => (
                    <HoverCard key={item.name}>
                        <HoverCardTrigger asChild>
                            <p className={index !== 0 ? 'mt-4' : ''}><b>{item.name}:</b> {translatedMenu[item.menuKey]}
                            </p>
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

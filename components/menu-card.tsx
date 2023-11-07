"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Image} from "@/app/api/scrape/cheerio/route";
import {useEffect, useState} from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "./ui/hover-card";

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
}

async function getImages(searchTerm: string): Promise<Image | undefined> {
    if (!searchTerm) return undefined;

    const abortController = new AbortController();

    return await fetch('api/scrape/cheerio?singleResult=true', {
        method: 'POST',
        body: JSON.stringify({searchTerm}),
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

export default function GenericMenuCard({menu, className, featured, menuItems}: GenericMenuProps) {
    const [menuImages, setMenuImages] = useState<any>();
    const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const filteredMenuItems = menuItems.filter(item => {
            return menu[item.menuKey] !== undefined
        })
        setFilteredMenuItems(filteredMenuItems)
        const fetchData = async () => {
            const imagePromises = filteredMenuItems.map(item => getImages(menu[item.menuKey]));
            const images = await Promise.all(imagePromises);
            const newMenuImages = filteredMenuItems.reduce((acc, item, index) => ({
                ...acc,
                [item.imageKey]: images[index]?.original || ''
            }), {});

            setMenuImages({
                day: menu.day,
                ...newMenuImages
            });
        };

        fetchData().catch(console.error);
    }, [menu]);

    return (
        <Card className={`${className} ${featured ? 'border border-white' : ''}`}>
            <CardHeader>
                {featured && <CardTitle><span className="underline">Heute</span> <span
                    className="text-lg">({menu.day})</span></CardTitle>}
                {!featured && <CardTitle>{menu.day}</CardTitle>}
            </CardHeader>
            <CardContent>
                {filteredMenuItems.map((item, index) => (
                    <HoverCard key={item.name}>
                        <HoverCardTrigger asChild>
                            <p className={index !== 0 ? 'mt-4' : ''}><b>{item.name}:</b> {menu[item.menuKey]}
                            </p>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-96">
                            <img src={menuImages?.[item.imageKey]} alt=""/>
                        </HoverCardContent>
                    </HoverCard>
                ))}
            </CardContent>
        </Card>
    )
}

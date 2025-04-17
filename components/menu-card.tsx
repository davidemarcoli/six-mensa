"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ScrapedImage } from "@/app/api/scrape/cheerio/route";
import { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import Image from "next/image";
import useStore from "@/lib/store";
import { Vegan } from "lucide-react";

interface MenuItem {
    title: string;
    description: string;
    type: string;
    dietaryType: string;
    price?: {
        intern: number;
        extern: number;
    };
    origin?: string;
    allergens?: string[];
    imagePath?: string;
}

interface Menu {
    day: string;
    date: string;
    menues: MenuItem[];
    [key: string]: any; // Allow for dynamic keys
}

interface GenericMenuProps {
    menu: Menu;
    featured?: boolean;
    className?: string;
}

async function getAPIBaseUrl(menu: Menu): Promise<any> {

    return await fetch(`api/api-base-url`, {
        next: {
            revalidate: 60 * 60 * 24
        },
    }).then((response) => response.json()).catch((error) => {
        return [];
    });
}

export default function GenericMenuCard({ menu, className, featured }: GenericMenuProps) {
    console.log(menu)
    const [apiBaseUrl, setApiBaseUrl] = useState<string | undefined>(undefined);

    const { color } = useStore();

    useEffect(() => {
        const fetchData = async () => {
            const apiBaseUrl = await getAPIBaseUrl(menu);
            setApiBaseUrl(apiBaseUrl.url);
        };

        fetchData().catch(console.error);
    }, [menu]);

    if (!menu || !menu.day) return <p>Loading...</p>;

    const formatPrice = (price: number) => {
        if (price === undefined || price === null) return '';
        return price.toFixed(2);
    }

    return (
        <Card style={{ borderColor: featured ? color : undefined }} className={`${className} ${featured ? `border-2` : ''}`} tabIndex={0}>
            <CardHeader>
                {/*{featured && <CardTitle><span className="underline">Heute</span> <span*/}
                {/*    className="text-lg">({menu.day})</span></CardTitle>}*/}
                {/*{!featured && <CardTitle>{menu.day}</CardTitle>}*/}
                <CardTitle>{menu.day} <span className="text-sm">({menu.date})</span></CardTitle>
            </CardHeader>
            <CardContent>
                {menu.menues.map((item, index) => (
                    <MenuWrapper key={item.title} item={item} apiBaseUrl={apiBaseUrl || ''}>
                        <div className={index !== 0 ? 'mt-4' : ''}>
                            <p className="flex items-center gap-4">
                                <b className={'underline'}>{item.type}</b>
                                <span className="text-xs">
                                    {item.price && <p>{formatPrice(item.price.intern)}.- / {formatPrice(item.price.extern)}.-</p>}
                                </span>
                                {item.dietaryType == "vegan" && <Vegan className={'text-green-500'} size={20} />}
                            </p>
                            <p><b>{item.title}</b> {item.description}</p>
                            <p>{item.origin && <span> ({item.origin})</span>}</p>
                            {item.allergens && item.allergens.length > 0 && <span className={'text-gray-500 text-sm'}> (Allergen: {item.allergens.join(', ')})</span>}
                        </div>
                    </MenuWrapper>
                ))}
            </CardContent>
        </Card>
    )
}

function MenuWrapper({ item, children, apiBaseUrl }: { item: MenuItem, children: React.ReactNode, apiBaseUrl: string }) {
    return (
        <>
            {item.imagePath ? (
                <HoverCard>
                    <HoverCardTrigger asChild>
                        {children}
                    </HoverCardTrigger>
                    <HoverCardContent className="w-96">
                        <Image src={apiBaseUrl + item.imagePath} width={500} height={500} alt={item.title} priority={true} />
                    </HoverCardContent>
                </HoverCard>
            ) : (
                <>
                    {children}
                </>
            )}
        </>
    );
}
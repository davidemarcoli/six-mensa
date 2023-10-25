"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Image} from "@/app/api/scrape/cheerio/route";
import {useEffect, useState} from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "./ui/hover-card";
import {HT201Menu} from "@/app/_components/ht201-page";

interface MenuCardHT201Props {
    menu: HT201Menu;
    featured?: boolean;
    className?: string;
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


export default function MenuCardHT201({menu, className, featured}: MenuCardHT201Props) {

    //const [images, setImages] = useState<Image[]>([]);
    const [menuImages, setMenuImages] = useState<HT201Menu>();

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {

            //console.log(menu)

            const {
                Local,
                Global,
                Vegi,
                PizzaPasta
            } = await Promise.all([getImages(menu.Local), getImages(menu.Global || ""), getImages(menu.Vegi), getImages(menu["Pizza & Pasta"])]).then((values) => {
                return {
                    Local: values[0],
                    Global: values[1],
                    Vegi: values[2],
                    PizzaPasta: values[3]
                }
            });

            console.log(Vegi)

            const menuImages: HT201Menu = {
                day: menu.day,
                Global: menu.Global ? Global!.original : '',
                Local: Local!.original,
                Vegi: Vegi!.original,
                "Pizza & Pasta": menu["Pizza & Pasta"] ? PizzaPasta!.original : ''
            }

            setMenuImages(menuImages);
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, []);

    useEffect(() => {
        //console.log(images)
    }, [menuImages]);

    // const images = await getImages(menu.Local);
    //console.log("Images received: ", images.length, "for", menu.Local, "menu")

    return (
        <Card className={className}>
            <CardHeader>
                {featured && <CardTitle><span className="underline">Heute</span> <span
                    className="text-lg">({menu.day})</span></CardTitle>}
                {!featured && <CardTitle>{menu.day}</CardTitle>}
            </CardHeader>
            <CardContent>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <p><b>Local:</b> {menu.Local}</p>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-96">
                        <img src={menuImages?.Local} alt=""/>
                    </HoverCardContent>
                </HoverCard>
                {menu.Global && <HoverCard><HoverCardTrigger asChild><p className="mt-4">
                    <b>Global:</b> {menu.Global}</p></HoverCardTrigger><HoverCardContent
                    className="w-96">
                    <img src={menuImages?.Global} alt=""/>
                </HoverCardContent></HoverCard>}
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <p className="mt-4"><b>Vegi:</b> {menu.Vegi}</p>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-96">
                        <img src={menuImages?.Vegi} alt=""/>
                    </HoverCardContent>
                </HoverCard>
                {menu["Pizza & Pasta"] && <HoverCard><HoverCardTrigger asChild><p className="mt-4">
                    <b>Pizza & Pasta:</b> {menu["Pizza & Pasta"]}</p></HoverCardTrigger><HoverCardContent
                    className="w-96">
                    <img src={menuImages ? menuImages["Pizza & Pasta"] : ''} alt=""/>
                </HoverCardContent></HoverCard>}
                {/*{menuImages?.Local && <img src={menuImages.Local} alt=""/>}*/}
            </CardContent>
        </Card>
    )
}
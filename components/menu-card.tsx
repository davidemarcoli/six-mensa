"use client";

import {Menu} from "@/app/fetch/page";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Image} from "@/app/api/scrape/cheerio/route";
import {useEffect, useState} from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "./ui/hover-card";

interface MenuCardProps {
    menu: Menu;
    featured?: boolean;
    className?: string;
}

async function getImages(searchTerm: string): Promise<Image[]> {
    if (!searchTerm) return [];

    const abortController = new AbortController();

    return await fetch('http://localhost:3000/api/scrape/cheerio/', {
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


export default function MenuCard({menu, className, featured}: MenuCardProps) {

    //const [images, setImages] = useState<Image[]>([]);
    const [menuImages, setMenuImages] = useState<Menu>();

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {

            const {
                Local,
                Vegi,
                Globetrotter,
                Buffet
            } = await Promise.all([getImages(menu.Local), getImages(menu.Vegi), getImages(menu.Globetrotter || ""), getImages(menu.Buffet + " food buffet" || "")]).then((values) => {
                return {
                    Local: values[0],
                    Vegi: values[1],
                    Globetrotter: values[2],
                    Buffet: values[3]
                }
            });

            const menuImages: Menu = {
                day: menu.day,
                Local: Local[0].original,
                Vegi: Vegi[0].original,
                Globetrotter: menu.Globetrotter ? Globetrotter[0].original : '',
                Buffet: menu.Buffet ? Buffet[0].original : ''
            }

            setMenuImages(menuImages);
            //setImages(await getImages(menu.Local));
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
                    <HoverCardContent className="w-80">
                        <img src={menuImages?.Local} alt=""/>
                    </HoverCardContent>
                </HoverCard>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <p className="mt-4"><b>Vegi:</b> {menu.Vegi}</p>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <img src={menuImages?.Vegi} alt=""/>
                    </HoverCardContent>
                </HoverCard>
                {menu.Globetrotter && <HoverCard><HoverCardTrigger asChild><p className="mt-4">
                    <b>Globetrotter:</b> {menu.Globetrotter}</p></HoverCardTrigger><HoverCardContent
                    className="w-80">
                    <img src={menuImages?.Globetrotter} alt=""/>
                </HoverCardContent></HoverCard>}
                {menu.Buffet && <HoverCard><HoverCardTrigger asChild><p className="mt-4">
                    <b>Buffet:</b> {menu.Buffet}</p></HoverCardTrigger><HoverCardContent
                    className="w-80">
                    <img src={menuImages?.Buffet} alt=""/>
                </HoverCardContent></HoverCard>}
                {/*{menuImages?.Local && <img src={menuImages.Local} alt=""/>}*/}
            </CardContent>
        </Card>
    )
}
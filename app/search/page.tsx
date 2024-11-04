"use client";

import {useEffect, useState} from "react";
import {Image} from "@/app/api/scrape/cheerio/route";

async function getImages(searchTerm: string) {
    return await fetch('api/scrape/cheerio', {
        method: 'POST',
        body: JSON.stringify({searchTerm})
    }).then((response) => response.json());
}

export default function Home() {

    const [images, setImages] = useState<Image[]>([]);

    const handleSearch = async (event: any) => {
        if (event.key !== 'Enter') return;
        const searchTerm = event.target.value;
        const images = await getImages(searchTerm);
        setImages(images);
    }

    useEffect(() => {
        const fetchData = async () => {
            const images = await getImages('donald duck');
            setImages(images);
        }
        fetchData()
            .catch(console.error);
    }, []);

    return (
        <>
            {/*<p>{JSON.stringify(images)}</p>*/}
            <input type="text" onKeyDown={handleSearch}/>
            {images.map((image: any, i: number) => {
                return (
                    <img key={i} src={image.original} alt=""/>
                )
            })}
        </>
    )
}

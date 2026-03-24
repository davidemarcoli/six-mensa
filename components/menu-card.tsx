"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import useStore from "@/lib/store";
import { Vegan } from "lucide-react";

export interface MenuItem {
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

export interface Menu {
    day: string;
    date: string;
    menues: MenuItem[];
}

interface GenericMenuProps {
    menu: Menu;
    featured?: boolean;
    className?: string;
}

export default function GenericMenuCard({ menu, className, featured }: GenericMenuProps) {
    const { color } = useStore();

    if (!menu || !menu.day) return <p>Loading...</p>;

    const formatPrice = (price: number) => {
        if (price === undefined || price === null) return '';
        return price.toFixed(2);
    }

    return (
        <Card style={{ borderColor: featured ? color : undefined }} className={`${className} ${featured ? `border-2` : ''}`} tabIndex={0}>
            <CardHeader>
                <CardTitle>{menu.day} <span className="text-sm">({menu.date})</span></CardTitle>
            </CardHeader>
            <CardContent>
                {menu.menues.map((item, index) => (
                    <div key={item.title} className={index !== 0 ? 'mt-4' : ''}>
                        <div className="flex items-center gap-4">
                            <b className={'underline'}>{item.type}</b>
                            <span className="text-xs">
                                {item.price && <p>{formatPrice(item.price.intern)}.- / {formatPrice(item.price.extern)}.-</p>}
                            </span>
                            {item.dietaryType === "vegan" && <Vegan className={'text-green-500'} size={20} />}
                        </div>
                        <p><b>{item.title}</b> {item.description}</p>
                        <p>{item.origin && <span> ({item.origin})</span>}</p>
                        {item.allergens && item.allergens.length > 0 && <span className={'text-gray-500 text-sm'}> (Allergen: {item.allergens.join(', ')})</span>}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

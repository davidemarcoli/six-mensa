"use client";

import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { type FlatMenuItem } from "./stats-dashboard";
import { tooltipStyle } from "./utils";

interface AllergenStatsProps {
    items: FlatMenuItem[];
}

export default function AllergenStats({ items }: AllergenStatsProps) {
    const data = useMemo(() => {
        const counts = new Map<string, number>();
        for (const item of items) {
            if (!item.allergens) continue;
            for (const allergen of item.allergens) {
                const key = allergen.trim();
                if (key) counts.set(key, (counts.get(key) || 0) + 1);
            }
        }
        return Array.from(counts.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([name, count]) => ({ name, count }));
    }, [items]);

    if (data.length === 0) return <p className="text-muted-foreground text-sm">No allergen data available</p>;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={11} angle={-45} textAnchor="end" height={80} />
                <YAxis fontSize={12} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="count" fill="#f59e0b" />
            </BarChart>
        </ResponsiveContainer>
    );
}

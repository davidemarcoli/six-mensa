"use client";

import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { type FlatMenuItem } from "./stats-dashboard";
import { tooltipStyle } from "./utils";

interface PriceChartProps {
    items: FlatMenuItem[];
}

export default function PriceChart({ items }: PriceChartProps) {
    const data = useMemo(() => {
        const monthMap = new Map<string, { prices: number[]; types: Map<string, number[]> }>();

        for (const item of items) {
            if (!item.price || item.price.intern <= 0) continue;
            const key = `${item.year}-${String(item.month).padStart(2, "0")}`;

            if (!monthMap.has(key)) {
                monthMap.set(key, { prices: [], types: new Map() });
            }
            const entry = monthMap.get(key)!;
            entry.prices.push(item.price.intern);

            if (!entry.types.has(item.type)) {
                entry.types.set(item.type, []);
            }
            entry.types.get(item.type)!.push(item.price.intern);
        }

        return Array.from(monthMap.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([month, { prices, types }]) => {
                const avg = prices.reduce((s, p) => s + p, 0) / prices.length;
                const result: Record<string, any> = {
                    month: month.slice(2), // "25-04" format
                    avg: +avg.toFixed(2),
                };
                for (const [type, typePrices] of Array.from(types.entries())) {
                    result[type] = +(typePrices.reduce((s, p) => s + p, 0) / typePrices.length).toFixed(2);
                }
                return result;
            });
    }, [items]);

    const allTypes = useMemo(() => {
        const types = new Set<string>();
        data.forEach((d) => {
            Object.keys(d).forEach((k) => {
                if (k !== "month" && k !== "avg") types.add(k);
            });
        });
        return Array.from(types).sort();
    }, [data]);

    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c43", "#a4de6c", "#d0ed57"];

    if (data.length === 0) return <p className="text-muted-foreground text-sm">No price data available</p>;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} domain={["auto", "auto"]} />
                <Tooltip {...tooltipStyle} />
                <Legend />
                <Line type="monotone" dataKey="avg" stroke="#de3919" strokeWidth={2} name="Average" dot={false} />
                {allTypes.map((type, i) => (
                    <Line
                        key={type}
                        type="monotone"
                        dataKey={type}
                        stroke={colors[i % colors.length]}
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        name={type}
                        dot={false}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}

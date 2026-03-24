"use client";

import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { type FlatMenuItem } from "./stats-dashboard";
import { tooltipStyle } from "./utils";

interface DishFrequencyProps {
    items: FlatMenuItem[];
}

export default function DishFrequency({ items }: DishFrequencyProps) {
    const [showChart, setShowChart] = useState(true);

    const dishCounts = useMemo(() => {
        const counts = new Map<string, number>();
        for (const item of items) {
            const key = item.title.trim();
            counts.set(key, (counts.get(key) || 0) + 1);
        }
        return Array.from(counts.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([name, count]) => ({ name, count }));
    }, [items]);

    const top20 = dishCounts.slice(0, 20);

    if (top20.length === 0) return <p className="text-muted-foreground text-sm">No data available</p>;

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <button
                    className={`text-xs px-2 py-1 rounded ${showChart ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    onClick={() => setShowChart(true)}
                >
                    Chart
                </button>
                <button
                    className={`text-xs px-2 py-1 rounded ${!showChart ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    onClick={() => setShowChart(false)}
                >
                    Table
                </button>
            </div>

            {showChart ? (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={top20} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" fontSize={12} />
                        <YAxis dataKey="name" type="category" width={150} fontSize={11} tick={{ width: 140 }} />
                        <Tooltip {...tooltipStyle} />
                        <Bar dataKey="count" fill="#de3919" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="max-h-96 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-1 pr-2">#</th>
                                <th className="text-left py-1">Dish</th>
                                <th className="text-right py-1">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dishCounts.slice(0, 50).map((dish, i) => (
                                <tr key={dish.name} className="border-b last:border-0">
                                    <td className="py-1 pr-2 text-muted-foreground">{i + 1}</td>
                                    <td className="py-1">{dish.name}</td>
                                    <td className="py-1 text-right font-mono">{dish.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

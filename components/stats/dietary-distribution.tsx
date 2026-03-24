"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { type FlatMenuItem } from "./stats-dashboard";
import { tooltipStyle } from "./utils";

interface DietaryDistributionProps {
    items: FlatMenuItem[];
}

const COLORS: Record<string, string> = {
    meat: "#ef4444",
    vegetarian: "#22c55e",
    vegan: "#16a34a",
};

const LABELS: Record<string, string> = {
    meat: "Meat",
    vegetarian: "Vegetarian",
    vegan: "Vegan",
};

export default function DietaryDistribution({ items }: DietaryDistributionProps) {
    const data = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const item of items) {
            const key = item.dietaryType || "unknown";
            counts[key] = (counts[key] || 0) + 1;
        }
        return Object.entries(counts)
            .map(([name, value]) => ({
                name: LABELS[name] || name,
                value,
                key: name,
            }))
            .sort((a, b) => b.value - a.value);
    }, [items]);

    const total = data.reduce((s, d) => s + d.value, 0);

    if (data.length === 0) return <p className="text-muted-foreground text-sm">No data available</p>;

    return (
        <div className="space-y-4">
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name} (${((value / total) * 100).toFixed(0)}%)`}
                    >
                        {data.map((entry) => (
                            <Cell key={entry.key} fill={COLORS[entry.key] || "#888"} />
                        ))}
                    </Pie>
                    <Tooltip {...tooltipStyle} formatter={(value) => [`${value} (${((Number(value) / total) * 100).toFixed(1)}%)`, "Count"]} />
                </PieChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-3 gap-4 text-center">
                {data.map((d) => (
                    <div key={d.key} className="p-2 rounded border">
                        <div className="text-2xl font-bold" style={{ color: COLORS[d.key] || "#888" }}>
                            {d.value}
                        </div>
                        <div className="text-sm text-muted-foreground">{d.name}</div>
                        <div className="text-xs text-muted-foreground">{((d.value / total) * 100).toFixed(1)}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

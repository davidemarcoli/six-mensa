"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loading-spinner";
import PriceChart from "./price-chart";
import DishFrequency from "./dish-frequency";
import DietaryDistribution from "./dietary-distribution";
import AllergenStats from "./allergen-stats";
import SearchFilter, { type Filters } from "./search-filter";
import { normalizeMenuType } from "./utils";

interface MenuItem {
    title: string;
    description: string;
    type: string;
    dietaryType: string;
    price?: { intern: number; extern: number };
    origin?: string;
    allergens?: string[];
}

interface DailyMenu {
    day: string;
    date: string;
    menues: MenuItem[];
}

interface HistoryEntry {
    restaurant: string;
    year: number;
    month: number;
    week: number;
    data: DailyMenu[];
}

export interface FlatMenuItem extends MenuItem {
    restaurant: string;
    year: number;
    month: number;
    week: number;
    day: string;
    date: string;
}

export default function StatsDashboard() {
    const [historyData, setHistoryData] = useState<HistoryEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<Filters>({
        search: "",
        restaurant: "all",
        menuType: "all",
        dietaryType: "all",
        fromMonth: "",
        toMonth: "",
    });
    const router = useRouter();

    useEffect(() => {
        fetch("/api/history")
            .then((res) => res.json())
            .then((data) => {
                setHistoryData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load history:", err);
                setLoading(false);
            });
    }, []);

    const flatItems: FlatMenuItem[] = useMemo(() => {
        const items: FlatMenuItem[] = [];
        for (const entry of historyData) {
            for (const day of entry.data) {
                for (const menu of day.menues) {
                    items.push({
                        ...menu,
                        type: normalizeMenuType(menu.type),
                        restaurant: entry.restaurant,
                        year: entry.year,
                        month: entry.month,
                        week: entry.week,
                        day: day.day,
                        date: day.date,
                    });
                }
            }
        }
        return items;
    }, [historyData]);

    const filteredItems = useMemo(() => {
        return flatItems.filter((item) => {
            if (filters.restaurant !== "all" && item.restaurant !== filters.restaurant) return false;
            if (filters.menuType !== "all" && item.type !== filters.menuType) return false;
            if (filters.dietaryType !== "all" && item.dietaryType !== filters.dietaryType) return false;

            if (filters.fromMonth) {
                const itemDate = `${item.year}-${String(item.month).padStart(2, "0")}`;
                if (itemDate < filters.fromMonth) return false;
            }
            if (filters.toMonth) {
                const itemDate = `${item.year}-${String(item.month).padStart(2, "0")}`;
                if (itemDate > filters.toMonth) return false;
            }

            if (filters.search) {
                const q = filters.search.toLowerCase();
                const searchable = `${item.title} ${item.description} ${item.origin || ""}`.toLowerCase();
                if (!searchable.includes(q)) return false;
            }

            return true;
        });
    }, [flatItems, filters]);

    const menuTypes = useMemo(() => {
        const types = new Set<string>();
        flatItems.forEach((item) => types.add(item.type));
        return Array.from(types).sort();
    }, [flatItems]);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-4 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-bold">Menu Statistics</h1>
                <span className="text-sm text-muted-foreground">
                    {filteredItems.length} of {flatItems.length} menu items
                </span>
            </div>

            <SearchFilter filters={filters} onFiltersChange={setFilters} menuTypes={menuTypes} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Price Trends (Internal)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PriceChart items={filteredItems} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Dietary Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DietaryDistribution items={filteredItems} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Most Common Dishes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DishFrequency items={filteredItems} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Allergen Frequency</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AllergenStats items={filteredItems} />
                    </CardContent>
                </Card>
            </div>

            {filters.search && filteredItems.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Search Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {filteredItems.slice(0, 50).map((item, i) => (
                                <div key={i} className="border-b pb-2 last:border-0">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className="font-medium">{item.restaurant.toUpperCase()}</span>
                                        <span>{item.day} {item.date}</span>
                                        <span className="px-1.5 py-0.5 rounded bg-muted text-xs">{item.type}</span>
                                        <span className="px-1.5 py-0.5 rounded bg-muted text-xs">{item.dietaryType}</span>
                                    </div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                    {item.price?.intern != null && item.price?.extern != null  && (
                                        <p className="text-sm">{item.price.intern.toFixed(2)}.- / {item.price.extern.toFixed(2)}.-</p>
                                    )}
                                </div>
                            ))}
                            {filteredItems.length > 50 && (
                                <p className="text-sm text-muted-foreground text-center">
                                    Showing 50 of {filteredItems.length} results
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

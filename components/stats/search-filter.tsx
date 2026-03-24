"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export interface Filters {
    search: string;
    restaurant: string;
    menuType: string;
    dietaryType: string;
    fromMonth: string;
    toMonth: string;
}

interface SearchFilterProps {
    filters: Filters;
    onFiltersChange: (filters: Filters) => void;
    menuTypes: string[];
}

export default function SearchFilter({ filters, onFiltersChange, menuTypes }: SearchFilterProps) {
    const update = (key: keyof Filters, value: string) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    return (
        <div className="space-y-4 p-4 border rounded-lg">
            <div>
                <Label htmlFor="search">Search</Label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search dishes, ingredients, origins..."
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                    value={filters.search}
                    onChange={(e) => update("search", e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <Label htmlFor="restaurant">Restaurant</Label>
                    <Select value={filters.restaurant} onValueChange={(v) => update("restaurant", v)}>
                        <SelectTrigger id="restaurant" className="mt-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="htp">HTP</SelectItem>
                            <SelectItem value="ht201">HT201</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="menuType">Menu Type</Label>
                    <Select value={filters.menuType} onValueChange={(v) => update("menuType", v)}>
                        <SelectTrigger id="menuType" className="mt-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {menuTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="dietaryType">Dietary Type</Label>
                    <Select value={filters.dietaryType} onValueChange={(v) => update("dietaryType", v)}>
                        <SelectTrigger id="dietaryType" className="mt-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="meat">Meat</SelectItem>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <Label htmlFor="fromMonth">From</Label>
                        <input
                            type="month"
                            id="fromMonth"
                            className="w-full mt-1 px-2 py-2 border rounded-md bg-background text-sm"
                            value={filters.fromMonth}
                            onChange={(e) => update("fromMonth", e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="toMonth">To</Label>
                        <input
                            type="month"
                            id="toMonth"
                            className="w-full mt-1 px-2 py-2 border rounded-md bg-background text-sm"
                            value={filters.toMonth}
                            onChange={(e) => update("toMonth", e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

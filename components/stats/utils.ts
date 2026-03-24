// Normalize the many menu type variants into canonical groups
const TYPE_GROUPS: [string, string[]][] = [
    ["Local", ["local"]],
    ["Climate", ["climate", "klima", "vegetarian", "veggi", "veggie", "vegi"]],
    ["Global", ["global", "globetrotter"]],
    ["Pizza & Pasta", ["pizza"]],
];

export function normalizeMenuType(raw: string): string {
    const lower = raw.toLowerCase();
    for (const [canonical, keywords] of TYPE_GROUPS) {
        if (keywords.some((kw) => lower.includes(kw))) {
            return canonical;
        }
    }
    return raw; // keep as-is if no match (e.g. "Buffet")
}

// Recharts tooltip style that works in both light and dark mode
export const tooltipStyle = {
    contentStyle: {
        backgroundColor: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: "var(--radius, 0.5rem)",
        color: "hsl(var(--card-foreground))",
    },
    labelStyle: {
        color: "hsl(var(--card-foreground))",
    },
};

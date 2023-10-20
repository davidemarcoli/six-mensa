import {Menu} from "@/app/fetch/page";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface MenuCardProps {
    menu: Menu;
    featured?: boolean;
    className?: string;
}

export default function MenuCard({menu, className, featured}: MenuCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                {featured && <CardTitle><span className="underline">Heute</span> <span
                    className="text-lg">({menu.day})</span></CardTitle>}
                {!featured && <CardTitle>{menu.day}</CardTitle>}
            </CardHeader>
            <CardContent>
                <p><b>Local:</b> {menu.Local}</p>
                <p className="mt-4"><b>Vegi:</b> {menu.Vegi}</p>
                {menu.Globetrotter && <p className="mt-4"><b>Globetrotter:</b> {menu.Globetrotter}</p>}
                {menu.Buffet && <p className="mt-4"><b>Buffet:</b> {menu.Buffet}</p>}
            </CardContent>
        </Card>
    )
}
"use client";

import {ModeToggle} from "@/components/theme-toggle";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Nav() {

    const [checked, setChecked] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    console.log(pathname)

    useEffect(() => {
        if (pathname === '/fetch' || pathname === '/') {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }, []);

    function onModeToggle(checked: boolean) {
        console.log(checked)
        setChecked(checked)
        if (checked) {
            router.push('/fetch')
        } else {
            router.push('/pdf')
        }
    }

    return (
        <>
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <nav className="flex items-center space-x-4 lg:space-x-6">
                        <span>SIX Menus</span>
                        <Label htmlFor="mode-toggle">View Mode: <span className={`${!checked ? 'underline' : ''}`}>PDF</span> | <span className={`${checked ? 'underline' : ''}`}>Text</span></Label>
                        <Switch id="mode-toggle" checked={checked} onCheckedChange={onModeToggle}/>
                        {/*<Link*/}
                        {/*    href="/fetch"*/}
                        {/*    className="text-sm font-medium transition-colors hover:text-primary"*/}
                        {/*>*/}
                        {/*    API*/}
                        {/*</Link>*/}
                        {/*<Link*/}
                        {/*    href="/pdf"*/}
                        {/*    className="text-sm font-medium transition-colors hover:text-primary"*/}
                        {/*>*/}
                        {/*    PDF*/}
                        {/*</Link>*/}
                    </nav>
                    <div className="ml-auto flex items-center space-x-4">
                        <ModeToggle/>
                    </div>
                </div>
            </div>
        </>
    )
}

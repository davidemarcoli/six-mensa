"use client";

import {ModeToggle} from "@/components/theme-toggle";
import {Label} from "./ui/label";
import {Switch} from "./ui/switch";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";

export default function Nav() {

    const [checkedMode, setCheckedMode] = useState(false);
    const [checkedMensa, setCheckedMensa] = useState(false);

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    useEffect(() => {
        if (searchParams.get('viewMode') === 'text' || searchParams.get('viewMode') === '') {
            setCheckedMode(true)
        } else {
            setCheckedMode(false)
        }
        if (searchParams.get('mensa') === 'htp' || searchParams.get('mensa') === '') {
            setCheckedMensa(true)
        } else {
            setCheckedMensa(false)
        }
    }, []);

    function onModeToggle(checked: boolean) {
        setCheckedMode(checked)
        if (checked) {
            router.push(pathname + '?' + createQueryString('viewMode', 'text'))
        } else {
            console.log(pathname + '?' + createQueryString('viewMode', 'pdf'))
            router.push(pathname + '?' + createQueryString('viewMode', 'pdf'))
        }
    }

    function onMensaToggle(checked: boolean) {
        setCheckedMensa(checked)
        if (checked) {
            router.push(pathname + '?' + createQueryString('mensa', 'htp'))
        } else {
            router.push(pathname + '?' + createQueryString('mensa', 'ht201'))
        }
    }

    return (
        <>
            <div className="border-b sticky top-0 bg-background">
                <div className="flex h-16 items-center px-4">
                    <nav className="flex items-center space-x-4 lg:space-x-6">
                        <span>SIX Menus</span>
                        <Label htmlFor="mode-toggle">View Mode: <span
                            className={`${!checkedMode ? 'underline' : ''}`}>PDF</span> | <span
                            className={`${checkedMode ? 'underline' : ''}`}>Text</span></Label>
                        <Switch id="mode-toggle" checked={checkedMode} onCheckedChange={onModeToggle}/>
                        <Label htmlFor="mensa-toggle">Mensa: <span
                            className={`${!checkedMensa ? 'underline' : ''}`}>HT201</span> | <span
                            className={`${checkedMensa ? 'underline' : ''}`}>HTP</span></Label>
                        <Switch id="mensa-toggle" checked={checkedMensa} onCheckedChange={onMensaToggle}/>
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

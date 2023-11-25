"use client";

import {ModeToggle} from "@/components/theme/theme-toggle";
import {Label} from "../ui/label";
import {Switch} from "../ui/switch";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {Settings} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Nav() {

    // const [language] = useLocalStorage('language', 'de');
    // const [translationEngine] = useLocalStorage('translationEngine', 'myMemory');

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
        if (!searchParams.get('viewMode') || searchParams.get('viewMode') === 'text') {
            onModeToggle(true)
        } else {
            onModeToggle(false)
        }
        if (!searchParams.get('mensa') || searchParams.get('mensa') === 'htp') {
            onMensaToggle(true)
        } else {
            onMensaToggle(false)
        }
    }, []);

    function onModeToggle(checked: boolean) {
        setCheckedMode(checked)
        if (checked) {
            router.push(pathname + '?' + createQueryString('viewMode', 'text'))
        } else {
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
                        <Link href={"/"}>SIX Menus</Link>
                        <Label htmlFor="mode-toggle">View Mode: <span
                            className={`${!checkedMode ? 'font-extrabold' : ''}`}>PDF</span> | <span
                            className={`${checkedMode ? 'font-extrabold' : ''}`}>Text</span></Label>
                        <Switch id="mode-toggle" checked={checkedMode} onCheckedChange={onModeToggle}/>
                        <Label htmlFor="mensa-toggle">Mensa: <span
                            className={`${!checkedMensa ? 'font-extrabold' : ''}`}>HT201</span> | <span
                            className={`${checkedMensa ? 'font-extrabold' : ''}`}>HTP</span></Label>
                        <Switch id="mensa-toggle" checked={checkedMensa} onCheckedChange={onMensaToggle}/>
                        {/*{language === 'en' && (*/}
                        {/*    <>*/}
                        {/*        <span>Using Translation Engine: {translationEngine === 'myMemory' ? 'My Memory' : 'Libre Translate'}</span>*/}
                        {/*    </>*/}
                        {/*)}*/}
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
                        <Button variant="outline" size="icon" onClick={() => router.push('/settings')}>
                            <Settings className="h-6 w-6"/>
                        </Button>
                        <ModeToggle/>
                    </div>
                </div>
            </div>
        </>
    )
}

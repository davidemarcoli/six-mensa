"use client";

import {ModeToggle} from "@/components/theme/theme-toggle";
import {Label} from "../ui/label";
import {Switch} from "../ui/switch";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {Menu, Settings} from "lucide-react";
import {Button} from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";

export default function NewNav() {

    // const [language] = useLocalStorage('language', 'de');
    // const [translationEngine] = useLocalStorage('translationEngine', 'myMemory');

    const [checkedMode, setCheckedMode] = useState(false);
    const [checkedMensa, setCheckedMensa] = useState(false);

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!
    const scrolled = useScroll(50);

    const routes = [
        {
            href: "/",
            label: "Menu"
        },
        {
            href: "/compare",
            label: "Compare"
        },
    ];

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
            {/*<div className="border-b sticky top-0 bg-background">*/}
            {/*    <div className="flex h-16 items-center px-4">*/}
            {/*        <nav className="flex items-center space-x-4 lg:space-x-6">*/}
            {/*            <Link href={"/"}>SIX Menus</Link>*/}
            {/*            <Label htmlFor="mode-toggle">View Mode: <span*/}
            {/*                className={`${!checkedMode ? 'font-extrabold' : ''}`}>PDF</span> | <span*/}
            {/*                className={`${checkedMode ? 'font-extrabold' : ''}`}>Text</span></Label>*/}
            {/*            <Switch id="mode-toggle" checked={checkedMode} onCheckedChange={onModeToggle}/>*/}
            {/*            <Label htmlFor="mensa-toggle">Mensa: <span*/}
            {/*                className={`${!checkedMensa ? 'font-extrabold' : ''}`}>HT201</span> | <span*/}
            {/*                className={`${checkedMensa ? 'font-extrabold' : ''}`}>HTP</span></Label>*/}
            {/*            <Switch id="mensa-toggle" checked={checkedMensa} onCheckedChange={onMensaToggle}/>*/}
            {/*            /!*{language === 'en' && (*!/*/}
            {/*            /!*    <>*!/*/}
            {/*            /!*        <span>Using Translation Engine: {translationEngine === 'myMemory' ? 'My Memory' : 'Libre Translate'}</span>*!/*/}
            {/*            /!*    </>*!/*/}
            {/*            /!*)}*!/*/}
            {/*            /!*<Link*!/*/}
            {/*            /!*    href="/fetch"*!/*/}
            {/*            /!*    className="text-sm font-medium transition-colors hover:text-primary"*!/*/}
            {/*            /!*>*!/*/}
            {/*            /!*    API*!/*/}
            {/*            /!*</Link>*!/*/}
            {/*            /!*<Link*!/*/}
            {/*            /!*    href="/pdf"*!/*/}
            {/*            /!*    className="text-sm font-medium transition-colors hover:text-primary"*!/*/}
            {/*            /!*>*!/*/}
            {/*            /!*    PDF*!/*/}
            {/*            /!*</Link>*!/*/}
            {/*        </nav>*/}
            {/*        <div className="ml-auto flex items-center space-x-4">*/}
            {/*            <Button variant="outline" size="icon" onClick={() => router.push('/settings')}>*/}
            {/*                <Settings className="h-6 w-6"/>*/}
            {/*            </Button>*/}
            {/*            <ModeToggle/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}




            <header className="sm:flex sm:justify-between">
                <div
                    className={`fixed top-0 flex w-full justify-center ${
                        scrolled ? "backdrop-blur-xl" : "bg-white/0"
                    } z-30 px-4 transition-all`}
                >
                    <div className="flex items-center">
                        <Sheet>
                            <SheetTrigger>
                                <Menu className="h-6 w-6 lg:hidden" />
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                <nav className="flex flex-col gap-4">
                                    {routes.map((route, i) => (
                                        <Link
                                            key={i}
                                            href={route.href}
                                            className="block px-2 py-1 text-lg"
                                        >
                                            {route.label}
                                        </Link>
                                    ))}
                                    <div>
                                        <Label htmlFor="mode-toggle">View Mode: <span
                                            className={`${!checkedMode ? 'font-extrabold' : ''}`}>PDF</span> | <span
                                            className={`${checkedMode ? 'font-extrabold' : ''}`}>Text</span></Label>
                                        <Switch id="mode-toggle" className={'ml-4'} checked={checkedMode} onCheckedChange={onModeToggle}/>
                                    </div>
                                    <div>
                                        <Label htmlFor="mensa-toggle">Mensa: <span
                                            className={`${!checkedMensa ? 'font-extrabold' : ''}`}>HT201</span> | <span
                                            className={`${checkedMensa ? 'font-extrabold' : ''}`}>HTP</span></Label>
                                        <Switch id="mensa-toggle" className={'ml-4'} checked={checkedMensa} onCheckedChange={onMensaToggle}/>
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="flex h-16 w-full items-center justify-between">
                        <Link href="/" className="font-display flex items-center text-2xl ml-4 lg:ml-0">
                            <p>SIX Menus</p>
                        </Link>
                        <nav className="mx-6 flex hidden items-center space-x-4 lg:block">
                            {routes.map((route, i) => (
                                <Link href={route.href} key={i}>
                                    <Button variant={"ghost"}>{route.label}</Button>
                                </Link>
                            ))}
                            <Label htmlFor="mode-toggle">View Mode: <span
                                className={`${!checkedMode ? 'font-extrabold' : ''}`}>PDF</span> | <span
                                className={`${checkedMode ? 'font-extrabold' : ''}`}>Text</span></Label>
                            <Switch id="mode-toggle" checked={checkedMode} onCheckedChange={onModeToggle}/>
                            <Label htmlFor="mensa-toggle">Mensa: <span
                                className={`${!checkedMensa ? 'font-extrabold' : ''}`}>HT201</span> | <span
                                className={`${checkedMensa ? 'font-extrabold' : ''}`}>HTP</span></Label>
                            <Switch id="mensa-toggle" checked={checkedMensa} onCheckedChange={onMensaToggle}/>
                        </nav>
                        <div className={'ml-auto flex items-center space-x-4'}>
                        <Button variant="outline" size="icon" onClick={() => router.push('/settings')}>
                            <Settings className="h-6 w-6"/>
                        </Button>
                        <ModeToggle/>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

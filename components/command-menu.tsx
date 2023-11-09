"use client";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut
} from "@/components/ui/command";
import {
    Calculator,
    Calendar,
    CreditCard,
    LayoutList,
    LogIn,
    LogOut,
    PlusSquare,
    Settings,
    Smile,
    User
} from "lucide-react";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useLocalStorage} from "usehooks-ts";
export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const [language, setLanguage] = useLocalStorage('language', 'de');
    const [translationEngine, setTranslationEngine] = useLocalStorage('translationEngine', 'libreTranslate');

    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const navigate = (path: string) => {
        router.push(path);
        setOpen(false);
    }

    const setLanguageStorage = (language: string) => {
        setLanguage(language);
        setOpen(false);
    }

    const setTranslationEngineStorage = (translationEngine: string) => {
        setTranslationEngine(translationEngine);
        setOpen(false);
    }

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..."/>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Actions">
                    <CommandItem onSelect={() => navigate('')}>
                        <PlusSquare className="mr-2 h-4 w-4"/>
                        <span>Menu</span>
                    </CommandItem>
                    <CommandItem onSelect={() => navigate('/settings')}>
                        <LayoutList className="mr-2 h-4 w-4"/>
                        <span>Settings</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator/>
                <CommandGroup heading="Language">
                    <CommandItem onSelect={() => setLanguageStorage('de')}>
                        <span>German</span>
                    </CommandItem>
                    <CommandItem onSelect={() => setLanguageStorage('en')}>
                        <span>English</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator/>
                <CommandGroup heading="Translation Engine">
                    <CommandItem onSelect={() => setTranslationEngineStorage('libreTranslate')}>
                        <span>Libre Translate</span>
                    </CommandItem>
                    <CommandItem onSelect={() => setTranslationEngineStorage('myMemory')}>
                        <span>My Memory</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
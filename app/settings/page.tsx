"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useLocalStorage} from "usehooks-ts";
import {useToast} from "@/components/ui/use-toast";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {router} from "next/client";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    language: z.string(),
    translationEngine: z.string(),
});
export default function SettingsPage() {

    const { toast } = useToast()

    const router = useRouter()

    const [language, setLanguage] = useLocalStorage('language', 'de');
    const [translationEngine, setTranslationEngine] = useLocalStorage('translationEngine', 'myMemory');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            language: language || 'de',
            translationEngine: translationEngine || 'libreTranslate',
        },
    })

    // const onLanguageChange = (selectedLanguage: any) => {
    //     localStorage.setItem('language', selectedLanguage)
    // }
    //
    // const onTranslationEngineChange = (selectedTranslationEngine: any) => {
    //     localStorage.setItem('translationEngine', selectedTranslationEngine)
    // }

    const onSubmit = (data: any) => {
        console.log(data);
        setLanguage(data.language as string)
        setTranslationEngine(data.translationEngine as string)
        toast({
            title: "Settings saved.",
            description: "Your settings have been saved.",
            duration: 5000,
        })
    }

    return (
        <div>
            {/*Back button at the top left*/}
            {/*<Link href="/" className="m-4">*/}
            {/*    <ArrowLeft />*/}
            {/*</Link>*/}
            <Button variant={"link"} className={"m-4"} onClick={() => router.push('/')}>
                <ArrowLeft className="h-6 w-6" />
            </Button>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4 mt-8">Settings</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="language"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Language</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select language" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="de">German</SelectItem>
                                            <SelectItem value="en">English</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        This is the language of the menu
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="translationEngine"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Translation Engine <span className={'text-sm text-red-500'}>(Experimental)</span></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select translation engine" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="libreTranslate">Libre Translate</SelectItem>
                                            <SelectItem value="myMemory">My Memory</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        This is the translation engine used for translating the menu
                                        {/*Attention: The My Memory translation engine produces better results, but is limited to 1000 requests per day.*/}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
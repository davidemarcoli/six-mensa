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

const formSchema = z.object({
    language: z.string(),
    translationEngine: z.string(),
});
export default function SettingsPage() {
    // settings page for language and translation engine

    const [language, setLanguage] = useLocalStorage('language', 'de');
    //const [translationEngine, setTranslationEngine] = useLocalStorage('translationEngine', 'myMemory');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            language: language || 'de',
            //translationEngine: translationEngine || 'myMemory',
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
        //setTranslationEngine(data.translationEngine as string)
    }

    return (
        <div>
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
                        {/*<FormField
                            control={form.control}
                            name="translationEngine"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Translation Engine</FormLabel>
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
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />*/}
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
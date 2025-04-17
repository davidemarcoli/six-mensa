"use client";

import {zodResolver} from "@hookform/resolvers/zod"
import {ControllerRenderProps, useForm} from "react-hook-form"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useToast} from "@/components/ui/use-toast";
import {ArrowLeft, Undo2} from "lucide-react";
import {useRouter} from "next/navigation";
import {Switch} from "@/components/ui/switch";
import useStore from "@/lib/store";
import {HexColorInput, HexColorPicker} from "react-colorful";

const formSchema = z.object({
    language: z.string(),
    displayFeaturedMenu: z.boolean(),
    color: z.string()
});
export default function SettingsPage() {

    const {toast} = useToast()

    const router = useRouter()

    const {
        language,
        setLanguage,
        displayFeaturedMenu,
        setDisplayFeaturedMenu,
        color,
        setColor,
    } = useStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            language: language,
            displayFeaturedMenu: displayFeaturedMenu,
            color: color
        },
    })

    const onSubmit = (data: any) => {
        console.log(data);
        setLanguage(data.language)
        setDisplayFeaturedMenu(data.displayFeaturedMenu)
        setColor(data.color)
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
            <Button variant={"link"} className={"m-4 backButton"} onClick={() => router.push('/')}>
                <ArrowLeft className="h-6 w-6"/>
            </Button>
            <div className="flex flex-col items-center justify-center pt-5">
                <h1 className="text-2xl font-bold mb-4">Settings</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="language"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Language</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select language"/>
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
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="displayFeaturedMenu"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Display Featured Menu</FormLabel>
                                        <FormDescription>
                                            If enabled, the featured menu will be <br/>displayed prominently at the top
                                            of the page.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="color"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Accent Color</FormLabel>
                                        {/*<FormDescription>*/}
                                        {/*    Select the accent color for the website.*/}
                                        {/*</FormDescription>*/}
                                    </div>
                                    <FormControl>
                                        <div>
                                            <HexColorPicker color={field.value} onChange={field.onChange} />
                                            <div className={'flex mx-[26px]'}>
                                                <HexColorInput color={field.value} onChange={field.onChange} />
                                                <Undo2 className={'mt-[28px] ml-8 cursor-pointer'} onClick={() => field.onChange('#de3919')}/>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
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
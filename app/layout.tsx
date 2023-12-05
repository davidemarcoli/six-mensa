import {ThemeProvider} from '@/components/theme/theme-provider'
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Changelog} from '@/components/changelog';
import {CommandMenu} from "@/components/command-menu";
import Script from 'next/script'
import {Toaster} from "@/components/ui/toaster";
import NewNav from "@/components/navbar/nav-new";
import Head from "next/head";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'SIX Menus',
    description: 'Get the latest menus from SIX',
    manifest: '/manifest.webmanifest',
    keywords: ['SIX', 'Mensa', 'Menu', 'HTP', 'HT201']
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <head>
            <Script src="https://plausible.davidemarcoli.dev/js/script.js" data-domain="six-mensa.davidemarcoli.dev"/>
        </head>
        <body className={`${inter.className}`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <NewNav/>
            <div className={'mt-16'}>
                {children}
            </div>
            <Changelog/>
            <CommandMenu/>
            <Toaster/>
        </ThemeProvider>
        </body>
        </html>
    )
}

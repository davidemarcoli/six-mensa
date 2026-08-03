import {ThemeProvider} from '@/components/theme/theme-provider'
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Changelog} from '@/components/changelog';
import {CommandMenu} from "@/components/command-menu";
import Script from 'next/script'
import {Toaster} from "@/components/ui/toaster";
import Nav from "@/components/navbar/nav";
import {SpeedInsights} from "@vercel/speed-insights/next"
import {Suspense} from "react"

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'SIX Mensa',
    description: 'Get this week\'s menu for the SIX Restaurants',
    manifest: '/manifest.webmanifest',
    keywords: ['SIX', 'kantine', 'Menu', 'HTP', 'HT201'],
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://mensa.davidemarcoli.dev'),
    robots: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/',
        title: 'SIX Mensa',
        description: 'Get this week\'s menu for the SIX Restaurants',
        images: [
            {
                url: '/og',
                width: 1200,
                height: 630,
                alt: 'SIX Mensa',
            },
        ],
    },
}

/*const fontNotoSans = Noto_Sans({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-sans'
})*/

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <head>
            {/*<Script src="https://plausible.homelab.davidemarcoli.dev/js/script.js" data-domain="mensa.davidemarcoli.dev"/>*/}
            <Script src="https://umami.homelab.davidemarcoli.dev/script.js" data-website-id="55644167-5020-496c-b658-60ec2a172ba8"/>
            {/*<Script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "c715d5e9d98045b7ad7d76ee89a3fab5"}'/>*/}
        </head>
        <body className={`${inter.className}`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Suspense fallback={<div className="h-16" />}>
                <Nav/>
            </Suspense>
            <div className={'mt-16'}>
                {children}
            </div>
            <SpeedInsights/>
            <Changelog/>
            <CommandMenu/>
            <Toaster/>
        </ThemeProvider>
        </body>
        </html>
    )
}

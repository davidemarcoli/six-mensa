import {ThemeProvider} from '@/components/theme-provider'
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Nav from "@/components/nav";
import {Changelog} from '@/components/changelog';
import Script from 'next/script'

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
                <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
                <Script id="google-analytics">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
            
                    gtag('config', 'GA_MEASUREMENT_ID');
                    `}
                </Script>
            </head>
            <body className={`${inter.className}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Nav/>
                    {children}
                    <Changelog/>
                </ThemeProvider>
            </body>
        </html>
    )
}

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
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-GXP0XVRRJY" />
                <Script id="google-analytics">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
            
                    gtag('config', 'GA_MEASUREMENT_ID');
                    `}
                </Script>
                <Script id="google-tag-manager">
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-5Z7TH786');`}
                </Script>
            </head>
            <body className={`${inter.className}`}>
                <noscript>
                    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5Z7TH786"
                    height="0" width="0" style="display:none;visibility:hidden"></iframe>
                </noscript>
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

import {ThemeProvider} from '@/components/theme-provider'
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Nav from "@/components/nav";
import {Changelog} from '@/components/changelog';

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'SIX Menus',
    description: 'Get the latest menus from SIX',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
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

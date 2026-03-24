"use client";

import React from "react";

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";


const {version} = require("/package.json");

export function Changelog() {

    const [showDialog, setShowDialog] = React.useState(false)

    React.useEffect(() => {
        const localStorageVersion = localStorage.getItem('version');
        if (version !== localStorageVersion) {
            // Show the dialog only if the version has changed
            if (localStorageVersion) {
                setShowDialog(true);
            }
            localStorage.setItem('version', version);
        }
    }, []);

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Changelog</DialogTitle>
                    <h1 className="text-2xl">24.03.2026 - Release {version}</h1>
                    <hr/>

                    <h3 className="text-xl">Summary</h3>
                    <ul>
                        <li><strong>[New]</strong> Stats dashboard with search, filters, price trends, dietary distribution, dish frequency, and allergen stats</li>
                        <li><strong>[New]</strong> AI-powered menu extraction via Gemini (with regex fallback)</li>
                        <li><strong>[New]</strong> Server-side translations — no more client-side translation engine</li>
                        <li><strong>[New]</strong> Allergen and dietary type information displayed on menu cards</li>
                        <li><strong>[Refactor]</strong> Simplified menu card and page components</li>
                        <li><strong>[Remove]</strong> Removed translation engine setting (handled by backend now)</li>
                    </ul>
                    <hr/>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
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
                    <h1 className="text-2xl">08.01.2025 - Release {version}</h1>
                    <hr/>

                    <h3 className="text-xl">Summary</h3>
                    <ul>
                        <li><strong>[Upgrade]</strong> Use newest React version to mitigate React2Shell vulnerability</li>

                        {/*<li><strong>[New]</strong> Added new feature</li>*/}
                        {/*<li><strong>[Fix]</strong> Fixed some bugs</li>*/}
                        {/*<li><strong>[Update]</strong> Updated some stuff</li>*/}
                        {/*<li><strong>[Remove]</strong> Removed some stuff</li>*/}
                        {/*<li><strong>[Security]</strong> Fixed some security issues</li>*/}
                        {/*<li><strong>[Docs]</strong> Updated documentation</li>*/}
                        {/*<li><strong>[Refactor]</strong> Refactored some stuff</li>*/}
                        {/*<li><strong>[Performance]</strong> Improved performance</li>*/}
                        {/*<li><strong>[Tests]</strong> Added some tests</li>*/}
                        {/*<li><strong>[Style]</strong> Updated some styles</li>*/}
                        {/*<li><strong>[Upgrade]</strong> Upgraded some stuff</li>*/}
                    </ul>
                    <hr/>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
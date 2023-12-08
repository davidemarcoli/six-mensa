"use client";

import React from "react";

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";


const {version} = require("/package.json");

export function Changelog() {

    const [showDialog, setShowDialog] = React.useState(false)

    React.useEffect(() => {
        if (version !== localStorage.getItem('version')) {
            setShowDialog(true);
            localStorage.setItem('version', version);
        }
    }, []);

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Changelog</DialogTitle>
                    <h1 className="text-2xl">December 8, 2023 - Release {version}</h1>
                    <hr/>

                    <h3 className="text-xl">Summary</h3>
                    <ul>
                        <li><strong>[Fix]</strong> Fix bug where search term of image search was not url encoded</li>
                        <li><strong>[Style]</strong> Feature menu is now highlighted using the accent color as background</li>

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
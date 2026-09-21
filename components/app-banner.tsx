"use client";

import React from "react";
import { Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppDownloadPopup } from "@/components/app-download-popup";

const POPUP_SEEN_KEY = "app-download-popup-seen-v1";

export function AppBanner() {
    const [visible, setVisible] = React.useState(true);
    const [popupOpen, setPopupOpen] = React.useState(false);

    React.useEffect(() => {
        let seen = false;
        try {
            seen = localStorage.getItem(POPUP_SEEN_KEY) === "true";
        } catch {
            seen = true;
        }
        if (seen) return;

        const timer = setTimeout(() => {
            try {
                localStorage.setItem(POPUP_SEEN_KEY, "true");
            } catch {
                // ignore
            }
            setPopupOpen(true);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    function dismiss() {
        setVisible(false);
    }

    return (
        <>
            {visible && (
                <div className="border-b bg-muted/50">
                    <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5">
                        <Smartphone className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" aria-hidden="true" />

                        <p className="min-w-0 flex-1 text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">The SIX Mensa app is out now.</span>{" "}
                            <span className="hidden sm:inline">
                                Today&apos;s menu on your home screen, both restaurants side by side, and an optional
                                notification in the morning. Android is coming soon.{" "}
                            </span>
                        </p>

                        <Button
                            size="sm"
                            className="shrink-0"
                            data-umami-event="app-banner-open"
                            onClick={() => setPopupOpen(true)}
                        >
                            Get the app
                        </Button>

                        <button
                            type="button"
                            onClick={dismiss}
                            aria-label="Dismiss"
                            className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                            <X className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            )}

            <AppDownloadPopup open={popupOpen} onOpenChange={setPopupOpen} />
        </>
    );
}
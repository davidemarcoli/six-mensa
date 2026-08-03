"use client";

import React from "react";
import { Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const DISMISS_KEY = "app-banner-dismissed-v1";

const MAILTO = [
    "mailto:contact@davidemarcoli.dev",
    "?subject=", encodeURIComponent("Zmittag closed testing"),
    "&body=", encodeURIComponent(
        "Hi Davide\n\nI'd like to join the closed test of the Zmittag Android app.\n\n" +
        "My Google account email (the one I use on the Play Store):\n\n\nThanks!",
    ),
].join("");

export function AppBanner() {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        setVisible(localStorage.getItem(DISMISS_KEY) !== "true");
    }, []);

    function dismiss() {
        localStorage.setItem(DISMISS_KEY, "true");
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div className="border-b bg-muted/50">
            <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5">
                <Smartphone className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" aria-hidden="true" />

                <p className="min-w-0 flex-1 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Zmittag, the Android app, is on its way.</span>{" "}
                    <span className="hidden sm:inline">
                        Today&apos;s menu on your home screen, both restaurants side by side, and an optional
                        notification in the morning.{" "}
                    </span>
                    I&apos;m looking for a few testers before it goes live.
                </p>

                <Button asChild size="sm" className="shrink-0" data-umami-event="app-banner-testing">
                    <a href={MAILTO}>
                        <span className="sm:hidden">Join the test</span>
                        <span className="hidden sm:inline">Email me to join the test</span>
                    </a>
                </Button>

                <button
                    type="button"
                    onClick={dismiss}
                    aria-label="Dismiss"
                    className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                    <X className="h-4 w-4" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}

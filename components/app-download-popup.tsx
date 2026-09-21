"use client";

import React from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Smartphone } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { APP_STORE_URL } from "@/lib/app-store";

interface AppDownloadPopupProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AppDownloadPopup({ open, onOpenChange }: AppDownloadPopupProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-h-[90dvh] overflow-y-auto sm:max-w-md"
                onOpenAutoFocus={(event) => event.preventDefault()}
            >
                <DialogHeader className="items-center text-center sm:text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-[#de3919] shadow-sm">
                        <Image
                            src="/icons/icon-512x512.png"
                            alt="SIX Mensa app icon"
                            width={36}
                            height={36}
                            className="h-9 w-9 brightness-0 invert"
                        />
                    </div>
                    <DialogTitle className="pt-2">The SIX Mensa app is here</DialogTitle>
                    <DialogDescription>
                        Today&apos;s menu on your phone &mdash; both restaurants side by side, and an optional
                        notification in the morning.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-4">
                    <div className="hidden flex-col items-center gap-2 sm:flex">
                        <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-border">
                            <QRCodeSVG
                                value={APP_STORE_URL}
                                size={208}
                                level="M"
                                fgColor="#18181b"
                                bgColor="#ffffff"
                                marginSize={0}
                                title="SIX Mensa on the App Store"
                                aria-label="QR code linking to the SIX Mensa app on the App Store"
                            />
                        </div>
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <QrCode className="h-3.5 w-3.5" aria-hidden="true" />
                            Scan with your phone camera to install
                        </p>
                    </div>

                    <p className="text-sm text-muted-foreground sm:hidden">
                        You&apos;re on your phone &mdash; tap below to install.
                    </p>

                    <a
                        href={APP_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        data-umami-event="app-popup-download"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/download-on-the-app-store.svg"
                            alt="Download on the App Store"
                            className="h-12 w-auto"
                        />
                    </a>

                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                        Android app coming soon
                    </p>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-muted-foreground"
                        onClick={() => onOpenChange(false)}
                    >
                        Maybe later
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
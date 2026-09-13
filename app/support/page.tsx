import type { Metadata } from "next";
import SupportPageClient from "./support-client";

export const metadata: Metadata = {
    title: "Support - SIX Mensa & Zmittag",
    description:
        "Get help, report issues, or send feedback for the Zmittag Android/iOS app and the SIX Mensa website. Contact support@davidemarcoli.dev directly.",
    openGraph: {
        title: "Support - SIX Mensa & Zmittag",
        description:
            "Get help, report issues, or send feedback for the Zmittag Android/iOS app and the SIX Mensa website.",
    },
};

export default function SupportPage() {
    return <SupportPageClient />;
}

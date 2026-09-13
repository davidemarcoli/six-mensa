"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    ArrowLeft,
    Check,
    CheckCircle2,
    Copy,
    ExternalLink,
    LifeBuoy,
    Loader2,
    Mail,
    MessageSquare,
    Send,
    Shield,
    Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const supportFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    platform: z.enum(["ios", "android", "web", "other"], {
        required_error: "Please select where you use the app.",
    }),
    category: z.enum(["bug", "menu", "feature", "notification", "other"], {
        required_error: "Please select a topic.",
    }),
    subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type SupportFormValues = z.infer<typeof supportFormSchema>;

export default function SupportPageClient() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedData, setSubmittedData] = useState<{
        data: SupportFormValues;
        mailtoUrl: string;
        delivered: boolean;
    } | null>(null);
    const [copiedEmail, setCopiedEmail] = useState(false);

    const form = useForm<SupportFormValues>({
        resolver: zodResolver(supportFormSchema),
        defaultValues: {
            name: "",
            email: "",
            platform: "ios",
            category: "bug",
            subject: "",
            message: "",
        },
    });

    const copyEmailToClipboard = () => {
        navigator.clipboard.writeText("support@davidemarcoli.dev");
        setCopiedEmail(true);
        toast({
            title: "Email copied",
            description: "support@davidemarcoli.dev copied to clipboard.",
            duration: 3000,
        });
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const onSubmit = async (values: SupportFormValues) => {
        setIsSubmitting(true);

        const platformLabels: Record<string, string> = {
            ios: "Zmittag iOS",
            android: "Zmittag Android",
            web: "Website",
            other: "Other",
        };

        const categoryLabels: Record<string, string> = {
            bug: "Bug Report",
            menu: "Menu Data",
            feature: "Feature Request",
            notification: "Notifications / Location",
            other: "General Feedback",
        };

        const platformText = platformLabels[values.platform] || values.platform;
        const categoryText = categoryLabels[values.category] || values.category;

        const emailSubject = `[SIX Mensa Support] [${platformText}] ${values.subject}`;
        const emailBody = `Hi Davide,\n\n${values.message}\n\n---\nFrom: ${values.name} (${values.email})\nPlatform: ${platformText}\nCategory: ${categoryText}`;
        const fallbackMailto = `mailto:support@davidemarcoli.dev?subject=${encodeURIComponent(
            emailSubject
        )}&body=${encodeURIComponent(emailBody)}`;

        try {
            const res = await fetch("/api/support", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Failed to submit request.");
            }

            const mailtoUrl = result.mailtoUrl || fallbackMailto;
            const wasDelivered = Boolean(result.delivered);

            setSubmittedData({
                data: values,
                mailtoUrl,
                delivered: wasDelivered,
            });

            if (wasDelivered) {
                toast({
                    title: "Message sent!",
                    description: "Your message has been delivered to support@davidemarcoli.dev. We will reply to your email soon.",
                    duration: 6000,
                });
            } else {
                // If server email dispatch is not configured, open the mail client directly
                window.location.assign(mailtoUrl);
                toast({
                    title: "Opening your email client...",
                    description: "Your message is ready to send to support@davidemarcoli.dev.",
                    duration: 6000,
                });
            }
        } catch (error: any) {
            console.error("Support submit error:", error);
            // Even if the API call fails, fall back to mailto so the user's message is never lost
            setSubmittedData({
                data: values,
                mailtoUrl: fallbackMailto,
                delivered: false,
            });
            window.location.assign(fallbackMailto);
            toast({
                title: "Opening email client",
                description: "Opening your email client to send your message to support@davidemarcoli.dev.",
                duration: 6000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setSubmittedData(null);
        form.reset();
    };

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-background text-foreground py-8 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Back Button */}
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-muted-foreground hover:text-foreground -ml-2"
                        onClick={() => {
                            if (window.history.length > 1) {
                                router.back();
                            } else {
                                router.push("/");
                            }
                        }}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                </div>

                {/* Header */}
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        <LifeBuoy className="h-3.5 w-3.5" />
                        Support & Feedback
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                        Help & Support
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
                        Need help with the <strong className="text-foreground">Zmittag</strong> Android/iOS app or the{" "}
                        <strong className="text-foreground">mensa.davidemarcoli.dev</strong> website? Fill out the form
                        below or reach out directly to our support team.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Direct Contact & Information */}
                    <div className="space-y-6 lg:col-span-1">
                        {/* Direct Email Card */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-primary" />
                                    Direct Contact
                                </CardTitle>
                                <CardDescription>
                                    Prefer using your email app directly?
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="rounded-md border bg-muted/40 p-3 space-y-2">
                                    <div className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                                        Support Email
                                    </div>
                                    <div className="text-sm font-mono break-all font-medium text-foreground">
                                        support@davidemarcoli.dev
                                    </div>
                                    <div className="flex items-center gap-2 pt-1">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 text-xs gap-1.5 flex-1"
                                            onClick={copyEmailToClipboard}
                                        >
                                            {copiedEmail ? (
                                                <>
                                                    <Check className="h-3.5 w-3.5 text-green-500" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-3.5 w-3.5" />
                                                    Copy
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant="default"
                                            size="sm"
                                            className="h-8 text-xs gap-1.5 flex-1"
                                            asChild
                                        >
                                            <a href="mailto:support@davidemarcoli.dev?subject=Zmittag%20Support%20Request">
                                                <ExternalLink className="h-3.5 w-3.5" />
                                                Email
                                            </a>
                                        </Button>
                                    </div>
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    Response time is typically within 24 to 48 hours on business days.
                                </p>
                            </CardContent>
                        </Card>

                        {/* App & Quick Info Card */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Smartphone className="h-5 w-5 text-primary" />
                                    Common Topics
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-xs text-muted-foreground">
                                <div>
                                    <h2 className="font-semibold text-foreground text-sm mb-1">
                                        Menu data & accuracy
                                    </h2>
                                    <p>
                                        Menus are automatically scraped from the restaurant providers (HTP and HT201). If a
                                        menu seems missing or delayed, please let us know.
                                    </p>
                                </div>
                                <div className="border-t pt-3">
                                    <h2 className="font-semibold text-foreground text-sm mb-1">
                                        Zmittag location check
                                    </h2>
                                    <p>
                                        The &ldquo;Only when I&apos;m at work&rdquo; option evaluates your location entirely
                                        on-device to skip notifications when you&apos;re away. Coordinates are never saved or sent to any server.
                                    </p>
                                </div>
                                <div className="border-t pt-3">
                                    <Link
                                        href="/privacy"
                                        className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                                    >
                                        <Shield className="h-3.5 w-3.5" />
                                        Read our Privacy Policy
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Support Form or Success Card */}
                    <div className="lg:col-span-2">
                        {submittedData ? (
                            <Card className="border-green-500/30 bg-green-500/5">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-green-500/20 p-2 text-green-500">
                                            <CheckCircle2 className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">Message Ready / Sent</CardTitle>
                                            <CardDescription>
                                                Thank you, {submittedData.data.name}!
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {submittedData.delivered ? (
                                            <>
                                                Your support request has been delivered to{" "}
                                                <strong className="text-foreground font-mono">support@davidemarcoli.dev</strong>.
                                                A response will be sent to{" "}
                                                <strong className="text-foreground">{submittedData.data.email}</strong>.
                                            </>
                                        ) : (
                                            <>
                                                Your message has been compiled for{" "}
                                                <strong className="text-foreground font-mono">support@davidemarcoli.dev</strong>.
                                                If your email client didn&apos;t open automatically, please click the button below to send it.
                                            </>
                                        )}
                                    </p>

                                    <div className="rounded-lg border bg-card p-4 space-y-2 text-xs">
                                        <div>
                                            <span className="font-semibold text-foreground">Subject: </span>
                                            <span className="text-muted-foreground">{submittedData.data.subject}</span>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-foreground">Platform: </span>
                                            <span className="text-muted-foreground uppercase">{submittedData.data.platform}</span>
                                        </div>
                                        <div className="border-t pt-2 mt-2">
                                            <span className="font-semibold text-foreground block mb-1">Message:</span>
                                            <p className="text-muted-foreground whitespace-pre-wrap">{submittedData.data.message}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3 pt-2">
                                        <Button asChild className="gap-2">
                                            <a href={submittedData.mailtoUrl}>
                                                <Mail className="h-4 w-4" />
                                                Open in Email Client
                                            </a>
                                        </Button>
                                        <Button variant="outline" onClick={handleReset}>
                                            Submit Another Request
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <MessageSquare className="h-5 w-5 text-primary" />
                                        Contact Support
                                    </CardTitle>
                                    <CardDescription>
                                        Fill in the details below. On submit, an email is dispatched to support@davidemarcoli.dev.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {/* Name Field */}
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Your Name</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Jane Doe"
                                                                    autoComplete="name"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* Email Field */}
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email Address</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="email"
                                                                    placeholder="jane@example.com"
                                                                    autoComplete="email"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription className="text-xs">
                                                                Where we can send our reply.
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {/* Platform Field */}
                                                <FormField
                                                    control={form.control}
                                                    name="platform"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Platform / App</FormLabel>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select platform" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="ios">Zmittag iOS App</SelectItem>
                                                                    <SelectItem value="android">Zmittag Android App</SelectItem>
                                                                    <SelectItem value="web">Website (mensa.davidemarcoli.dev)</SelectItem>
                                                                    <SelectItem value="other">Other</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* Category Field */}
                                                <FormField
                                                    control={form.control}
                                                    name="category"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Topic / Category</FormLabel>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select topic" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="bug">Bug Report</SelectItem>
                                                                    <SelectItem value="menu">Menu / Restaurant Data</SelectItem>
                                                                    <SelectItem value="feature">Feature Request</SelectItem>
                                                                    <SelectItem value="notification">Notifications / Location</SelectItem>
                                                                    <SelectItem value="other">General Question / Other</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {/* Subject Field */}
                                            <FormField
                                                control={form.control}
                                                name="subject"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Subject</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="e.g. Issue loading Monday menus or Notification question"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Message Field */}
                                            <FormField
                                                control={form.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Message</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Please describe your issue, feedback, or suggestion in detail..."
                                                                rows={5}
                                                                className="resize-y"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription className="text-xs">
                                                            Include any error messages, device model, or restaurant names if relevant.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                className="w-full sm:w-auto gap-2"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="h-4 w-4" />
                                                        Send to support@davidemarcoli.dev
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Footer links */}
                <div className="pt-8 border-t flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>SIX Mensa & Zmittag &bull; Independent, unofficial project by Davide Marcoli</p>
                    <div className="flex items-center gap-4">
                        <Link href="/privacy" className="hover:underline hover:text-foreground">
                            Privacy Policy
                        </Link>
                        <span>&bull;</span>
                        <Link href="/imprint" className="hover:underline hover:text-foreground">
                            Imprint
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

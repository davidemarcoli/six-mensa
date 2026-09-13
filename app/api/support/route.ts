import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, platform, category, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Missing required fields: name, email, subject, and message are required." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address." },
                { status: 400 }
            );
        }

        const platformMap: Record<string, string> = {
            ios: "Zmittag iOS",
            android: "Zmittag Android",
            web: "Website (mensa.davidemarcoli.dev)",
            other: "Other",
        };

        const categoryMap: Record<string, string> = {
            bug: "Bug Report",
            menu: "Menu / Restaurant Data",
            feature: "Feature Request",
            notification: "Notifications / Location",
            other: "General Feedback / Other",
        };

        const platformLabel = platformMap[platform] || platform || "General";
        const categoryLabel = categoryMap[category] || category || "General";
        const emailSubject = `[SIX Mensa Support] [${platformLabel}] ${subject}`;

        const textBody = [
            `Support Request from SIX Mensa & Zmittag`,
            `=========================================`,
            ``,
            `Sender:   ${name} <${email}>`,
            `Platform: ${platformLabel}`,
            `Category: ${categoryLabel}`,
            `Date:     ${new Date().toUTCString()}`,
            ``,
            `Subject:  ${subject}`,
            ``,
            `Message:`,
            `-----------------------------------------`,
            message,
            `-----------------------------------------`,
        ].join("\n");

        const mailtoUrl = [
            `mailto:support@davidemarcoli.dev`,
            `?subject=`,
            encodeURIComponent(emailSubject),
            `&body=`,
            encodeURIComponent(
                `Hi Davide,\n\n${message}\n\n---\nFrom: ${name} (${email})\nPlatform: ${platformLabel}\nCategory: ${categoryLabel}`
            ),
        ].join("");

        let delivered = false;
        let deliveryMethod = "none";

        // 1. Try sending via Resend if API key is provided
        if (process.env.RESEND_API_KEY) {
            try {
                const resendRes = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        from:
                            process.env.SUPPORT_FROM_EMAIL ||
                            "SIX Mensa Support <support@davidemarcoli.dev>",
                        to: ["support@davidemarcoli.dev"],
                        reply_to: `${name} <${email}>`,
                        subject: emailSubject,
                        text: textBody,
                        html: `
                            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #111;">
                                <h2 style="color: #0f172a; margin-bottom: 8px;">SIX Mensa / Zmittag Support Request</h2>
                                <p style="color: #64748b; font-size: 14px; margin-top: 0;">Received on ${new Date().toLocaleString()}</p>
                                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0;">
                                    <p style="margin: 4px 0;"><strong>Name:</strong> ${name}</p>
                                    <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
                                    <p style="margin: 4px 0;"><strong>Platform:</strong> ${platformLabel}</p>
                                    <p style="margin: 4px 0;"><strong>Category:</strong> ${categoryLabel}</p>
                                    <p style="margin: 4px 0;"><strong>Subject:</strong> ${subject}</p>
                                </div>
                                <h3 style="color: #0f172a; margin-top: 24px; margin-bottom: 8px;">Message:</h3>
                                <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; white-space: pre-wrap; line-height: 1.5;">${message}</div>
                            </div>
                        `,
                    }),
                });

                if (resendRes.ok) {
                    delivered = true;
                    deliveryMethod = "resend";
                } else {
                    const errorText = await resendRes.text();
                    console.error("Resend API error:", errorText);
                }
            } catch (err) {
                console.error("Failed to send email via Resend:", err);
            }
        }

        // 2. Try sending via Webhook if configured
        if (!delivered && process.env.SUPPORT_WEBHOOK_URL) {
            try {
                const webhookRes = await fetch(process.env.SUPPORT_WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name,
                        email,
                        platform: platformLabel,
                        category: categoryLabel,
                        subject,
                        message,
                        timestamp: new Date().toISOString(),
                    }),
                });

                if (webhookRes.ok) {
                    delivered = true;
                    deliveryMethod = "webhook";
                }
            } catch (err) {
                console.error("Failed to post to support webhook:", err);
            }
        }

        // Log support request details on the server for tracking
        console.log(`[Support Request] from ${name} (${email}) [${platformLabel} - ${categoryLabel}]: ${subject}`);

        return NextResponse.json({
            success: true,
            delivered,
            deliveryMethod,
            mailtoUrl,
        });
    } catch (error: any) {
        console.error("Error processing support request:", error);
        return NextResponse.json(
            { error: "An error occurred while processing your request." },
            { status: 500 }
        );
    }
}

export const metadata = {
    title: "Privacy Policy",
    description: "How the Zmittag Android app and the mensa.davidemarcoli.dev website handle your data.",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-neutral-950 py-32 px-6">
            <div className="max-w-3xl mx-auto text-neutral-200">
                <h1 className="text-4xl font-bold mb-2 text-neutral-100">Privacy Policy</h1>
                <p className="text-sm text-neutral-400 mb-10">Last updated: 3 August 2026</p>

                <div className="space-y-10">
                    <section>
                        <p className="text-neutral-300">
                            This policy covers two separate things: the <strong className="text-neutral-100">Zmittag</strong> Android
                            app, and this website at <strong className="text-neutral-100">mensa.davidemarcoli.dev</strong>. They do not
                            handle data the same way, so they are described separately below. If you are here from the Google Play
                            listing, the section that applies to you is <a href="#app" className="text-blue-400 hover:text-blue-300 transition-colors">The Zmittag Android app</a>.
                        </p>
                        <p className="text-neutral-300 mt-4">
                            Both are operated privately by Davide Marcoli. This is an independent, unofficial project. It is not
                            affiliated with, endorsed by, or connected to the operators of the restaurants whose menus it shows.
                        </p>
                    </section>

                    <section id="app" className="scroll-mt-8">
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-100">The Zmittag Android app</h2>

                        <p className="text-neutral-300 mb-6">
                            The app has no accounts and no sign-up. It contains{" "}
                            <strong className="text-neutral-100">no analytics, no advertising, no crash reporting and no
                            third-party tracking SDKs</strong>. Nothing you do in the app is profiled, sold or shared.
                        </p>

                        <h3 className="text-lg font-semibold mb-2 text-neutral-100">Location</h3>
                        <div className="space-y-4 text-neutral-300 mb-6">
                            <p>
                                The app has one optional setting called{" "}
                                <em className="text-neutral-100">&ldquo;Only when I&apos;m at work&rdquo;</em>. It is off by
                                default, and the app asks for your explicit agreement before requesting any location permission.
                            </p>
                            <p>
                                When you turn it on, the app checks your device&apos;s location at the moment the daily menu
                                notification is due &mdash; including when the app is closed or not in use. That is why Android
                                asks for background location access. The check exists for one purpose: to skip the notification
                                when you are not at the office.
                            </p>
                            <p>
                                Your location is compared <strong className="text-neutral-100">on your device</strong> against two
                                fixed addresses (Hardturmstrasse 201 and Pfingstweidstrasse 110 in Zurich). Only the yes/no result
                                of that comparison is used, and it is used immediately to decide whether to post a notification.
                                Your coordinates are <strong className="text-neutral-100">never stored, never written to a log, and
                                never sent to any server</strong> &mdash; not to us, not to anyone else.
                            </p>
                            <p>
                                Turning the setting off stops all location access. You can also revoke the permission at any time in
                                Android under Settings &rarr; Apps &rarr; Zmittag &rarr; Permissions.
                            </p>
                        </div>

                        <h3 className="text-lg font-semibold mb-2 text-neutral-100">What the app sends over the network</h3>
                        <div className="space-y-4 text-neutral-300 mb-6">
                            <p>
                                To show menus, the app requests them over HTTPS from the menu API operated for this project. Those
                                requests contain only what is needed to answer them: which restaurant, which day, which menu
                                language, and for the statistics screen a date range. They contain{" "}
                                <strong className="text-neutral-100">no account, no device identifier and no advertising ID</strong>.
                            </p>
                            <p>
                                As with any request on the internet, the server necessarily receives your IP address in order to send
                                a reply. It is used to operate and protect the service and is not used to build a profile of you or to
                                identify you as a person.
                            </p>
                        </div>

                        <h3 className="text-lg font-semibold mb-2 text-neutral-100">What stays on your device</h3>
                        <div className="space-y-4 text-neutral-300 mb-6">
                            <p>
                                Your settings (chosen restaurant, theme, accent colour, menu language, notification time) and a cache
                                of recently loaded menus are stored locally so the app works offline. This data never leaves your
                                device and is deleted when you uninstall the app or clear its storage.
                            </p>
                            <p>
                                Notifications are generated on your device. No push service is involved and no server is told when or
                                whether you received one.
                            </p>
                        </div>

                        <h3 className="text-lg font-semibold mb-2 text-neutral-100">Permissions and why they exist</h3>
                        <ul className="space-y-2 text-neutral-300 list-disc pl-5">
                            <li><strong className="text-neutral-100">Internet / network state</strong> &mdash; to load menus and to know whether you are offline.</li>
                            <li><strong className="text-neutral-100">Notifications</strong> &mdash; to show the optional daily menu notification.</li>
                            <li><strong className="text-neutral-100">Location (approximate, precise, background)</strong> &mdash; only if you enable &ldquo;Only when I&apos;m at work&rdquo;, and only as described above.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-100">This website</h2>
                        <div className="space-y-4 text-neutral-300">
                            <p>
                                Unlike the app, this website <strong className="text-neutral-100">does use analytics</strong>. This
                                section applies only when you visit mensa.davidemarcoli.dev in a browser. None of it is present in
                                the Android app.
                            </p>
                            <p>
                                <strong className="text-neutral-100">Umami</strong> (self-hosted on our own infrastructure) records
                                aggregate usage: page views, referring site, approximate country, browser and operating system. It is
                                cookieless, does not track you across other websites, and is not used to identify individual visitors.
                                Because it is self-hosted, this data is not passed to an external analytics company.
                            </p>
                            <p>
                                <strong className="text-neutral-100">Vercel Speed Insights</strong> collects anonymous performance
                                measurements (such as page load timings) so the site can be kept fast. Vercel Inc. processes this data
                                as our hosting provider.
                            </p>
                            <p>
                                The website is also served by our hosting provider, which processes connection data such as IP address
                                as a technical necessity of delivering the page.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-100">Sharing, retention and your rights</h2>
                        <div className="space-y-4 text-neutral-300">
                            <p>
                                No data from the app or the website is sold, rented, or shared with advertisers or data brokers. Data
                                is disclosed only if we are legally required to do so.
                            </p>
                            <p>
                                Menu data itself is public information and contains nothing about you. Because the app stores no
                                personal data on any server, there is no account to delete &mdash; uninstalling the app removes
                                everything it kept. Website analytics are retained only in aggregate form.
                            </p>
                            <p>
                                Under Swiss data protection law (FADP) and, where it applies, the GDPR, you have the right to
                                information about, correction of, and deletion of personal data concerning you, and the right to lodge
                                a complaint with a supervisory authority. Given how little data this project handles, most such
                                requests can be answered simply by pointing at this page &mdash; but you are welcome to ask.
                            </p>
                            <p>
                                The app is not directed at children and does not knowingly collect data from them.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-100">Changes</h2>
                        <p className="text-neutral-300">
                            If this policy changes in a way that affects what the app does with your data, the updated version will be
                            published here with a new date, and the change will be reflected in the app&apos;s Play Store listing.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-100">Contact</h2>
                        <p className="text-neutral-300">
                            For questions about privacy, or to exercise any of the rights above, contact:{" "}
                            <a href="mailto:contact@davidemarcoli.dev" className="text-blue-400 hover:text-blue-300 transition-colors">contact@davidemarcoli.dev</a>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}

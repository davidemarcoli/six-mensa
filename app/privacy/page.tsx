export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-neutral-950 py-32 px-6">
            <div className="max-w-3xl mx-auto text-neutral-200">
                <h1 className="text-4xl font-bold mb-8 text-neutral-100">Privacy Policy</h1>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-neutral-100">General Information</h2>
                        <p className="text-neutral-300 mb-4">
                            The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is all data with which you can be personally identified.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-neutral-100">Data Collection on this Website</h2>
                        <div className="space-y-4 text-neutral-300">
                            <p>
                                <strong>Who is responsible for data collection on this website?</strong><br />
                                The data processing on this website is carried out by the website operator. You can find their contact details in the imprint of this website.
                            </p>
                            <p>
                                <strong>How do we collect your data?</strong><br />
                                On the one hand, your data is collected when you communicate it to us. This can be, for example, data that you enter when contacting us. Other data is collected automatically or with your consent by our IT systems when you use the app. This is primarily technical data (e.g. internet browser, operating system or time of the page view). This data is collected automatically as soon as you enter this app.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-neutral-100">Contact</h2>
                        <p className="text-neutral-300">
                            For questions about privacy, please contact us at: <a href="mailto:contact@davidemarcoli.dev" className="text-blue-400 hover:text-blue-300 transition-colors">contact@davidemarcoli.dev</a>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default function ImprintPage() {
    return (
        <main className="min-h-screen bg-neutral-950 pt-32 px-6">
            <div className="max-w-3xl mx-auto text-neutral-200">
                <h1 className="text-4xl font-bold mb-8 text-neutral-100">Imprint</h1>

                <div className="space-y-8">
                    <section>
                        <p className="leading-relaxed">
                            Davide Marcoli<br />
                            Software Engineer<br />
                            Zurich, Switzerland
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-neutral-100">Contact</h2>
                        <p className="leading-relaxed">
                            Email: <a href="mailto:contact@davidemarcoli.dev" className="text-blue-400 hover:text-blue-300 transition-colors">contact@davidemarcoli.dev</a>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}

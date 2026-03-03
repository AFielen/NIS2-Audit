import Link from 'next/link';

export default function Impressum() {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="drk-card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Impressum</h2>

          <div className="space-y-6 text-gray-700">
            <section>
              <h3 className="font-bold text-gray-900 mb-2">Angaben gemäß § 5 TMG</h3>
              <p>
                DRK Kreisverband StädteRegion Aachen e.V.<br />
                Henry-Dunant-Platz 1<br />
                52146 Würselen
              </p>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 mb-2">Vertreten durch</h3>
              <p>Den Vorstand gemäß § 26 BGB</p>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 mb-2">Kontakt</h3>
              <p>
                E-Mail:{' '}
                <a href="mailto:Info@DRK-Aachen.de" className="text-[#e30613] hover:underline">
                  Info@DRK-Aachen.de
                </a>
                <br />
                Web:{' '}
                <a
                  href="https://www.drk-aachen.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e30613] hover:underline"
                >
                  www.drk-aachen.de
                </a>
              </p>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 mb-2">Registereintrag</h3>
              <p>
                Registergericht: Amtsgericht Aachen<br />
                {/* Registernummer: VR [...] */}
              </p>
            </section>
          </div>

          <div className="mt-8">
            <Link href="/" className="text-[#e30613] hover:underline text-sm font-semibold">
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

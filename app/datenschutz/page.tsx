import Link from 'next/link';

export default function Datenschutz() {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="drk-card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Datenschutzerklärung</h2>

          <div className="space-y-6 text-gray-700">
            <section>
              <h3 className="font-bold text-gray-900 mb-2">Verantwortlicher</h3>
              <p>
                DRK Kreisverband StädteRegion Aachen e.V.<br />
                Henry-Dunant-Platz 1, 52146 Würselen<br />
                E-Mail: Info@DRK-Aachen.de
              </p>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 mb-2">Grundsatz</h3>
              <p>
                Diese Anwendung wurde nach dem Prinzip der Datensparsamkeit entwickelt.
                Es werden keine personenbezogenen Daten erhoben, gespeichert oder an Dritte
                übermittelt.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 mb-2">Datenverarbeitung</h3>
              <p>
                <strong>Keine Cookies:</strong> Diese Anwendung verwendet keine Cookies.<br />
                <strong>Keine Tracking-Dienste:</strong> Es werden keine Analytics- oder Tracking-Tools eingesetzt.<br />
                <strong>Keine externen Dienste:</strong> Es werden keine externen Schriftarten, CDNs oder Dienste geladen.<br />
                <strong>Lokale Speicherung:</strong> Falls die App Daten zwischenspeichert, geschieht dies
                ausschließlich im lokalen Browser-Speicher (localStorage) Ihres Geräts. Diese Daten
                verlassen Ihr Gerät nicht.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 mb-2">Ihre Rechte</h3>
              <p>
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der
                Verarbeitung Ihrer Daten. Da diese Anwendung keine personenbezogenen Daten
                verarbeitet, sind diese Rechte in der Regel nicht betroffen. Bei Fragen wenden
                Sie sich an den oben genannten Verantwortlichen.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 mb-2">Open Source</h3>
              <p>
                Der gesamte Quellcode dieser Anwendung ist öffentlich einsehbar und überprüfbar.
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

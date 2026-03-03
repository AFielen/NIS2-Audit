import Link from 'next/link';

export default function Hilfe() {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="drk-card">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hilfe & Anleitung</h2>
          <p className="text-gray-600">
            Hier finden Sie Antworten auf häufige Fragen und eine Anleitung zur Nutzung.
          </p>
        </div>

        {/* ── FAQ ── */}
        <div className="drk-card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Häufige Fragen</h3>
          <div className="space-y-4">
            <details className="group">
              <summary className="cursor-pointer font-semibold text-gray-800 hover:text-[#e30613] transition-colors">
                Was ist diese Anwendung?
              </summary>
              <p className="mt-2 text-gray-600 text-sm pl-4">
                APP_BESCHREIBUNG
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-gray-800 hover:text-[#e30613] transition-colors">
                Werden meine Daten gespeichert?
              </summary>
              <p className="mt-2 text-gray-600 text-sm pl-4">
                Nein. Diese Anwendung speichert keine Daten auf einem Server. Alle Eingaben
                verbleiben in Ihrem Browser und können jederzeit gelöscht werden.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-gray-800 hover:text-[#e30613] transition-colors">
                Brauche ich einen Account?
              </summary>
              <p className="mt-2 text-gray-600 text-sm pl-4">
                Nein. Die Anwendung funktioniert ohne Registrierung, ohne Login und ohne
                persönliche Daten.
              </p>
            </details>
          </div>
        </div>

        {/* ── Kontakt ── */}
        <div className="drk-card border-l-4 border-[#e30613]">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Fragen oder Feedback?</h3>
          <p className="text-gray-600 text-sm">
            Wenden Sie sich an den DRK Kreisverband StädteRegion Aachen e.V.:<br />
            <a href="mailto:Info@DRK-Aachen.de" className="text-[#e30613] hover:underline">
              Info@DRK-Aachen.de
            </a>
          </p>
        </div>

        <div className="text-center">
          <Link href="/" className="text-[#e30613] hover:underline text-sm font-semibold">
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}

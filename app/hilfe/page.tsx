import Link from 'next/link';

export default function Hilfe() {
  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="drk-card">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>Hilfe & Anleitung</h2>
          <p style={{ color: 'var(--text-light)' }}>
            Hier finden Sie Antworten auf häufige Fragen zum NIS-2 Self-Check.
          </p>
        </div>

        {/* NIS-2 spezifische FAQ */}
        <div className="drk-card">
          <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>NIS-2 Self-Check – Häufige Fragen</h3>
          <div className="space-y-4">
            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Was ist der Unterschied zwischen juristischem und technischem Scope?
              </summary>
              <p className="mt-2 text-sm pl-4" style={{ color: 'var(--text-light)' }}>
                Der <strong>juristische Scope</strong> beschreibt, welcher Rechtsträger voraussichtlich von NIS-2 reguliert wird – z.B. der Kreisverband e.V. oder eine Rettungsdienst-gGmbH. Der <strong>technische Scope</strong> zeigt, welche IT-Systeme faktisch mit abgesichert werden müssen – auch wenn sie einem anderen Rechtsträger zugeordnet sind. Typisches Beispiel: Die gGmbH ist juristisch betroffen, nutzt aber die zentrale IT des e.V. Dann muss die IT des e.V. technisch mitbetrachtet werden.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Wann ist ein Ergebnis „regelstandssensitiv"?
              </summary>
              <p className="mt-2 text-sm pl-4" style={{ color: 'var(--text-light)' }}>
                Ein Ergebnis ist regelstandssensitiv, wenn es sich je nach gewähltem Regelstand (BSI-öffentlich vs. Verbandslinie konservativ) unterscheidet. Unter der konservativen Verbandslinie wird Rettungsdienst als sektoraler Trigger behandelt, unter dem öffentlichen BSI-Stand nicht automatisch. Wenn dies das Ergebnis kippt, weist das Tool auf die Regelstandssensitivität hin und empfiehlt eine konservative Umsetzung.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Wann reicht eine Trennung nur auf dem Papier nicht aus?
              </summary>
              <p className="mt-2 text-sm pl-4" style={{ color: 'var(--text-light)' }}>
                Ergebnis B (Scope begrenzbar) wird nur ausgegeben, wenn eine harte technische Trennung für alle 8 Kriterien nachgewiesen ist: getrennte Identität, getrennte Administration, getrennte Netzwerke, getrenntes Backup, getrenntes Endpoint-Management, getrenntes Logging, getrennte Asset-Dokumentation und ein dokumentierter Impact-Nachweis. Fehlt auch nur eines, kann die Trennung nicht als belastbar gelten.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Wie werden VZÄ berücksichtigt?
              </summary>
              <p className="mt-2 text-sm pl-4" style={{ color: 'var(--text-light)' }}>
                VZÄ (Vollzeitäquivalente) sind einer der drei Schwellenwerte. Wichtig ist, dass die VZÄ je Rechtsträger vorliegen – nicht konsolidiert über den gesamten Verbund. Bei konsolidierten Daten kann keine belastbare Schwellenwertprüfung erfolgen.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Was bedeutet „Shared IT" in diesem Tool?
              </summary>
              <p className="mt-2 text-sm pl-4" style={{ color: 'var(--text-light)' }}>
                Shared IT beschreibt gemeinsam genutzte IT-Infrastruktur zwischen dem Rettungsdienst und anderen Teilen des Verbands. Dazu zählen: gemeinsames Active Directory, gemeinsame Cloud-Tenants, gemeinsame Netzwerke, Backup-Systeme, Admin-Konten, Server, Endpoint-Management und IT-Dienstleister. Je mehr Shared IT besteht, desto größer wird der technische Scope.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Was ist der Unterschied zwischen Ergebnis B und C?
              </summary>
              <p className="mt-2 text-sm pl-4" style={{ color: 'var(--text-light)' }}>
                <strong>Ergebnis B</strong>: Der Verband ist direkt betroffen, aber der Scope lässt sich plausibel begrenzen, weil eine vollständige technische Trennung nachweisbar ist.
                <br /><strong>Ergebnis C</strong>: Der Verband ist direkt betroffen und Shared IT zieht den technischen Scope hoch. Eine Begrenzung ist derzeit nicht belastbar nachweisbar.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Was bedeuten die Ergebnisarten A, B, C und D?
              </summary>
              <div className="mt-2 text-sm pl-4 space-y-2" style={{ color: 'var(--text-light)' }}>
                <p><strong>A</strong> – Nicht direkt betroffen und kein technischer Mit-Scope.</p>
                <p><strong>B</strong> – Direkt betroffen, Scope plausibel begrenzbar (alle Trennkriterien erfüllt).</p>
                <p><strong>C</strong> – Direkt betroffen und Shared IT zieht den technischen Scope hoch.</p>
                <p><strong>D</strong> – Regelstandssensitiv oder strukturell/technisch unklar; konservative Umsetzung empfohlen.</p>
              </div>
            </details>
          </div>
        </div>

        {/* Allgemeine FAQ */}
        <div className="drk-card">
          <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Allgemeine Fragen</h3>
          <div className="space-y-4">
            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Was ist diese Anwendung?
              </summary>
              <p className="mt-2 text-sm pl-4" style={{ color: 'var(--text-light)' }}>
                Der NIS-2 Self-Check ist ein DRK-spezifisches Tool, mit dem Kreisverbände und Landesverbände in 10–15 Minuten ihre wahrscheinliche NIS-2-Betroffenheit prüfen können. Die App analysiert Organisationsstruktur, Leistungsbereiche, Schwellenwerte und IT-Architektur und generiert ein Ergebnis mit priorisierter 90-Tage-Roadmap.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Werden meine Daten gespeichert?
              </summary>
              <p className="mt-2 text-sm pl-4" style={{ color: 'var(--text-light)' }}>
                Nein. Alle Eingaben verbleiben ausschließlich in Ihrem Browser (localStorage). Es werden keine Daten an einen Server übertragen. Beim Schließen oder Löschen des Browserspeichers werden alle Daten entfernt.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Brauche ich einen Account?
              </summary>
              <p className="mt-2 text-sm pl-4" style={{ color: 'var(--text-light)' }}>
                Nein. Die Anwendung funktioniert ohne Registrierung, ohne Login und ohne persönliche Daten.
              </p>
            </details>
          </div>
        </div>

        {/* Kontakt */}
        <div className="drk-card border-l-4" style={{ borderLeftColor: 'var(--drk)' }}>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Fragen oder Feedback?</h3>
          <p className="text-sm" style={{ color: 'var(--text-light)' }}>
            Wenden Sie sich an den DRK Kreisverband StädteRegion Aachen e.V.:<br />
            <a href="mailto:Info@DRK-Aachen.de" style={{ color: 'var(--drk)' }} className="hover:underline">
              Info@DRK-Aachen.de
            </a>
          </p>
        </div>

        <div className="text-center">
          <Link href="/" style={{ color: 'var(--drk)' }} className="hover:underline text-sm font-semibold">
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}

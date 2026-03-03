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

        {/* Zentrale Begriffe */}
        <div className="drk-card">
          <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Zentrale Begriffe</h3>
          <div className="space-y-4">
            <details className="group" open>
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Was ist ein Regelstand?
              </summary>
              <div className="mt-2 text-sm pl-4 space-y-2" style={{ color: 'var(--text-light)' }}>
                <p>
                  Der <strong>Regelstand</strong> bestimmt, nach welcher Auslegung die NIS-2-Betroffenheit bewertet wird. Es gibt zwei Regelstände in diesem Tool:
                </p>
                <p>
                  <strong>1. Verbandslinie konservativ (Standard):</strong> Diese Auslegung behandelt Rettungsdienst als sektoralen Trigger im Gesundheitssektor. Das bedeutet: Betreibt Ihr KV einen Rettungsdienst, wird automatisch eine sektorale Betroffenheit angenommen. Dies ist die empfohlene Einstellung, da sie dem DRK-internen Vorsichtsprinzip folgt.
                </p>
                <p>
                  <strong>2. BSI-öffentlich:</strong> Diese Auslegung folgt der veröffentlichten BSI-Interpretation. Hier wird Rettungsdienst nicht automatisch als Gesundheitssektor-Trigger gewertet. Das Ergebnis kann daher milder ausfallen. Allerdings ist diese Auslegung weniger konservativ und birgt das Risiko, dass eine spätere behördliche Auslegung strenger ist.
                </p>
                <p>
                  Wenn das Ergebnis zwischen beiden Regelständen unterschiedlich ausfällt, wird das Ergebnis als <strong>regelstandssensitiv</strong> markiert. In diesem Fall empfiehlt das Tool, die konservative Variante umzusetzen.
                </p>
              </div>
            </details>

            <details className="group" open>
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Was ist ein sektoraler Trigger?
              </summary>
              <div className="mt-2 text-sm pl-4 space-y-2" style={{ color: 'var(--text-light)' }}>
                <p>
                  NIS-2 reguliert Einrichtungen in bestimmten <strong>Sektoren</strong> (z.B. Gesundheit, Energie, Transport). Ein <strong>sektoraler Trigger</strong> bedeutet, dass die Tätigkeit Ihrer Organisation in einen dieser regulierten Sektoren fällt.
                </p>
                <p>
                  Im DRK-Kontext ist der wichtigste sektorale Trigger der <strong>Rettungsdienst</strong>: Notfallrettung und Rettungsdienst gehören zum Gesundheitssektor. Ob Rettungsdienst automatisch als Trigger gilt, hängt vom gewählten Regelstand ab (siehe oben).
                </p>
                <p>
                  <strong>Wichtig:</strong> Ein sektoraler Trigger allein reicht nicht aus. Zusätzlich müssen die Schwellenwerte (VZÄ, Umsatz, Bilanzsumme) erreicht werden, damit eine NIS-2-Betroffenheit eintritt. Erst die Kombination aus sektoralem Trigger UND Schwellenwertüberschreitung führt zur direkten Betroffenheit.
                </p>
              </div>
            </details>
          </div>
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
                Der <strong>juristische Scope</strong> beschreibt, welcher Rechtsträger voraussichtlich von NIS-2 reguliert wird – z.B. der Kreisverband e.V. oder eine Rettungsdienst-gGmbH. Der <strong>technische Scope</strong> zeigt, welche IT-Systeme faktisch mit abgesichert werden müssen – auch wenn sie einem anderen Rechtsträger zugeordnet sind. Typisches Beispiel: Die gGmbH ist juristisch betroffen, nutzt aber die zentrale IT des KV. Dann muss die IT des KV technisch mitbetrachtet werden.
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
                Der NIS-2 Self-Check ist ein DRK-spezifisches Tool, mit dem Kreisverbände (KV) in 10–15 Minuten ihre wahrscheinliche NIS-2-Betroffenheit prüfen können. Die App analysiert Organisationsstruktur, Leistungsbereiche, Schwellenwerte und IT-Architektur und generiert ein Ergebnis mit priorisierter 90-Tage-Roadmap.
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

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Was ist der QR-Code auf dem PDF?
              </summary>
              <p className="mt-2 text-sm pl-4" style={{ color: 'var(--text-light)' }}>
                Der QR-Code auf dem gedruckten PDF enthält alle Ihre Antworten in komprimierter Form. Scannen Sie den QR-Code mit Ihrem Handy, um die Bearbeitung fortzusetzen oder das Ergebnis zu einem späteren Zeitpunkt erneut aufzurufen – ohne dass Daten auf einem Server gespeichert werden.
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

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
                Was ist das DRK Standard Pack v1.0?
              </summary>
              <div className="mt-2 text-sm pl-4 space-y-2" style={{ color: 'var(--text-light)' }}>
                <p>
                  Das <strong>DRK Standard Pack v1.0</strong> ist das einheitliche Regelwerk dieses Tools.
                  Rettungsdienst wird als potenziell NIS-2/BSIG-relevante Einrichtungsart behandelt.
                  Die Betroffenheit hängt an den Schwellenwerten (VZÄ, Umsatz, Bilanzsumme).
                </p>
                <p>
                  Es gibt keine unterschiedlichen Regelstände mehr — die frühere Unterscheidung zwischen
                  &quot;BSI-öffentlich&quot; und &quot;Verbandslinie konservativ&quot; entfällt, da das BSI inzwischen
                  die Nichtbetroffenheit von Rettungsdiensten revidiert hat.
                </p>
              </div>
            </details>

            <details className="group" open>
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Was ist ein sektoraler Trigger?
              </summary>
              <div className="mt-2 text-sm pl-4 space-y-2" style={{ color: 'var(--text-light)' }}>
                <p>
                  NIS-2 reguliert Einrichtungen in bestimmten <strong>Sektoren</strong> (z.B. Gesundheit, Energie, Transport).
                  Im DRK-Kontext ist der wichtigste sektorale Trigger der <strong>Rettungsdienst</strong>:
                  Notfallrettung gehört zum Gesundheitssektor.
                </p>
                <p>
                  <strong>Wichtig:</strong> Ein sektoraler Trigger allein reicht nicht aus. Zusätzlich müssen die
                  Schwellenwerte (VZÄ &gt; 50 oder Umsatz &gt; 10 Mio. + Bilanzsumme &gt; 10 Mio.) erreicht werden.
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
                Der <strong>juristische Scope</strong> beschreibt, welcher Rechtsträger voraussichtlich von NIS-2 reguliert wird.
                Der <strong>technische Scope</strong> zeigt, welche IT-Systeme faktisch mit abgesichert werden müssen.
                Typisches Beispiel: Die gGmbH ist juristisch betroffen, nutzt aber die zentrale IT des KV.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Wann reicht eine Trennung nur auf dem Papier nicht aus?
              </summary>
              <p className="mt-2 text-sm pl-4" style={{ color: 'var(--text-light)' }}>
                Ergebnis B (Scope begrenzbar) wird nur ausgegeben, wenn eine harte technische Trennung für alle 8 Kriterien nachgewiesen ist:
                getrennter Tenant, getrennte Administration, getrennte Netzsegmente, getrenntes Backup, getrenntes Endpoint-Management,
                getrenntes Logging, getrennte Asset-Dokumentation und dokumentierter Impact-Nachweis.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Wie werden VZÄ und Schwellenwerte berücksichtigt?
              </summary>
              <p className="mt-2 text-sm pl-4" style={{ color: 'var(--text-light)' }}>
                VZÄ (Vollzeitäquivalente), Jahresumsatz und Jahresbilanzsumme werden als numerische Werte abgefragt.
                Wichtige Einrichtung: VZÄ &gt; 50 oder (Umsatz &gt; 10 Mio. UND Bilanzsumme &gt; 10 Mio.).
                Besonders wichtige Einrichtung: VZÄ &gt; 250 oder (Umsatz &gt; 50 Mio. UND Bilanzsumme &gt; 43 Mio.).
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Was bedeuten die Ergebnisarten A, B, C und D?
              </summary>
              <div className="mt-2 text-sm pl-4 space-y-2" style={{ color: 'var(--text-light)' }}>
                <p><strong>A</strong> – Nicht RD-getrieben betroffen. Kein Rettungsdienst oder Schwellenwerte nicht erreicht.</p>
                <p><strong>B</strong> – Direkt betroffen, Scope begrenzbar. Alle 8 Trennkriterien erfüllt.</p>
                <p><strong>C</strong> – Direkt betroffen, faktisch gruppenweiter technischer Scope. Shared IT oder fehlende Trennung.</p>
                <p><strong>D</strong> – Unklar, konservativ behandeln. Schwellenwerte fehlen oder sind nicht belastbar.</p>
              </div>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Was bedeutet &quot;Shared IT&quot; in diesem Tool?
              </summary>
              <p className="mt-2 text-sm pl-4" style={{ color: 'var(--text-light)' }}>
                Shared IT beschreibt gemeinsam genutzte IT-Infrastruktur zwischen dem Rettungsdienst und anderen Teilen
                des Verbands: gemeinsames Active Directory, gemeinsame Netzwerke, Backup-Systeme, Endpoint-Management.
                Je mehr Shared IT besteht, desto größer wird der technische Scope.
              </p>
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
                Der NIS-2 Self-Check ist ein DRK-spezifisches Tool, mit dem Kreisverbände (KV)
                ihre wahrscheinliche NIS-2-Betroffenheit prüfen können. Die App analysiert Organisationsstruktur,
                Schwellenwerte, IT-Architektur und Sicherheitsreife und generiert ein Ergebnis mit 90-Tage-Roadmap.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Werden meine Daten gespeichert?
              </summary>
              <p className="mt-2 text-sm pl-4" style={{ color: 'var(--text-light)' }}>
                Nein. Alle Eingaben verbleiben ausschließlich in Ihrem Browser (localStorage).
                Es werden keine Daten an einen Server übertragen.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Was ist der QR-Code auf dem PDF?
              </summary>
              <p className="mt-2 text-sm pl-4" style={{ color: 'var(--text-light)' }}>
                Der QR-Code enthält alle Ihre Antworten in komprimierter Form. Scannen Sie ihn,
                um den Check später fortzusetzen oder auf einem anderen Gerät zu öffnen.
              </p>
            </details>
          </div>
        </div>

        {/* Kontakt */}
        <div className="drk-card border-l-4" style={{ borderLeftColor: 'var(--drk)' }}>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Fragen, Feedback oder Fehler gefunden?</h3>
          <p className="text-sm" style={{ color: 'var(--text-light)' }}>
            Wenden Sie sich an den DRK Kreisverband StädteRegion Aachen e.V. — auch bei technischen Fehlern, Bugs oder inhaltlichen Unklarheiten:<br />
            <a href="mailto:digitalisierung@drk-aachen.de" style={{ color: 'var(--drk)' }} className="hover:underline">
              digitalisierung@drk-aachen.de
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

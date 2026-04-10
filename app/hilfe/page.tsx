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

        {/* MSP / IT-Dienstleister FAQ */}
        <div className="drk-card">
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
            MSP / IT-Dienstleister — § 2 Nr. 26 BSIG
          </h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
            Wenn eine DRK-Einheit zentrale IT für andere juristische Personen betreibt (Tochter-gGmbHs, andere KVs, externe Dritte),
            kann sie als Managed Service Provider eigenständig unter NIS-2 fallen — Sektor »Digitale Infrastruktur« (Anlage 1 BSIG).
            Der Weg dorthin hat aber mehrere Prüfschritte.
          </p>
          <div className="space-y-4">
            <details className="group" open>
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Was ist ein Managed Service Provider (MSP) nach § 2 Nr. 26 BSIG?
              </summary>
              <div className="mt-2 text-sm pl-4 space-y-2" style={{ color: 'var(--text-light)' }}>
                <p>
                  Ein <strong>MSP</strong> ist laut Gesetz ein Anbieter von Diensten im Zusammenhang mit <strong>Installation, Verwaltung,
                  Betrieb oder Wartung</strong> von IKT-Produkten, -Netzen, -Infrastruktur, -Anwendungen oder sonstigen Netz- und
                  Informationssystemen — mit Unterstützung oder aktiver Verwaltung. Ob die Leistung vor Ort oder remote erbracht wird,
                  ist unerheblich.
                </p>
                <p>
                  Die Gesetzesbegründung ist explizit: <strong>eine Mindestanzahl an Kunden ist nicht Voraussetzung</strong>, und auch
                  Unternehmen, die ausschließlich den zentralen IT-Betrieb eines Unternehmensverbundes übernehmen, fallen in der Regel unter
                  den MSP-Begriff. Das BSI bestätigt dies in seinen FAQ zur Konstellation von Tochterunternehmen mit zentralem IT-Betrieb.
                </p>
                <p>
                  <strong>Reine Beratung reicht nicht</strong>: Strategische IT-Beratung, Schulung oder einmaliger First-Level-Helpdesk
                  ohne Admin-Rechte begründen laut BSI-FAQ in der Regel keinen MSP-Status. Erforderlich ist ein <em>operativer Betrieb</em>
                  mit tatsächlichem Zugriff bzw. aktiver Verwaltung.
                </p>
              </div>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Wann gilt unsere DRK-Einheit als MSP — und wann nicht?
              </summary>
              <div className="mt-2 text-sm pl-4 space-y-2" style={{ color: 'var(--text-light)' }}>
                <p>
                  Entscheidend ist die Frage, ob Ihre Einheit <strong>operative IT-Leistungen für eine andere juristische Person</strong>
                  erbringt. Eine unselbständige Abteilung innerhalb derselben jur. Person (z.B. Rettungsdienst als Abteilung des e.V.)
                  zählt nicht — das ist Inhouse-IT nach Recital 35 NIS-2.
                </p>
                <p className="font-semibold" style={{ color: 'var(--text)' }}>Typischer MSP-Fall:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>KV betreibt Active Directory / M365 / Entra ID für eine ausgegliederte Rettungsdienst-gGmbH</li>
                  <li>KV stellt Firewall, Backup und Endpoint-Management für eine Pflegeeinrichtungs-GmbH bereit</li>
                  <li>Landesverband hostet Fachanwendungen für mehrere Kreisverbände</li>
                  <li>Eine eigene DRK-IT-GmbH betreibt die Infrastruktur für alle Verbandseinheiten</li>
                </ul>
                <p className="font-semibold" style={{ color: 'var(--text)' }}>Kein MSP-Fall:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>IT ausschließlich für die eigene juristische Person (inklusive nicht rechtsfähiger Abteilungen)</li>
                  <li>Reine Beschaffungskooperation ohne operative Verantwortung</li>
                  <li>Einmalige Projektarbeit oder Schulung ohne dauerhaften Betriebsauftrag</li>
                  <li>Reiner First-Level-Helpdesk ohne Admin-Rechte</li>
                </ul>
              </div>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Wir sind ein MSP — sind wir automatisch reguliert?
              </summary>
              <div className="mt-2 text-sm pl-4 space-y-2" style={{ color: 'var(--text-light)' }}>
                <p>
                  <strong>Nein.</strong> Die MSP-Eigenschaft ist nur der erste Schritt (sektoraler Trigger, Anlage 1 BSIG). Zusätzlich
                  müssen die <strong>Schwellenwerte nach § 28 BSIG</strong> erfüllt sein.
                </p>
                <p>
                  Für Einrichtungsarten aus Anlage 1 gilt als <strong>wichtige Einrichtung</strong>: mindestens 50 Mitarbeitende
                  <em>oder</em> Jahresumsatz über 10 Mio. Euro <em>und</em> Jahresbilanzsumme über 10 Mio. Euro.
                </p>
                <p>
                  Als <strong>besonders wichtige Einrichtung</strong>: mindestens 250 Mitarbeitende <em>oder</em> Jahresumsatz über 50 Mio.
                  Euro <em>und</em> Jahresbilanzsumme über 43 Mio. Euro.
                </p>
                <p>
                  <strong>Wichtig:</strong> Das Gesetz sagt »mindestens 50« bzw. »mindestens 250« — exakt 50 oder 250 Mitarbeitende reichen
                  bereits aus. Der häufig zitierte Wortlaut »über 50« ist ungenau.
                </p>
              </div>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Müssen wir die verbundenen Unternehmen mitzählen? (§ 28 Abs. 4 BSIG)
              </summary>
              <div className="mt-2 text-sm pl-4 space-y-2" style={{ color: 'var(--text-light)' }}>
                <p>
                  <strong>In der Regel ja.</strong> § 28 Abs. 4 BSIG verweist auf die EU-KMU-Empfehlung 2003/361/EG. Daten von Partner-
                  und verbundenen Unternehmen sind grundsätzlich bei der Schwellenwert-Berechnung hinzuzurechnen:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Autonome Unternehmen</strong> (weder 25 %+ Beteiligung gehalten noch gehalten an): isolierte Betrachtung.</li>
                  <li><strong>Partnerunternehmen</strong> (25–50 % Beteiligung): anteilige Zurechnung entsprechend der Beteiligungsquote.</li>
                  <li><strong>Verbundene Unternehmen</strong> (über 50 % Beteiligung / Kontrolle): <strong>volle Zurechnung</strong> der Kennzahlen.</li>
                </ul>
                <p>
                  Für den typischen DRK-Verbund (KV als e.V. mit mehreren ausgegliederten gGmbHs) heißt das: Eine IT-Tochter-GmbH ist
                  gesellschaftsrechtlich mit hoher Wahrscheinlichkeit ein <em>verbundenes Unternehmen</em>, und die Kennzahlen der anderen
                  Verbandseinheiten werden grundsätzlich mitgerechnet.
                </p>
              </div>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Wann können wir die Zurechnung verbundener Unternehmen ausnahmsweise vermeiden?
              </summary>
              <div className="mt-2 text-sm pl-4 space-y-2" style={{ color: 'var(--text-light)' }}>
                <p>
                  § 28 Abs. 4 BSIG enthält eine <strong>spezielle Ausnahme</strong>, die es bei der reinen EU-KMU-Systematik nicht gibt:
                  Die Daten sind <em>ausnahmsweise</em> dann nicht hinzuzurechnen, wenn das Unternehmen
                </p>
                <blockquote className="border-l-2 pl-3 italic" style={{ borderLeftColor: 'var(--info)', color: 'var(--text)' }}>
                  „unter Berücksichtigung der rechtlichen, wirtschaftlichen und tatsächlichen Umstände mit Blick auf die Beschaffenheit
                  und den Betrieb der informationstechnischen Systeme, Komponenten und Prozesse unabhängig ist."
                </blockquote>
                <p>
                  Das ist eine <strong>IT-spezifische Unabhängigkeit</strong>, nicht nur eine gesellschaftsrechtliche. Entscheidend ist, ob
                  der Rechtsträger seinen IT-Betrieb in der Praxis tatsächlich eigenständig führen könnte.
                </p>
                <p className="font-semibold" style={{ color: 'var(--text)' }}>Kriterien für echte IT-Unabhängigkeit:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Eigener Microsoft-365-Tenant / eigene AD-Domain</li>
                  <li>Eigene IT-Administratoren ohne Zugriff auf Verbund-Systeme</li>
                  <li>Eigene Firewalls und Netzsegmente</li>
                  <li>Eigene Backup- und Recovery-Lösung</li>
                  <li>Eigenes Endpoint-/MDM-Management</li>
                  <li>Eigene Logging- und Monitoring-Systeme</li>
                  <li>Dokumentierbar und nachweisbar (nicht nur auf dem Papier)</li>
                </ul>
                <p>
                  <strong>Paradoxie bei zentraler IT für Töchter:</strong> Gerade wenn ein Rechtsträger <em>zentrale IT-Leistungen</em> für
                  andere Verbundunternehmen erbringt, ist er definitionsgemäß mit diesen IT-seitig verflochten und damit <strong>nicht</strong>
                  unabhängig im Sinne des § 28 Abs. 4 BSIG. Die Ausnahme passt also gerade auf den MSP-Fall regelmäßig nicht — in diesen
                  Konstellationen sind die Verbund-Kennzahlen mitzurechnen.
                </p>
              </div>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Gibt es eine Ausnahme für »vernachlässigbare Geschäftstätigkeit«? (§ 28 Abs. 3 BSIG)
              </summary>
              <div className="mt-2 text-sm pl-4 space-y-2" style={{ color: 'var(--text-light)' }}>
                <p>
                  § 28 Abs. 3 BSIG kennt eine <strong>enge Ausnahme</strong> für Einrichtungen, deren Tätigkeit in einer NIS-2-relevanten
                  Sparte vernachlässigbar ist (Nebentätigkeit ohne Systemrelevanz). Die Norm wird in der Fachliteratur teilweise als
                  europarechtlich problematisch kritisiert.
                </p>
                <p>
                  <strong>Für einen echten zentralen IT-Betrieb</strong> mit Administrations- und Betriebszugriff hilft diese Ausnahme in
                  der Praxis kaum — zentrale IT ist definitionsgemäß systemrelevant und keine Nebentätigkeit. Die Ausnahme kann nur bei
                  randständigen Konstellationen relevant werden, etwa wenn eine ansonsten unabhängige Einheit nur gelegentlich vereinzelte
                  IT-Handreichungen leistet.
                </p>
                <p>
                  <strong>Tipp:</strong> Verlassen Sie sich nicht auf § 28 Abs. 3 BSIG, ohne die Konstellation juristisch prüfen zu lassen.
                </p>
              </div>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold hover:text-[#e30613] transition-colors" style={{ color: 'var(--text)' }}>
                Welche Schritte prüft das Tool im MSP-Pfad?
              </summary>
              <div className="mt-2 text-sm pl-4 space-y-2" style={{ color: 'var(--text-light)' }}>
                <p>Der Self-Check arbeitet im MSP-Pfad in vier Prüfschritten:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li><strong>MSP-01</strong>: Erbringt die Einheit operative IT-Betriebsleistungen für andere juristische Personen? (Inhouse vs. Fremdbezug)</li>
                  <li><strong>MSP-03</strong>: Für wen werden die Leistungen erbracht? (Abgrenzung Inhouse / Partner / verbunden / extern)</li>
                  <li><strong>MSP-06</strong>: Ist der IT-erbringende Rechtsträger IT-seitig vom Verbund unabhängig nach § 28 Abs. 4 BSIG?</li>
                  <li><strong>Schwellenwertprüfung</strong>: Isolierte Prüfung auf Ebene des IT-Rechtsträgers (THR-01/02/03) UND — bei IT-Verflechtung — konsolidierte Prüfung mit Verbund-Kennzahlen (Gesamt-VZÄ, Gesamtumsatz in den Grunddaten).</li>
                </ol>
                <p>
                  Wird die Betroffenheit erst durch die konsolidierte Prüfung ausgelöst, macht das Tool dies im Ergebnis transparent
                  (§ 28 Abs. 4 BSIG-Callout) und weist explizit darauf hin, dass die Aggregation verbundener Unternehmen angewendet wurde.
                </p>
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

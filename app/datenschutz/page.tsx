import Link from 'next/link';

export default function Datenschutz() {
  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="drk-card">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>Datenschutzerklärung</h2>

          <div className="space-y-6" style={{ color: 'var(--text-light)' }}>
            <section>
              <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>1. Verantwortlicher</h3>
              <p>
                DRK-Kreisverband Städteregion Aachen e.V.<br />
                Henry-Dunant-Platz 1, 52146 Würselen<br />
                Telefon: 02405 6039100<br />
                E-Mail:{' '}
                <a href="mailto:Info@DRK-Aachen.de" style={{ color: 'var(--drk)' }} className="hover:underline">
                  Info@DRK-Aachen.de
                </a>
              </p>
            </section>

            <section>
              <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>2. Grundsatz</h3>
              <p>
                Diese Anwendung wurde nach dem Prinzip der Datensparsamkeit entwickelt.
                Es werden <strong>keine personenbezogenen Daten</strong> erhoben, gespeichert oder an Dritte
                übermittelt.
              </p>
            </section>

            <section>
              <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>3. Datenverarbeitung</h3>
              <p>
                <strong>Keine Cookies:</strong> Diese Anwendung verwendet keine Cookies.<br />
                <strong>Keine Tracking-Dienste:</strong> Es werden keine Analytics- oder Tracking-Tools eingesetzt.<br />
                <strong>Keine externen Dienste:</strong> Es werden keine externen Schriftarten, CDNs oder Dienste geladen.
                Alle Ressourcen werden lokal bereitgestellt.
              </p>
            </section>

            <section>
              <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>4. Lokale Speicherung</h3>
              <p>
                Der NIS-2 Self-Check speichert Ihren Wizard-Fortschritt
                und die Auswertungsergebnisse ausschließlich im lokalen Browser-Speicher (localStorage)
                Ihres Geräts. Diese Daten verlassen Ihr Gerät nicht und können jederzeit über die
                Browser-Einstellungen oder durch Neustarten des Checks gelöscht werden.
              </p>
            </section>

            <section>
              <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>5. QR-Code-Funktion</h3>
              <p>
                Der auf dem PDF-Ergebnis enthaltene QR-Code speichert Ihre Antworten in komprimierter Form
                direkt im Code. Die Daten werden nicht auf einem Server abgelegt. Das Scannen des QR-Codes
                öffnet die Anwendung mit den gespeicherten Antworten ausschließlich in Ihrem Browser.
              </p>
            </section>

            <section>
              <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>6. Hosting</h3>
              <p>
                Diese Anwendung wird auf einem eigenen Server (VPS) in Deutschland gehostet.
                Dabei werden ausschließlich technisch notwendige Zugriffsdaten (IP-Adresse, Zeitstempel)
                in Server-Logdateien temporär gespeichert. Es werden keine Daten an Drittanbieter übermittelt.
              </p>
            </section>

            <section>
              <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>7. Keine dauerhafte Speicherung</h3>
              <p>
                Es werden keine Daten dauerhaft gespeichert. Alle Eingaben verbleiben lokal in Ihrem Browser
                und werden beim Löschen des Browserspeichers oder beim Starten eines neuen Checks entfernt.
              </p>
            </section>

            <section>
              <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>8. Ihre Rechte</h3>
              <p>
                Da diese Anwendung keine personenbezogenen Daten verarbeitet, sind die Betroffenenrechte
                (Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch)
                in der Regel nicht betroffen. Bei Fragen wenden Sie sich an den oben genannten Verantwortlichen.
              </p>
            </section>

            <section>
              <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>9. Open Source</h3>
              <p>
                Der gesamte Quellcode dieser Anwendung ist öffentlich einsehbar und überprüfbar auf{' '}
                <a
                  href="https://github.com/AFielen/NIS2-Audit"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--drk)' }}
                  className="hover:underline"
                >
                  GitHub
                </a>.
              </p>
            </section>

            <section>
              <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>10. Änderungen</h3>
              <p>
                Diese Datenschutzerklärung kann bei Änderungen an der Anwendung angepasst werden.
                Die aktuelle Version ist stets unter /datenschutz abrufbar.
              </p>
            </section>
          </div>

          <div className="mt-8">
            <Link href="/" style={{ color: 'var(--drk)' }} className="hover:underline text-sm font-semibold">
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

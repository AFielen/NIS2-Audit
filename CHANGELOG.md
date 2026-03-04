# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/).

---

## [Unreleased]

### Changed
- **Ergebnis C/D: Klarstellung gesamter KV-Scope**: Bei Ergebnis C und D wird jetzt deutlich kommuniziert, dass durch fehlende harte Trennung der gesamte DRK-Kreisverband unter NIS-2 fällt — nicht nur der Rettungsdienst. Neuer prominenter Warnhinweis in der Executive Summary, aktualisierte Outcome-Texte im Ruleset, überarbeitete ScopeCards und i18n-Labels.
- **Gesamt-VZÄ/Umsatz auf Schwellenwerte-Seite verschoben**: Die Felder für Gesamt-VZÄ und Gesamtumsatz des Verbands befinden sich jetzt auf der Schwellenwerte-Seite (Step 4) statt auf der Startseite. Bei ORG-01 „Alles im Kreisverband" werden die Werte automatisch aus den Rechtsträger-Feldern (THR-01/THR-02) übernommen.

### Security
- **Input-Validierung**: `maxLength={200}` auf Grunddaten-Textfeldern, `isFinite`-Check und Obergrenze (999.999) bei Number-Inputs.
- **Schema-Validierung**: localStorage- und QR-Code-Daten werden nach dem Parsen auf gültige Typen und Längenbegrenzungen geprüft (Prototype-Pollution-sichere Keys, nur string/number-Werte).
- **Prototype-Pollution-Schutz**: `getPath`/`setPath` in der Rule-Engine blockieren `__proto__`, `constructor`, `prototype`.
- **Content-Security-Policy**: CSP-Header in nginx.conf (`default-src 'self'`; Script/Font/Img eingeschränkt).
- **Permissions-Policy**: Kamera, Mikrofon, Geolocation, Payment explizit deaktiviert.
- **Docker non-root**: Container läuft als `nginx`-User statt als root.

### Added
- **Grundschutz-10 Handlungsempfehlungen**: Jede der 10 Grundschutz-Karten ist jetzt klickbar und öffnet eine Detailansicht mit GF-orientierten Handlungsempfehlungen (Bottom Sheet mobil / Modal desktop). Content-Datei `lib/content/grundschutz-details.ts` als Single Source of Truth. Wiederverwendbar auf `/grundschutz`-Seite und in der Ergebnis-Roadmap.
- **Grunddaten im QR-Code**: Name, Adresse und Vorstand werden jetzt mit im QR-Code gespeichert und beim Scannen wiederhergestellt. Der bisherige Hinweis, dass Grunddaten nicht enthalten sind, entfällt.
- **Gesamt-VZÄ und Gesamtumsatz des Verbands**: Neue Felder in den Grunddaten erfassen VZÄ und Umsatz des gesamten Kreisverbands. Die S/L/M-Größenklasse wird darauf basierend abgeleitet.
- **Roadmap-Fulfillment-Anzeige**: Roadmap-Packs, deren zugrunde liegende Fragen bereits positiv beantwortet wurden, werden mit grünem Haken und „Erfüllt"-Badge dargestellt. Teilerfüllung wird als Fortschrittsanzeige (z. B. „1/2 Kriterien") angezeigt.
- **Antwortoption „Nicht bekannt"**: IT-Struktur-Fragen (IT-01 bis IT-05), Trennungsfragen (SEP-01 bis SEP-08) und Sicherheitsreife-Fragen (SEC-01 bis SEC-12) können jetzt mit „Nicht bekannt" beantwortet werden. Scoring entspricht „Nein" (0 Punkte), aber die Fragen erscheinen als offene Punkte im Ergebnis.
- **Offene-Punkte-Sektion im Ergebnis**: Neue Komponente „Offene Punkte – Noch zu klären" auf der Ergebnisseite, die alle mit „Nicht bekannt" beantworteten Fragen als druckbare Todo-Liste darstellt.
- **JSON-Export erweitert**: Export enthält jetzt ein `unknownItems`-Feld mit allen offenen Punkten (Version 1.1.0).
- **Haftungsausschluss**: Ergebnisseite zeigt jetzt einen Disclaimer mit Sternchen (*) am Ergebnis-Badge. Bei Ergebnis A/B wird ein erweiterter Hinweistext angezeigt, dass die Einschätzung keine Rechtsberatung ersetzt.
- **Geschäftsführerhaftung-Warnung**: Bei Ergebnis A mit schlechter Sicherheitsreife (kritisch/basal) wird ein Warnhinweis zur Eigenverantwortung und persönlichen Haftung nach § 43 GmbHG / § 93 AktG angezeigt.
- **Hint-Icons (?) auf Ergebnisfeldern**: Die Felder „Rettungsdienst-Anbieter", „Direkt reguliert" und „Einstufung" in der Executive Summary haben jetzt erklärende Tooltip-Buttons.
- **Unterschriftenzeile im Ergebnis**: Neue Signatur-Sektion mit Datum, Ort und Unterschriftenfeld für Verantwortliche.
- **Berichts-Header erweitert**: Ergebnisseite zeigt KV-Name, Adresse, verantwortliche Person und Datum prominent im Header.
- **QR-Code-Sicherheitshinweise**: QR-Code-Sektion enthält jetzt Hinweise zur Datenspeicherung (nur im QR-Code, nicht auf Servern), Vertraulichkeitswarnung und Hinweis, dass Grunddaten nicht im QR-Code enthalten sind.
- `CHANGELOG.md` erstellt.
- CLAUDE.md um Pflicht zur CHANGELOG-Pflege ergänzt.
- **Accessibility**: `focus-visible`-Outline für `<details>`/`<summary>` Elemente auf der Hilfe-Seite.

### Changed
- **Pack-Roadmap deaktiviert**: RoadmapView (Pack-basierte 90-Tage-Roadmap mit P1–P7) wird vorübergehend nicht angezeigt. LayeredRoadmapView (Individuelle Umsetzungs-Roadmap) bleibt aktiv.
- **S/L/M-Sizing auf Verbands-Gesamtwerte**: Größenklasse basiert jetzt auf Gesamt-VZÄ des Verbands (Grunddaten) statt auf den RD-spezifischen Schwellenwerten.
- `RoadmapView`-Komponente akzeptiert jetzt optionale `answers`-Prop für Fulfillment-Check.
- `QuestionCard` zeigt „Nicht bekannt"-Auswahl visuell in Gelb statt Rot an.
- JSON-Ruleset um `unknown`-Option und Scoring erweitert.
- **IT-OVERVIEW Terminologie**: Option „geteilt" durch „gemeinsam" ersetzt für klarere Sprache.
- **IT-OVERVIEW Hilfetext erweitert**: Detaillierte Erklärung der drei Antwortoptionen (gemeinsam / teilweise / getrennt) mit konkreten Beispielen.
- **SEP-OVERVIEW Hilfetext erweitert**: Hinweis auf Dokumentationspflicht und Notwendigkeit externer Bestätigung ergänzt.
- **Roadmaps klappbar**: Beide Roadmap-Sektionen (Umsetzungs-Roadmap und 90-Tage-Roadmap) sind jetzt standardmäßig eingeklappt mit Titel „Vorschlag: … Roadmap nach BSI".
- **Projekt-Links aktualisiert**: DRK Vereinsabstimmung → `https://abstimmung.henryagi.de`, DRK Selbstauskunft → `https://selbstauskunft.henryagi.de/`.
- **Druckansicht**: Zugeklappte Sektionen öffnen sich automatisch im Druckmodus. TriggeredRulesList zeigt alle Regeln im Druck.
- **Unterschriftenzeile**: Nur noch im Druck/PDF sichtbar, nicht mehr auf dem Bildschirm.
- **Roadmap-Titel**: „Umsetzungs-Roadmap" umbenannt in „Vorschlag: Individuelle Umsetzungs-Roadmap nach BSI".
- **Mobile-Optimierung**: Ergebnisseite (Outcome-Badge, Report-Header, QR-Code-Bereich, Tooltip-Positionierung), Header-Subtitle responsive für kleine Screens, Step-Navigation mit größeren Touch-Targets.
- **Konsistenz**: `not-found.tsx` und `spenden/page.tsx` nutzen jetzt CSS-Variablen statt Tailwind-Hardcoded-Farben. QR-Banner-Close-Button nutzt SVG statt Emoji.
- **Touch-Targets**: Hilfe-Toggle in QuestionCard auf 44px Mindesthöhe erweitert.

---

## [1.0.0] – 2026-03-03

### Added
- Initiale Implementierung des NIS-2 Self-Audit-Tools.
- 7-Schritte-Wizard mit ~32 Fragen in 6 Bereichen (Organisation, Leistungen, Schwellenwerte, IT-Struktur, Harte Trennung, Sicherheitsreife).
- Einzelnes JSON-Regelwerk (`nis2-drk-ruleset.v1.json`) als Single Source of Truth.
- 3 Presets für typische DRK-KV-Strukturen.
- 16-Regel-Evaluations-Engine mit Ergebnis A/B/C/D.
- Getrennte Darstellung von juristischem und technischem Scope.
- Shared-IT-Analyse und harte Trennungslogik (8 Kriterien).
- 12 Sicherheitsreife-Kontrollen mit Reifegrad-Bewertung (Kritisch/Basal/Belastbar/Fortgeschritten).
- 7 Roadmap-Maßnahmenpakete (P1–P7).
- Layered Roadmap mit S/M/L-Sizing.
- BSI-Registrierungshinweis mit Deadline.
- QR-Code für Offline-Datenpersistenz.
- Grunddaten-Erfassung (Kreisverband, Adresse, Vorstand).
- Druckoptimierte Ergebnisansicht + JSON-Export.
- Wizard-Fortschritt in localStorage (Session-Resume).
- Pflichtseiten: Impressum, Datenschutz, Hilfe, Spenden.
- Docker-Deployment-Setup (Dockerfile, nginx, docker-compose).
- Vollständig clientseitig – DSGVO-konform, keine externen Dienste.

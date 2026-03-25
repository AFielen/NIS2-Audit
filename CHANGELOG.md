# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/).

---

## [Unreleased]

### Added
- **Error Boundary**: `ErrorBoundary`-Komponente in `components/ErrorBoundary.tsx` erstellt und in `app/layout.tsx` integriert. Zeigt benutzerfreundliche Fehlermeldung statt leerer Seite bei unerwarteten Rendering-Fehlern.

### Fixed
- **Silent Catch Blocks**: Alle stummen `catch { /* ignore */ }` Blöcke durch `console.warn()` mit beschreibenden Meldungen ersetzt (AssessmentWizard, ExportActions, Kosten, Lieferkette, Tracker, Ergebnis, Briefing).
- **Accessibility**: `aria-hidden="true"` zu allen dekorativen SVG-Icons in `app/page.tsx` und `app/layout.tsx` hinzugefügt, um Screenreader-Verwirrung zu vermeiden.
- **Hardcodierte Farbe**: `#eff6ff` in `app/page.tsx` durch CSS-Variable `var(--info-bg)` ersetzt.
- **QR-Code Base-URL**: `window.location.origin` durch `process.env.NEXT_PUBLIC_APP_URL` mit Fallback ersetzt (`ExportActions.tsx`, `briefing/page.tsx`).
- **dangerouslySetInnerHTML Dokumentation**: Sicherheitskommentare zu allen `dangerouslySetInnerHTML`-Verwendungen hinzugefügt, die erklären, warum das Pattern sicher ist (QR-SVG aus `lib/qr-svg.ts`).

### Added
- **`.claude/` Ordner**: Skills, Agents und Konfiguration aus dem DRK App Template übernommen (coding-workflow, code-review, code-simplifier, commit-push-pr, pr-description, coding-presets, data-analyst, data-triage, data-workflow, data-model-explorer, repo-skills, drk-postgres mit Referenz-Dateien).
- **CLAUDE.md erweitert**: Neuer Abschnitt "Claude Code Subagenten & Skills" mit Übersicht der verfügbaren Skills, Execution Rules, Repo Conventions und Core Rules für autonome Subagenten.

### Changed
- **Produktions-Migration**: App von `nis2.henryagi.de` (Cloudflare Tunnel) auf eigene Domain `drk-nis2.de` migriert. Läuft jetzt auf eigenem VPS mit Caddy Reverse Proxy.
- **Docker-Setup optimiert**: Container läuft im gemeinsamen `caddy-net` Netzwerk (external), keine Ports nach außen exponiert. Health-Check hinzugefügt. Dev-Profil für lokale Entwicklung mit exponierten Ports.
- **Domain-Referenzen konfigurierbar**: Alle hardcodierten URLs (`henryagi.de`) durch Umgebungsvariablen (`NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_ABSTIMMUNG_URL`, `NEXT_PUBLIC_SELBSTAUSKUNFT_URL`) ersetzt.
- **Datenschutzerklärung aktualisiert**: Cloudflare-Referenzen entfernt, Hosting-Beschreibung auf eigenen VPS in Deutschland aktualisiert.
- **CLAUDE.md erweitert**: Neue Architektur-Sektion mit Caddy-Setup, Docker-Netzwerk, Umgebungsvariablen und Deployment-Anleitung.
- **Dockerfile optimiert**: `NEXT_PUBLIC_`-Variablen als `ARG` + `ENV` für korrektes Build-Time-Inlining. Health-Check im Container.
- **Tablet-Responsive**: 3-Spalten-Grids in ExecutiveSummary und VorstandBriefing auf `sm:2 / lg:3` angepasst für bessere Lesbarkeit auf Tablets.

### Added
- **`.env.example`**: Dokumentiert alle Umgebungsvariablen mit Defaults.
- **Docker dev-Profil**: `docker compose --profile dev up app-dev` für lokale Entwicklung mit Port-Mapping.

### Removed
- **Cloudflare-Tunnel-Konfiguration**: Alle Cloudflare-Referenzen aus Code und Dokumentation entfernt.
- **Duplicate `logo.png`**: Redundante Kopie im Root-Verzeichnis entfernt (nur noch `public/logo.png`).
- **`Claude Code Anweisung v2.md`**: Veraltete Anweisungsdatei entfernt.

### Security
- **`.dockerignore` erweitert**: `.env`-Dateien werden nicht in den Docker-Build-Kontext kopiert.

### Added
- **BSI-Registrierungsstatus**: Neue Frage (REG-01) in Wizard-Schritt 5 fragt ab, ob die BSI-Registrierung bereits erfolgt ist. Ergebnis-Anzeige passt sich dynamisch an (abgeschlossen/in Bearbeitung/ausstehend). Registrierungsfrist-Texte auf Vergangenheitsform aktualisiert (Frist war 06.03.2026). Vorstandsbriefing reflektiert Registrierungsstatus.
- **Modul 3: Vorstand-Briefing-Generator**: Druckfertiger A4-Einseiter für Vorstandssitzungen unter `/ergebnis/briefing`. Generiert sich automatisch aus Self-Check-Ergebnis mit Betroffenheit, Pflichten, Haftung, Kosten und nächsten Schritten.
- **Modul 1: Kostenrechner**: Bundesland-spezifische NIS-2-Kostenberechnung unter `/kosten`. 11 Kostenbereiche nach §30 BSIG, Kooperationsrechner (2–15 KV), Refinanzierungspfade für alle 16 Bundesländer, druckbare Haushaltsvorlage.
- **Modul 4: Lieferketten-Check**: Indirekte NIS-2-Betroffenheitsprüfung unter `/lieferkette`. 6 Ja/Nein-Fragen zur Lieferkettenrelevanz, Anforderungskatalog, Handlungsempfehlung.
- **Modul 2: Compliance-Tracker**: Langzeit-Begleitung unter `/tracker`. 21 Pflichtaufgaben in 3 Phasen, 18 Pflichtdokumente, Status-Tracking, Verantwortlichkeiten, Fortschrittsbalken, Druckexport.
- **Navigation**: Neue Navigationsleiste mit Links zu allen Modulen. Startseite um 4 Feature-Cards erweitert.
- **Ergebnis-Seite**: Lieferketten-Check-Hinweis bei Outcome D. Vorstand-Briefing-Button in Export-Aktionen.

### Changed
- **Lieferketten-Check → Indirekte Betroffenheit**: Modul umbenannt für bessere Verständlichkeit. Erweiterter Intro-Text erklärt warum indirekte Betroffenheit relevant ist. Anforderungs-Kacheln haben aufklappbare GF-Handlungshinweise. LK-06 Fragetext neutralisiert (ohne SoCura-Referenz). Feature-Cards auf Startseite für Kostenrechner und Indirekte Betroffenheit reaktiviert.
- **Vorstandsbriefing: Kostenrechner-Hinweis**: Unter den orientierenden Kosten wird jetzt auf den detaillierten Kostenrechner verwiesen.
- **Vorstandsbriefing: QR-Code repariert**: QR-Code zeigt jetzt die Basis-URL statt der komprimierten State-URL (die zu lang für zuverlässige QR-Kodierung bei 80px war).
- **Ergebnis-Seite: Kostenrechner-Badge**: Prominenter Link zum Kostenrechner-Modul auf der Ergebnis-Seite.
- **Self-Check Resume-Dialog: Bericht-Link**: Bei vorhandenen Ergebnissen zeigt der Wiederaufnahme-Dialog jetzt einen direkten Link zum letzten Bericht.
- **Kostenrechner: Antwortbasierte Kostenberechnung**: Kosten werden jetzt anhand der Self-Check-Antworten (SEC-Fragen) reduziert. „Bereits umgesetzt" = 0 EUR, „Teilweise" = Minimalwert, „Nein" = volle Spanne. Gilt für einmalige und jährliche Kosten.
- **Kostenrechner & Tracker: Self-Check-Pflicht**: Beide Module erfordern jetzt einen abgeschlossenen Self-Check, bevor Inhalte angezeigt werden.
- **Kooperationsrechner ausgeblendet**: Temporär aus dem Kostenrechner entfernt.
- **Compliance-Tracker aus Navigation entfernt**: Nur noch über Direktlink `/tracker` erreichbar.

### Fixed
- **BSI-Registrierung bei Outcome B**: Bei Ergebnis B (direkt betroffen, Scope begrenzbar) wird die BSI-Registrierung jetzt korrekt als Pflicht angezeigt. Wer direkt unter NIS-2 fällt, muss sich registrieren — auch wenn der Scope durch harte Trennung begrenzt werden kann.

### Removed
- **ORG-09 aus Organisations-Wizard entfernt**: Die VZÄ-Abfrage im Organisations-Schritt war redundant, da sie im Schwellenwert-Schritt (THR-01) ohnehin gestellt wird. Preset „Kreisverband mit RD als Abteilung" setzt VZÄ jetzt direkt auf THR-01.

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
- **90-Tage-Roadmap Detailansichten**: Alle 29 Items der 90-Tage-Roadmap (Klein/Mittel/Groß) sind jetzt klickbar und öffnen eine Detailansicht mit GF-orientierten Erklärungstexten — analog zu den Grundschutz-10 Handlungsempfehlungen. Content-Datei `lib/content/roadmap90-details.ts` mit Feldern: Warum wichtig, Management-Aktion, Praktische Schritte, Einfache Umsetzung, Erledigt wenn, Nachweise, Häufiger Fehler, Management-Aufwand.
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

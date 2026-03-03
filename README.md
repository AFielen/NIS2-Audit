# 🛡️ NIS-2 Audit – Self-Check für DRK-Kreisverbände

**DRK-spezifische NIS-2-Betroffenheitsanalyse mit Ergebnislogik, Scope-Bewertung und 90-Tage-Roadmap.**

Open Source · Kostenlos · DSGVO-konform · Gebaut mit ❤️ für das Deutsche Rote Kreuz

---

## Was ist das?

Der NIS-2 Self-Check hilft DRK-Kreisverbänden (KV), in 10–15 Minuten ihre wahrscheinliche NIS-2-Betroffenheit zu prüfen. Das Tool analysiert Organisationsstruktur, Leistungsbereiche, Schwellenwerte, IT-Architektur und Sicherheitsreife und generiert ein konkretes Ergebnis mit priorisierter 90-Tage-Roadmap.

**Zielgruppen:** Kreisgeschäftsführungen, IT-Leitungen, Vorstände, Compliance-Verantwortliche.

---

## Regelwerk

Die App verwendet ein **einzelnes Regelwerk** (`DRK Standard Pack v1.0`), definiert in einer zentralen JSON-Datei:

```
lib/rules/nis2-drk-ruleset.v1.json
```

Diese Datei ist die **Single Source of Truth** für:
- Alle Fragen (Texte, Antwortoptionen, Sichtbarkeitsbedingungen)
- Alle Entscheidungsregeln (WHEN/THEN-Muster)
- Scoring-Konfiguration (Sicherheitsreife-Bewertung)
- Roadmap-Pakete (Maßnahmen)

Rettungsdienst wird als potenziell NIS-2-relevante Einrichtungsart behandelt.

---

## Features

### Web-App
- 7-Schritte-Wizard mit ~32 Fragen in 6 Bereichen
- 3 Presets für typische KV-Verbundstrukturen
- Ergebnis A/B/C/D mit regelbasierter Ableitung
- Getrennte Darstellung von juristischem und technischem Scope
- Shared-IT-Analyse und harte Trennungslogik (8/8 Kriterien)
- 12 Sicherheitsreife-Kontrollen mit Reifegrad-Bewertung
- Priorisierte 90-Tage-Roadmap aus 7 Maßnahmenpaketen
- QR-Code auf dem PDF-Ergebnis für Offline-Datenpersistenz
- Druckoptimierte Ergebnisansicht + JSON-Export
- Wizard-Fortschritt in localStorage
- Vollständig clientseitig – keine Daten verlassen den Browser

---

## Installation

### Lokal entwickeln

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000).

### Docker (VPS)

```bash
git clone https://github.com/AFielen/NIS2-Audit.git
cd NIS2-Audit
docker compose up -d --build
```

Die App läuft auf Port `3000`. Zum Aktualisieren:

```bash
git pull
docker compose up -d --build
```

---

## Tech-Stack

| Technologie | Version | Zweck |
|---|---|---|
| Next.js | 16 | App-Framework (App Router) |
| React | 19 | UI-Library |
| TypeScript | strict | Typisierung |
| Tailwind CSS | 4 | Styling |
| lz-string | 1.x | Datenkompression für QR-Codes |

Keine externen Fonts, keine Cookies, kein Tracking, keine Datenbank.

---

## Projektstruktur

```
NIS2-Audit/
├── app/
│   ├── layout.tsx               # Root-Layout: DRK-Header + Footer
│   ├── page.tsx                 # Landing Page
│   ├── globals.css              # DRK Design-Tokens + Print-Styles
│   ├── check/page.tsx           # Wizard-Seite
│   ├── ergebnis/page.tsx        # Ergebnisseite
│   ├── hilfe/page.tsx           # FAQ mit NIS-2-Fragen
│   ├── impressum/page.tsx       # Pflicht
│   ├── datenschutz/page.tsx     # Pflicht
│   ├── spenden/page.tsx         # Pflicht
│   └── not-found.tsx            # 404
├── components/
│   ├── assessment/
│   │   ├── AssessmentWizard.tsx  # Wizard-Container + QR-Restore
│   │   ├── StepNavigation.tsx   # Fortschrittsanzeige
│   │   ├── QuestionCard.tsx     # Fragenkarte (select + number)
│   │   └── PresetSelector.tsx   # Preset-Auswahl
│   └── results/
│       ├── ExecutiveSummary.tsx  # Ergebnis-Badge + Zusammenfassung
│       ├── ScopeCards.tsx       # Juristischer + technischer Scope
│       ├── MaturityBadge.tsx    # Reifegrad-Anzeige
│       ├── TriggeredRulesList.tsx # Auslösende Regeln
│       ├── RoadmapView.tsx      # 90-Tage-Roadmap
│       └── ExportActions.tsx    # Drucken/Export + QR-Code
├── lib/
│   ├── types.ts                 # Alle Domain-Typen
│   ├── storage.ts               # localStorage-Helpers
│   ├── presets.ts               # 3 KV-Presets
│   ├── report.ts                # Ergebnistexte + JSON-Export
│   ├── state-codec.ts           # LZ-String State-Kodierung für QR
│   ├── qr-svg.ts                # QR-Code SVG-Generierung
│   ├── i18n.ts                  # Zweisprachigkeit (DE/EN)
│   ├── version.ts               # Versionsinformationen
│   └── rules/
│       ├── nis2-drk-ruleset.v1.json  # Single Source of Truth (Regelwerk)
│       └── evaluate.ts              # Generische Evaluations-Engine
├── public/
│   ├── logo.png                 # DRK-Logo (42×42px)
│   └── favicon.svg              # DRK Favicon
├── CLAUDE.md                    # Konventionen für Claude Code
├── PROJECT.md                   # Interne Projektdokumentation
├── README.md                    # Diese Datei
├── Dockerfile                   # Docker-Build
├── docker-compose.yml           # Docker Compose
└── next.config.ts               # Static Export
```

---

## Datenschutz & Sicherheit

- Keine Datenbank
- Keine Cookies
- Keine externen Dienste oder CDNs
- Keine Authentifizierung
- Alle Daten ausschließlich in localStorage
- QR-Code enthält komprimierte Antworten – keine Serverübertragung
- Open-Source-Quellcode

---

## Beitragen

1. Repository forken
2. Feature-Branch erstellen (`git checkout -b feat/mein-feature`)
3. Änderungen committen (`git commit -m 'feat: mein Feature'`)
4. Branch pushen (`git push origin feat/mein-feature`)
5. Pull Request erstellen

---

## Lizenz

MIT – siehe [LICENSE](LICENSE)

---

## Über

Entwickelt vom **DRK Kreisverband StädteRegion Aachen e.V.**

Henry-Dunant-Platz 1, 52146 Würselen
E-Mail: Info@DRK-Aachen.de
Web: https://www.drk-aachen.de

Gebaut mit ❤️ für das Deutsche Rote Kreuz

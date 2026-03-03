# 🛡️ NIS-2 Audit – Self-Check für DRK-Kreisverbände

**DRK-spezifische NIS-2-Betroffenheitsanalyse mit Ergebnislogik, Scope-Bewertung und 90-Tage-Roadmap.**

Open Source · Kostenlos · DSGVO-konform · Gebaut mit ❤️ für das Deutsche Rote Kreuz

---

## Was ist das?

Der NIS-2 Self-Check hilft DRK-Kreisverbänden (KV), in 10–15 Minuten ihre wahrscheinliche NIS-2-Betroffenheit zu prüfen. Das Tool analysiert Organisationsstruktur, Leistungsbereiche, Schwellenwerte, IT-Architektur und Sicherheitsreife und generiert ein konkretes Ergebnis mit priorisierter 90-Tage-Roadmap.

**Zielgruppen:** Kreisgeschäftsführungen, IT-Leitungen, Vorstände, Compliance-Verantwortliche.

---

## Features

### Web-App
- 8-Schritte-Wizard mit ~40 Fragen in 6 Blöcken
- Zwei umschaltbare Regelstände (BSI-öffentlich, Verbandslinie konservativ)
- 3 Presets für typische KV-Verbundstrukturen
- Ergebnis A/B/C/D mit regelbasierter Ableitung
- Getrennte Darstellung von juristischem und technischem Scope
- Shared-IT-Analyse und harte Trennungslogik
- 12 Sicherheitsreife-Kontrollen mit Reifegrad-Bewertung
- Priorisierte 90-Tage-Roadmap aus 12 Maßnahmenpaketen
- Hilfe-Tooltips (?) bei jeder Frage mit Kontexterklärung
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
| qrcode | 1.x | QR-Code-Generierung |
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
│   │   ├── QuestionCard.tsx     # Fragenkarte mit Hilfe-Tooltip
│   │   ├── PolicyPackSwitch.tsx # Regelstand-Auswahl
│   │   └── PresetSelector.tsx   # Preset-Auswahl
│   └── results/
│       ├── ExecutiveSummary.tsx  # Ergebnis-Badge + Zusammenfassung
│       ├── ScopeCards.tsx       # Juristischer + technischer Scope
│       ├── MaturityBadge.tsx    # Reifegrad-Anzeige
│       ├── TopRisks.tsx         # Top-5-Risiken
│       ├── TriggeredRulesList.tsx # Auslösende Regeln
│       ├── RoadmapView.tsx      # 90-Tage-Roadmap
│       └── ExportActions.tsx    # Drucken/Export + QR-Code
├── lib/
│   ├── types.ts                 # Alle Domain-Typen
│   ├── questions.ts             # Fragenkatalog mit Hilfe-Texten (DE/EN)
│   ├── scoring.ts               # Reifegrad-Berechnung
│   ├── storage.ts               # localStorage-Helpers
│   ├── presets.ts               # 3 KV-Presets
│   ├── report.ts                # Ergebnistexte + JSON-Export
│   ├── state-codec.ts           # LZ-String State-Kodierung für QR
│   ├── qr-svg.ts                # QR-Code SVG-Generierung
│   ├── i18n.ts                  # Zweisprachigkeit (DE/EN)
│   ├── version.ts               # Versionsinformationen
│   └── rules/
│       ├── policy-packs.ts      # 2 Policy-Packs
│       ├── decision-matrix.ts   # Entscheidungsmatrix (~60 Regeln)
│       ├── evaluate.ts          # Evaluations-Engine (10 Schritte)
│       └── roadmap.ts           # 12 Roadmap-Packs (P1–P12)
├── public/
│   ├── logo.png                 # DRK-Logo (42×42px)
│   └── favicon.svg              # DRK Favicon
├── CLAUDE.md                    # Konventionen für Claude Code
├── PROJECT.md                   # Interne Projektdokumentation
├── README.md                    # Diese Datei
├── Dockerfile                   # Docker-Build
├── docker-compose.yml           # Docker Compose
└── next.config.ts               # Standalone Output
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

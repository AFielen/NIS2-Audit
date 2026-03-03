# 🛡️ NIS-2 Audit – Self-Check für DRK-Verbände

**DRK-spezifische NIS-2-Betroffenheitsanalyse mit Ergebnislogik, Scope-Bewertung und 90-Tage-Roadmap.**

Open Source · Kostenlos · DSGVO-konform · Gebaut mit ❤️ für das Deutsche Rote Kreuz

---

## Was ist das?

Der NIS-2 Self-Check hilft DRK-Kreisverbänden und Landesverbänden, in 10–15 Minuten ihre wahrscheinliche NIS-2-Betroffenheit zu prüfen. Das Tool analysiert Organisationsstruktur, Leistungsbereiche, Schwellenwerte, IT-Architektur und Sicherheitsreife und generiert ein konkretes Ergebnis mit priorisierter 90-Tage-Roadmap.

**Zielgruppen:** Kreisgeschäftsführungen, IT-Leitungen, Vorstände, Compliance-Verantwortliche, Landesverbände als Servicestelle.

---

## Features

### Web-App
- 8-Schritte-Wizard mit ~40 Fragen in 6 Blöcken
- Zwei umschaltbare Regelstände (BSI-öffentlich, Verbandslinie konservativ)
- 5 Presets für typische DRK-Verbundstrukturen
- Ergebnis A/B/C/D mit regelbasierter Ableitung
- Getrennte Darstellung von juristischem und technischem Scope
- Shared-IT-Analyse und harte Trennungslogik
- 12 Sicherheitsreife-Kontrollen mit Reifegrad-Bewertung
- Priorisierte 90-Tage-Roadmap aus 12 Maßnahmenpaketen
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

### Statisch bauen

```bash
npm run build
```

Der statische Export liegt in `out/` und kann auf GitHub Pages, Cloudflare Pages oder jedem statischen Webserver deployt werden.

---

## Tech-Stack

| Technologie | Version | Zweck |
|---|---|---|
| Next.js | 16 | App-Framework (App Router, Static Export) |
| React | 19 | UI-Library |
| TypeScript | strict | Typisierung |
| Tailwind CSS | 4 | Styling |

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
│   │   ├── AssessmentWizard.tsx  # Wizard-Container
│   │   ├── StepNavigation.tsx   # Fortschrittsanzeige
│   │   ├── QuestionCard.tsx     # Fragenkarte
│   │   ├── PolicyPackSwitch.tsx # Regelstand-Auswahl
│   │   └── PresetSelector.tsx   # Preset-Auswahl
│   └── results/
│       ├── ExecutiveSummary.tsx  # Ergebnis-Badge + Zusammenfassung
│       ├── ScopeCards.tsx       # Juristischer + technischer Scope
│       ├── MaturityBadge.tsx    # Reifegrad-Anzeige
│       ├── TopRisks.tsx         # Top-5-Risiken
│       ├── TriggeredRulesList.tsx # Auslösende Regeln
│       ├── RoadmapView.tsx      # 90-Tage-Roadmap
│       └── ExportActions.tsx    # Drucken/Export-Buttons
├── lib/
│   ├── types.ts                 # Alle Domain-Typen
│   ├── questions.ts             # Fragenkatalog (DE/EN)
│   ├── scoring.ts               # Reifegrad-Berechnung
│   ├── storage.ts               # localStorage-Helpers
│   ├── presets.ts               # 5 Presets
│   ├── report.ts                # Ergebnistexte + JSON-Export
│   ├── i18n.ts                  # Zweisprachigkeit (DE/EN)
│   ├── version.ts               # Versionsinformationen
│   └── rules/
│       ├── policy-packs.ts      # 2 Policy-Packs
│       ├── decision-matrix.ts   # Entscheidungsmatrix (~60 Regeln)
│       ├── evaluate.ts          # Evaluations-Engine (10 Schritte)
│       └── roadmap.ts           # 12 Roadmap-Packs (P1–P12)
├── CLAUDE.md                    # Konventionen für Claude Code
├── PROJECT.md                   # Interne Projektdokumentation
├── README.md                    # Diese Datei
└── next.config.ts               # Static Export
```

---

## Datenschutz & Sicherheit

- Keine Datenbank
- Keine Cookies
- Keine externen Dienste oder CDNs
- Keine Authentifizierung
- Alle Daten ausschließlich in localStorage
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

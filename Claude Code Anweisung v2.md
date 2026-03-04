# Claude Code Anweisung – NIS-2 Tool v2 (4 Module)

**Projekt:** github.com/AFielen/NIS2-Audit  
**Basis:** Bestehende v1-App (Next.js 16, React 19, TypeScript strict, Tailwind CSS 4)  
**Philosophie:** Zero-Data – kein Server, keine Datenbank, alles clientseitig in localStorage

-----

## Vor allen Änderungen: Pflicht-Lektüre

Lies zuerst:

- `CLAUDE.md` – Konventionen des Projekts
- `lib/types.ts` – alle Domain-Typen
- `lib/rules/nis2-drk-ruleset.v1.json` – Regelwerk (Single Source of Truth)
- `app/ergebnis/page.tsx` – wie localStorage-Daten gelesen werden

Baue alle 4 Module so, dass sie auf denselben localStorage-Keys aufbauen wie die Ergebnisseite:

- `nis2-audit-result` → `AssessmentResult` (Outcome, Scoring, Jurisdiction)
- `nis2-audit-answers` → `WizardAnswers` (alle Fragentworten inkl. THR-01/THR-02)
- `nis2-audit-grunddaten` → `Grunddaten` (KV-Name, Adresse, Vorstand)

-----

## Modul 1: Kostenrechner mit Bundesland-Refinanzierungslogik

### Ziel

Kreisverbände brauchen eine konkrete Zahl für den Haushaltsantrag. Das Modul berechnet realistische NIS-2-Umsetzungskosten auf Basis der Self-Check-Antworten und zeigt bundeslandspezifisch, welche Refinanzierungspfade existieren.

### Neue Route

`/app/kosten/page.tsx`

### Neue Datei: Kostendaten

**Pfad:** `lib/costs/kosten-modell.ts`

```typescript
// Alle Kostenbereiche nach §30 BSIG Maßnahmen
// Quelle: Caritas-Netzwerk IT Analyse Feb 2026, DKG-Stellungnahmen, eigene Kalkulation

export type KVGroesse = 'S' | 'M' | 'L';
// S = <50 VZÄ, M = 50–250 VZÄ, L = >250 VZÄ

export interface KostenBereich {
  id: string;
  label: string;               // z.B. "ISMS-Aufbau & Risikoanalyse"
  paragraph: string;           // z.B. "§30 Nr. 1 BSIG"
  einmalig: Record<KVGroesse, [number, number]>;  // [min, max] in EUR
  jaehrlich: Record<KVGroesse, [number, number]>; // [min, max] in EUR
}

export const KOSTEN_BEREICHE: KostenBereich[] = [
  {
    id: 'isms',
    label: 'ISMS-Aufbau & Risikoanalyse',
    paragraph: '§30 Nr. 1 BSIG',
    einmalig:  { S: [15000, 40000],  M: [40000, 100000],  L: [80000, 200000] },
    jaehrlich: { S: [5000,  12000],  M: [12000, 30000],   L: [25000, 60000]  },
  },
  {
    id: 'netzwerk',
    label: 'Netzwerksegmentierung & Firewall',
    paragraph: '§30 Nr. 5 BSIG',
    einmalig:  { S: [10000, 30000],  M: [40000, 120000],  L: [100000, 250000] },
    jaehrlich: { S: [3000,  8000],   M: [8000,  20000],   L: [15000,  40000]  },
  },
  {
    id: 'backup',
    label: 'Backup & Disaster Recovery (3-2-1)',
    paragraph: '§30 Nr. 3 BSIG',
    einmalig:  { S: [5000,  20000],  M: [20000, 70000],   L: [50000, 150000]  },
    jaehrlich: { S: [2000,  6000],   M: [6000,  20000],   L: [15000, 40000]   },
  },
  {
    id: 'mfa',
    label: 'MFA-Rollout & IAM',
    paragraph: '§30 Nr. 10 BSIG',
    einmalig:  { S: [3000,  10000],  M: [10000, 35000],   L: [25000, 80000]   },
    jaehrlich: { S: [1000,  3000],   M: [3000,  10000],   L: [8000,  20000]   },
  },
  {
    id: 'verschluesselung',
    label: 'Verschlüsselung (BitLocker, VPN, TLS)',
    paragraph: '§30 Nr. 8 BSIG',
    einmalig:  { S: [2000,  8000],   M: [8000,  25000],   L: [20000, 60000]   },
    jaehrlich: { S: [1000,  3000],   M: [3000,  8000],    L: [6000,  15000]   },
  },
  {
    id: 'schulung',
    label: 'Awareness-Schulungen & GL-Pflichtschulung',
    paragraph: '§30 Nr. 7 + §38 BSIG',
    einmalig:  { S: [2000,  6000],   M: [6000,  20000],   L: [15000, 40000]   },
    jaehrlich: { S: [2000,  5000],   M: [5000,  15000],   L: [12000, 30000]   },
  },
  {
    id: 'incident',
    label: 'Incident Response & Meldeprozess',
    paragraph: '§30 Nr. 2 + §32 BSIG',
    einmalig:  { S: [3000,  8000],   M: [8000,  20000],   L: [15000, 40000]   },
    jaehrlich: { S: [3000,  10000],  M: [10000, 30000],   L: [25000, 60000]   },
  },
  {
    id: 'lieferkette',
    label: 'Lieferkettenmanagement',
    paragraph: '§30 Nr. 4 BSIG',
    einmalig:  { S: [2000,  6000],   M: [6000,  15000],   L: [10000, 30000]   },
    jaehrlich: { S: [1000,  3000],   M: [3000,  8000],    L: [5000,  15000]   },
  },
  {
    id: 'isb',
    label: 'IT-Sicherheitsbeauftragte/r (ISB)',
    paragraph: '§38 BSIG',
    einmalig:  { S: [0, 0],          M: [0, 0],           L: [0, 0]           }, // Personalkosten nur laufend
    jaehrlich: { S: [15000, 35000],  M: [35000, 80000],   L: [70000, 130000]  },
  },
  {
    id: 'audit',
    label: 'Audits & Penetrationstests',
    paragraph: '§30 Nr. 6 BSIG',
    einmalig:  { S: [3000,  10000],  M: [10000, 25000],   L: [20000, 50000]   },
    jaehrlich: { S: [3000,  10000],  M: [8000,  25000],   L: [15000, 50000]   },
  },
  {
    id: 'bsi_reg',
    label: 'BSI-Registrierung & Erstaudit',
    paragraph: '§§33-34 BSIG',
    einmalig:  { S: [2000,  5000],   M: [5000,  15000],   L: [10000, 25000]   },
    jaehrlich: { S: [0, 0],          M: [0, 0],           L: [0, 0]           },
  },
];

// Vergleichswerte für Kontext
export const VERGLEICHSWERTE = {
  bundesregierungSchätzungEinmalig: 37060,
  bundesregierungSchätzungJaehrlich: 209000,
  ransomwareSchadenDurchschnitt: 2000000,  // konservativ (KMU)
  ransomwareSchadenMaxCaritas: 23000000,   // Caritas München 2022
  busseldMaxWichtig: 7000000,
  busseldMaxBesondersWichtig: 10000000,
  busseldNichtRegistrierung: 500000,
};
```

### Neue Datei: Bundesland-Refinanzierungslogik

**Pfad:** `lib/costs/bundesland-refinanzierung.ts`

Wichtiger Hinweis zum Verständnis: Die Refinanzierung von NIS-2-Kosten ist für DRK-Kreisverbände hochgradig bundeslandspezifisch, weil:

1. **Rettungsdienst-Finanzierung** ist Landesrecht (16 verschiedene Rettungsdienstgesetze)
1. **Entgeltsatzverhandlungen** (SGB XI §84/§85) laufen über landesspezifische Schiedsstellen
1. **Landesförderungen** (IT, Digitalisierung) variieren stark
1. **KHTF** (Krankenhaustransformationsfonds) wird über die Länder abgewickelt

```typescript
export interface RefinanzierungsPfad {
  id: string;
  titel: string;
  rechtsgrundlage: string;
  maxBetrag?: string;           // z.B. "max. 12.000 EUR"
  deckungsgrad: 'hoch' | 'mittel' | 'gering' | 'unbekannt';
  einmalig: boolean;            // true = Investition, false = laufend
  voraussetzungen: string[];
  hinweis?: string;             // Bundesland-spezifische Einschränkung
  antragsLink?: string;
}

export interface BundeslandProfil {
  code: string;                 // z.B. 'NW', 'BY'
  name: string;
  rdGesetz: string;             // Name des Rettungsdienstgesetzes
  rdFinanzierungsModell: 'pauschale' | 'kostenerstattung' | 'mischmodell';
  rdItKostenAnerkannt: boolean; // Werden IT-Sicherheitskosten im RD explizit anerkannt?
  rdHinweis: string;            // Freitext zur RD-Finanzierungssituation
  landesfoerderungIt: boolean;  // Existiert Landesförderung für IT/Digitalisierung?
  landesfoerderungLink?: string;
  pflegesatzPraxis: 'offen' | 'schwierig' | 'unklar';
  pflegesatzHinweis: string;
  pfade: RefinanzierungsPfad[];
}

// Bundesweite Pfade (für alle Bundesländer relevant)
const BUNDESWEITE_PFADE: RefinanzierungsPfad[] = [
  {
    id: 'sgb11_digital',
    titel: 'Digitalisierungsförderung Pflege',
    rechtsgrundlage: '§8 Abs. 8 SGB XI',
    maxBetrag: 'max. 12.000 EUR (einmalig)',
    deckungsgrad: 'gering',
    einmalig: true,
    voraussetzungen: [
      'Einrichtung erbringt Pflegeleistungen (SGB XI)',
      'Maßnahme dient der Digitalisierung des Pflegeprozesses',
      'IT-Sicherheit als Teil der Digitalisierung anerkannt',
    ],
    hinweis: 'Antragstellung bei zuständiger Pflegekasse. Fördersumme pro Einrichtung, nicht pro Träger.',
    antragsLink: 'https://www.gkv-spitzenverband.de',
  },
  {
    id: 'rueckenwind3',
    titel: 'rückenwind3 (ESF+) – Digitalisierung Sozialwirtschaft',
    rechtsgrundlage: 'ESF+ Förderperiode 2021–2027',
    maxBetrag: 'bis 800.000 EUR (50–70% Förderung)',
    deckungsgrad: 'mittel',
    einmalig: true,
    voraussetzungen: [
      'Träger der freien Wohlfahrtspflege',
      'Projektcharakter (kein laufender Betrieb)',
      'Digitalisierung als Projektziel',
    ],
    antragsLink: 'https://www.bagfw.de/rueckenwind',
  },
  {
    id: 'bafa_beratung',
    titel: 'BAFA Unternehmensberatung',
    rechtsgrundlage: 'Bundesförderung Beratung KMU',
    maxBetrag: 'max. 2.800 EUR (50–80% Förderung)',
    deckungsgrad: 'gering',
    einmalig: true,
    voraussetzungen: [
      'Für ISMS-Erstberatung geeignet',
      'Externe Berater:in muss BAFA-zugelassen sein',
    ],
    antragsLink: 'https://www.bafa.de',
  },
  {
    id: 'kfw_digital',
    titel: 'KfW-Digitalisierungskredit',
    rechtsgrundlage: 'KfW-Programm 380/390',
    maxBetrag: '3–5% Tilgungszuschuss',
    deckungsgrad: 'gering',
    einmalig: true,
    voraussetzungen: [
      'gGmbH oder e.V. mit wirtschaftlicher Tätigkeit',
      'Investitionscharakter (kein laufender Betrieb)',
    ],
    antragsLink: 'https://www.kfw.de',
  },
  {
    id: 'pflegesatz_sachkosten',
    titel: 'Pflegesatz-Sachkosten (laufend)',
    rechtsgrundlage: '§84 Abs. 2 SGB XI',
    deckungsgrad: 'mittel',
    einmalig: false,
    voraussetzungen: [
      'Pflegeeinrichtung mit SGB XI-Versorgungsvertrag',
      'Kosten als betriebsnotwendig nachweisbar',
      'Detaillierte Kostendokumentation erforderlich',
    ],
    hinweis: 'Durchsetzbarkeit stark bundesland- und pflegekassenabhängig. Verhandlungsergebnis nicht garantiert. Bei Ablehnung: Schiedsstelle (§76 SGB XI).',
  },
];

export const BUNDESLAND_PROFILE: BundeslandProfil[] = [
  {
    code: 'NW',
    name: 'Nordrhein-Westfalen',
    rdGesetz: 'RettG NRW',
    rdFinanzierungsModell: 'kostenerstattung',
    rdItKostenAnerkannt: true,
    rdHinweis: 'NRW kennt ein Kostenerstattungsmodell für den Rettungsdienst. IT-Sicherheitskosten können als Betriebskosten gegenüber den Kreisen geltend gemacht werden, sofern sie nachweislich dem Rettungsdienst zurechenbar sind. Empfehlung: Gemeinkostenumlage dokumentieren.',
    landesfoerderungIt: true,
    landesfoerderungLink: 'https://www.digitalland.nrw',
    pflegesatzPraxis: 'offen',
    pflegesatzHinweis: 'NRW-Pflegekassen haben IT-Sicherheit als Sachkostenpositionen bislang nicht pauschal abgelehnt. Detaillierte Nachweise erforderlich.',
    pfade: [
      ...BUNDESWEITE_PFADE,
      {
        id: 'nw_digitalland',
        titel: 'Digitalland.NRW – Förderung Sozialwirtschaft',
        rechtsgrundlage: 'EFRE/ESF NRW 2021–2027',
        maxBetrag: 'projektabhängig',
        deckungsgrad: 'mittel',
        einmalig: true,
        voraussetzungen: ['Träger mit Sitz in NRW', 'Digitalisierungsprojekt'],
        antragsLink: 'https://www.digitalland.nrw',
      },
    ],
  },
  {
    code: 'BY',
    name: 'Bayern',
    rdGesetz: 'BayRDG',
    rdFinanzierungsModell: 'pauschale',
    rdItKostenAnerkannt: false,
    rdHinweis: 'Bayern finanziert den Rettungsdienst über Benutzungsentgelte. IT-Sicherheitskosten sind in der Benutzungsentgelt-Kalkulation nicht explizit vorgesehen. Eine Geltendmachung als Betriebskosten ist argumentierbar, aber schwierig durchzusetzen. BRK (Bayerisches Rotes Kreuz) führt hierzu ggf. bereits Gespräche mit den Kostenträgern.',
    landesfoerderungIt: true,
    landesfoerderungLink: 'https://www.stmd.bayern.de/digitalisierung',
    pflegesatzPraxis: 'schwierig',
    pflegesatzHinweis: 'Bayerische Pflegekassen verweisen auf den externen Vergleich. Ohne Branchenstandard schwer durchsetzbar. BIHK bietet kostenlose Webinar-Unterstützung.',
    pfade: [
      ...BUNDESWEITE_PFADE,
      {
        id: 'by_digitalisierungsbonus',
        titel: 'Digitalisierungsbonus Bayern (sofern verlängert)',
        rechtsgrundlage: 'Bayerisches Förderprogramm',
        maxBetrag: 'bis 10.000 EUR',
        deckungsgrad: 'gering',
        einmalig: true,
        voraussetzungen: ['KMU oder gemeinnütziger Träger in Bayern', 'IT-Investition'],
        hinweis: 'Prüfen ob Programm in 2026 noch aktiv ist.',
        antragsLink: 'https://www.stmwi.bayern.de',
      },
    ],
  },
  {
    code: 'BW',
    name: 'Baden-Württemberg',
    rdGesetz: 'RDG BW',
    rdFinanzierungsModell: 'mischmodell',
    rdItKostenAnerkannt: false,
    rdHinweis: 'BW hat ein komplexes Mischmodell aus Kreisfinanzierung und Benutzungsentgelten. IT-Sicherheitskosten sind bislang nicht explizit adressiert. Gespräche mit Kostenträgern auf KV-Ebene empfohlen.',
    landesfoerderungIt: true,
    landesfoerderungLink: 'https://www.digital-bw.de',
    pflegesatzPraxis: 'offen',
    pflegesatzHinweis: 'BW-Pflegekassen sind gesprächsbereit, verlangen aber detaillierte Kostennachweise und Verhältnismäßigkeitsbegründung.',
    pfade: [...BUNDESWEITE_PFADE],
  },
  {
    code: 'HE',
    name: 'Hessen',
    rdGesetz: 'HRDG',
    rdFinanzierungsModell: 'kostenerstattung',
    rdItKostenAnerkannt: false,
    rdHinweis: 'Hessen nutzt Kostenerstattung. IT-Sicherheitskosten können prinzipiell als Betriebskosten des Rettungsdienstes geltend gemacht werden, Nachweis der Zurechenbarkeit erforderlich.',
    landesfoerderungIt: false,
    pflegesatzPraxis: 'unklar',
    pflegesatzHinweis: 'Keine belastbaren Informationen zu NIS-2-spezifischen Pflegesatzverhandlungen in Hessen vorhanden. Frühzeitiger Kontakt mit Landesverband empfohlen.',
    pfade: [...BUNDESWEITE_PFADE],
  },
  {
    code: 'RP',
    name: 'Rheinland-Pfalz',
    rdGesetz: 'RettDG RLP',
    rdFinanzierungsModell: 'pauschale',
    rdItKostenAnerkannt: false,
    rdHinweis: 'Rettungsdienst wird über Benutzungsentgelte finanziert. IT-Sicherheitskosten müssen gesondert argumentiert werden.',
    landesfoerderungIt: false,
    pflegesatzPraxis: 'unklar',
    pflegesatzHinweis: 'Kontakt mit DRK-Landesverband RLP empfohlen.',
    pfade: [...BUNDESWEITE_PFADE],
  },
  {
    code: 'SL',
    name: 'Saarland',
    rdGesetz: 'SRettG',
    rdFinanzierungsModell: 'mischmodell',
    rdItKostenAnerkannt: false,
    rdHinweis: 'Kleine Bundeslandfläche, wenige DRK-KV. Koordination über Landesverband empfohlen.',
    landesfoerderungIt: false,
    pflegesatzPraxis: 'unklar',
    pflegesatzHinweis: 'Zu wenige Daten verfügbar.',
    pfade: [...BUNDESWEITE_PFADE],
  },
  {
    code: 'SH',
    name: 'Schleswig-Holstein',
    rdGesetz: 'RDG SH',
    rdFinanzierungsModell: 'kostenerstattung',
    rdItKostenAnerkannt: false,
    rdHinweis: 'SH nutzt Kostenerstattungsmodell. Grundsätzlich günstig für IT-Kostenerstattung, aber NIS-2-spezifisch noch keine Klärung.',
    landesfoerderungIt: true,
    landesfoerderungLink: 'https://www.schleswig-holstein.de/digitalisierung',
    pflegesatzPraxis: 'offen',
    pflegesatzHinweis: 'SH gilt als vergleichsweise offen für neue Sachkostenpositionen.',
    pfade: [...BUNDESWEITE_PFADE],
  },
  {
    code: 'HH',
    name: 'Hamburg',
    rdGesetz: 'HmbRDG',
    rdFinanzierungsModell: 'kostenerstattung',
    rdItKostenAnerkannt: false,
    rdHinweis: 'Stadtsstaat, Rettungsdienst stark durch Feuerwehr geprägt. DRK in HH eher im Katastrophenschutz. Spezifische RD-Finanzierungsfragen mit Landesverband klären.',
    landesfoerderungIt: false,
    pflegesatzPraxis: 'unklar',
    pflegesatzHinweis: 'Stadtsstaat-Spezifika – individuelle Klärung erforderlich.',
    pfade: [...BUNDESWEITE_PFADE],
  },
  {
    code: 'HB',
    name: 'Bremen',
    rdGesetz: 'BremRDG',
    rdFinanzierungsModell: 'mischmodell',
    rdItKostenAnerkannt: false,
    rdHinweis: 'Kleiner Stadtsstaat. Individuelle Abstimmung mit Landesverband empfohlen.',
    landesfoerderungIt: false,
    pflegesatzPraxis: 'unklar',
    pflegesatzHinweis: 'Zu wenige Daten verfügbar.',
    pfade: [...BUNDESWEITE_PFADE],
  },
  {
    code: 'NI',
    name: 'Niedersachsen',
    rdGesetz: 'NRettDG',
    rdFinanzierungsModell: 'kostenerstattung',
    rdItKostenAnerkannt: false,
    rdHinweis: 'Niedersachsen finanziert über Kommunen. IT-Kosten als Betriebskosten argumentierbar. DRK-Landesverband Niedersachsen hat NIS-2 auf dem Radar.',
    landesfoerderungIt: true,
    landesfoerderungLink: 'https://digitalisierung.niedersachsen.de',
    pflegesatzPraxis: 'offen',
    pflegesatzHinweis: 'Eher offen für neue Sachkostenpositionen, Nachweis erforderlich.',
    pfade: [...BUNDESWEITE_PFADE],
  },
  {
    code: 'BB',
    name: 'Brandenburg',
    rdGesetz: 'BbgRettG',
    rdFinanzierungsModell: 'mischmodell',
    rdItKostenAnerkannt: false,
    rdHinweis: 'Ländliche Struktur, viele kleinere KV. Landesverband-Koordination besonders wichtig.',
    landesfoerderungIt: false,
    pflegesatzPraxis: 'unklar',
    pflegesatzHinweis: 'Zu wenige Daten verfügbar.',
    pfade: [...BUNDESWEITE_PFADE],
  },
  {
    code: 'MV',
    name: 'Mecklenburg-Vorpommern',
    rdGesetz: 'RVSG MV',
    rdFinanzierungsModell: 'mischmodell',
    rdItKostenAnerkannt: false,
    rdHinweis: 'Flächenland mit strukturellen Finanzierungsherausforderungen. Kooperationsansatz mit anderen KV empfohlen.',
    landesfoerderungIt: false,
    pflegesatzPraxis: 'schwierig',
    pflegesatzHinweis: 'Strukturell schwieriges Bundesland für Kostendurchsetzung.',
    pfade: [...BUNDESWEITE_PFADE],
  },
  {
    code: 'ST',
    name: 'Sachsen-Anhalt',
    rdGesetz: 'RettDG LSA',
    rdFinanzierungsModell: 'mischmodell',
    rdItKostenAnerkannt: false,
    rdHinweis: 'Landesverband-Koordination empfohlen.',
    landesfoerderungIt: false,
    pflegesatzPraxis: 'unklar',
    pflegesatzHinweis: 'Zu wenige Daten verfügbar.',
    pfade: [...BUNDESWEITE_PFADE],
  },
  {
    code: 'TH',
    name: 'Thüringen',
    rdGesetz: 'ThürRettG',
    rdFinanzierungsModell: 'mischmodell',
    rdItKostenAnerkannt: false,
    rdHinweis: 'Landesverband-Koordination empfohlen.',
    landesfoerderungIt: false,
    pflegesatzPraxis: 'unklar',
    pflegesatzHinweis: 'Zu wenige Daten verfügbar.',
    pfade: [...BUNDESWEITE_PFADE],
  },
  {
    code: 'SN',
    name: 'Sachsen',
    rdGesetz: 'SächsBRKG / RettDiG',
    rdFinanzierungsModell: 'mischmodell',
    rdItKostenAnerkannt: false,
    rdHinweis: 'Sachsen hat eine besondere Struktur – DRK integriert in Bevölkerungsschutzgesetz. Landesverband klären.',
    landesfoerderungIt: true,
    landesfoerderungLink: 'https://www.smwa.sachsen.de',
    pflegesatzPraxis: 'unklar',
    pflegesatzHinweis: 'Zu wenige Daten verfügbar.',
    pfade: [...BUNDESWEITE_PFADE],
  },
  {
    code: 'BE',
    name: 'Berlin',
    rdGesetz: 'RDG Berlin',
    rdFinanzierungsModell: 'kostenerstattung',
    rdItKostenAnerkannt: false,
    rdHinweis: 'Stadtsstaat. Rettungsdienst eng mit Berliner Feuerwehr verzahnt. DRK Berlin hat eigene Strukturen. Individuelle Klärung erforderlich.',
    landesfoerderungIt: true,
    landesfoerderungLink: 'https://www.berlin.de/digitalisierung',
    pflegesatzPraxis: 'offen',
    pflegesatzHinweis: 'Berlin gilt als vergleichsweise verhandlungsbereit.',
    pfade: [...BUNDESWEITE_PFADE],
  },
];

// Helper: Bundesland nach Code finden
export function getBundeslandProfil(code: string): BundeslandProfil | undefined {
  return BUNDESLAND_PROFILE.find(bl => bl.code === code);
}
```

### Neue Datei: Kostenberechnung

**Pfad:** `lib/costs/kostenrechner.ts`

```typescript
import type { AssessmentResult, WizardAnswers } from '@/lib/types';
import { KOSTEN_BEREICHE, VERGLEICHSWERTE, type KVGroesse } from './kosten-modell';

export function bestimmeKVGroesse(vzae: number): KVGroesse {
  if (vzae < 50) return 'S';
  if (vzae <= 250) return 'M';
  return 'L';
}

export interface KostenErgebnis {
  groesse: KVGroesse;
  vzae: number;
  einmaligMin: number;
  einmaligMax: number;
  jaehrlichMin: number;
  jaehrlichMax: number;
  bereiche: Array<{
    id: string;
    label: string;
    paragraph: string;
    einmaligMin: number;
    einmaligMax: number;
    jaehrlichMin: number;
    jaehrlichMax: number;
    // Bereits umgesetzt (aus SEC-Scoring)?
    teilweiseErfuellt: boolean;
  }>;
  // Kosten pro VZÄ/Tag (für Kostenträger-Verhandlungen)
  kostenProVzaeJahr: number;
  // Kooperationsmodell: 10 KV teilen sich Kosten
  kooperationJaehrlichProKV: number;
  vergleiche: typeof VERGLEICHSWERTE;
}

export function berechneKosten(
  result: AssessmentResult,
  answers: WizardAnswers
): KostenErgebnis {
  const vzae = (answers['THR-01'] as number) ?? 50;
  const groesse = bestimmeKVGroesse(vzae);
  
  // SEC-Controls die bereits erfüllt sind (Scoring-Gaps umkehren)
  const erfuellteControls = new Set(
    result.scoring.gaps ? [] : [] // gaps = Controls die NICHT erfüllt sind
    // Implementierung: result.scoring.gaps enthält IDs der fehlenden Controls
  );

  // Bereiche berechnen, mit Abzug für bereits erfüllte Maßnahmen
  const bereiche = KOSTEN_BEREICHE.map(bereich => {
    const [einmaligMin, einmaligMax] = bereich.einmalig[groesse];
    const [jaehrlichMin, jaehrlichMax] = bereich.jaehrlich[groesse];
    
    // Grobe Heuristik: Wenn related SEC-Control erfüllt → 50% Rabatt auf Einmalinvestition
    // Mapping: bereich.id → SEC-Control IDs
    const teilweiseErfuellt = false; // Verfeinerung möglich
    const faktor = teilweiseErfuellt ? 0.5 : 1.0;

    return {
      id: bereich.id,
      label: bereich.label,
      paragraph: bereich.paragraph,
      einmaligMin: Math.round(einmaligMin * faktor),
      einmaligMax: Math.round(einmaligMax * faktor),
      jaehrlichMin: Math.round(jaehrlichMin),
      jaehrlichMax: Math.round(jaehrlichMax),
      teilweiseErfuellt,
    };
  });

  const einmaligMin = bereiche.reduce((s, b) => s + b.einmaligMin, 0);
  const einmaligMax = bereiche.reduce((s, b) => s + b.einmaligMax, 0);
  const jaehrlichMin = bereiche.reduce((s, b) => s + b.jaehrlichMin, 0);
  const jaehrlichMax = bereiche.reduce((s, b) => s + b.jaehrlichMax, 0);

  const jaehrlichMid = (jaehrlichMin + jaehrlichMax) / 2;
  const kostenProVzaeJahr = vzae > 0 ? Math.round(jaehrlichMid / vzae) : 0;

  return {
    groesse,
    vzae,
    einmaligMin,
    einmaligMax,
    jaehrlichMin,
    jaehrlichMax,
    bereiche,
    kostenProVzaeJahr,
    kooperationJaehrlichProKV: Math.round(jaehrlichMid * 0.15), // 85% Einsparung bei 10 KV
    vergleiche: VERGLEICHSWERTE,
  };
}
```

### Seitenstruktur `/app/kosten/page.tsx`

Die Seite besteht aus:

1. **Bundesland-Auswahl** (Select, prominent ganz oben)
- localStorage-Key: `nis2-kosten-bundesland` (z.B. `'NW'`)
- Hint: “Wir zeigen euch bundeslandspezifische Refinanzierungswege”
1. **Kostenkarte – Einmalig**
- Bandbreite min–max als visueller Balken
- Aufklappbare Detailliste nach Bereich (mit §-Angabe)
- Vergleich: Bundesregierungs-Schätzung (durchgestrichen, mit Erklärung warum zu niedrig)
1. **Kostenkarte – Jährlich laufend**
- Gleiche Struktur
- ISB-Kosten hervorgehoben mit Hinweis “Fachkräftemangel – Kooperationsmodell prüfen”
1. **Kooperationsrechner**
- Schieberegler: “Wie viele KV teilen sich die Kosten?” (2–15)
- Zeigt Kosten pro KV dynamisch
1. **Refinanzierungsabschnitt** (bundeslandabhängig)
- Für gewähltes Bundesland: alle `pfade` des Bundeslands als Cards
- Pro Pfad: Titel, Rechtsgrundlage, Deckungsgrad (farbig), Voraussetzungen, Link
- Rettungsdienst-Block: `rdHinweis` + `rdItKostenAnerkannt` als Badge
- Pflegesatz-Block: `pflegesatzPraxis` + `pflegesatzHinweis`
- Hinweisbox: “Diese Informationen sind Orientierungshilfe und ersetzen keine Rechtsberatung. Stand: März 2026. Wende dich an deinen DRK-Landesverband für bundeslandspezifische Beratung.”
1. **Vergleichsrahmen**
- Drei Karten nebeneinander:
  - “Kosten NIS-2-Compliance: X–Y EUR/Jahr”
  - “Bußgeld bei Verstoß: bis Z EUR”
  - “Ransomware-Schaden Ø: 2–23 Mio. EUR”
1. **Haushaltsvorlage generieren** (Button)
- Öffnet Druckdialog mit einseitiger Kostentabelle (für Vorstandssitzung)
- Selbe Technik wie bestehender Druckansicht

**Validierung:** `npm run build` + `npx tsc --noEmit` müssen fehlerfrei sein.

-----

## Modul 2: Compliance-Tracker

### Ziel

Langzeit-Begleitung: Welche der 21 Pflichtaufgaben + 18 Pflichtdokumente sind erledigt, wer ist verantwortlich, bis wann?

### Neue Route

`/app/tracker/page.tsx`

### Neue Datei: Tracker-Daten

**Pfad:** `lib/tracker/tracker-aufgaben.ts`

```typescript
export type AufgabenStatus = 'offen' | 'in_arbeit' | 'erledigt';
export type AufgabenPhase = 1 | 2 | 3 | 4; // 4 = ISMS-Langzeitprojekt

export interface TrackerAufgabe {
  id: string;
  phase: AufgabenPhase;
  phaseLabel: string;  // "Tage 1–30", "Tage 31–60", etc.
  titel: string;
  beschreibung: string;
  rechtsgrundlage: string;
  fristTage: number;    // Tage ab heute (Richtwert)
  prioritaet: 'kritisch' | 'hoch' | 'mittel';
  verantwortlich?: string;  // wird vom User befüllt
  status: AufgabenStatus;
  notiz?: string;
  bsiLink?: string;
}

export interface PflichtDokument {
  id: string;
  nummer: number;       // 1–18 (nach §30 BSIG)
  titel: string;
  beschreibung: string;
  rechtsgrundlage: string;
  verantwortlich?: string;
  status: AufgabenStatus;
  vorhandeneVersion?: string;  // z.B. "V1.0 vom 01.03.2026"
  bsiLink?: string;
}

// 21 Pflichtaufgaben (aus Caritas-Dokument Kap. 12.6 adaptiert für DRK)
export const TRACKER_AUFGABEN: Omit<TrackerAufgabe, 'verantwortlich' | 'notiz'>[] = [
  // Phase 1: Tage 1–30 – Grundlagen
  {
    id: 'TA-01',
    phase: 1,
    phaseLabel: 'Phase 1 (Tage 1–30)',
    titel: 'BSI-Registrierung: MUK einrichten',
    beschreibung: 'ELSTER-Organisationszertifikat beantragen (dauert 5+ Werktage postalisch). Mindestens 2 Personen registrieren.',
    rechtsgrundlage: '§§33–34 BSIG',
    fristTage: 5,
    prioritaet: 'kritisch',
    status: 'offen',
    bsiLink: 'https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/NIS2-MUK/MUK_node.html',
  },
  {
    id: 'TA-02',
    phase: 1,
    phaseLabel: 'Phase 1 (Tage 1–30)',
    titel: 'BSI-Registrierung: portal.bsi.bund.de',
    beschreibung: 'Registrierung im BSI-Portal abschließen. Öffentliche IP-Adressen, Sektor (Gesundheitswesen → Rettungsdienst), Einstufung (bwE/wE) eintragen.',
    rechtsgrundlage: '§33 BSIG',
    fristTage: 7,
    prioritaet: 'kritisch',
    status: 'offen',
    bsiLink: 'https://portal.bsi.bund.de',
  },
  {
    id: 'TA-03',
    phase: 1,
    phaseLabel: 'Phase 1 (Tage 1–30)',
    titel: 'Meldeprozess für Sicherheitsvorfälle etablieren',
    beschreibung: 'Meldeweg-Dokument erstellen: Wer meldet was wann an wen? Notfall-Kontaktliste mit Mobilnummern. BSI-Portal-Zugänge für 2 Personen. Vorausgefüllte Meldeformulare.',
    rechtsgrundlage: '§32 BSIG',
    fristTage: 7,
    prioritaet: 'kritisch',
    status: 'offen',
    bsiLink: 'https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/NIS2-Anleitung-Meldung/Anleitung-Meldung_node.html',
  },
  {
    id: 'TA-04',
    phase: 1,
    phaseLabel: 'Phase 1 (Tage 1–30)',
    titel: 'Geschäftsleitungsschulung terminieren & buchen',
    beschreibung: 'Pflichtschulung für alle Geschäftsleitenden (§38 Abs. 3 BSIG). Empfehlung: IHK-Akademie, TÜV, BIHK-Webinar-Reihe (kostenlos). Nachweis aufbewahren.',
    rechtsgrundlage: '§38 Abs. 3 BSIG',
    fristTage: 30,
    prioritaet: 'kritisch',
    status: 'offen',
    bsiLink: 'https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/NIS-2/nis-2-geschaeftsleitungsschulung.pdf',
  },
  {
    id: 'TA-05',
    phase: 1,
    phaseLabel: 'Phase 1 (Tage 1–30)',
    titel: 'IT-Sicherheitsbeauftragte/n (ISB) benennen',
    beschreibung: 'ISB intern benennen oder extern beauftragen. Direkte Berichtslinie an GL. Stellenbeschreibung dokumentieren. Mindestens 0,5 VZÄ einplanen.',
    rechtsgrundlage: '§38 BSIG (implizit)',
    fristTage: 30,
    prioritaet: 'hoch',
    status: 'offen',
  },
  {
    id: 'TA-06',
    phase: 1,
    phaseLabel: 'Phase 1 (Tage 1–30)',
    titel: 'MFA für Admin-Konten und VPN aktivieren',
    beschreibung: 'Quick-Win: MFA sofort für alle Administrator-Accounts und VPN-Zugänge einschalten. Wenn Microsoft 365 vorhanden: Microsoft Authenticator (im Lizenzpreis enthalten).',
    rechtsgrundlage: '§30 Nr. 10 BSIG',
    fristTage: 30,
    prioritaet: 'hoch',
    status: 'offen',
    bsiLink: 'https://www.bsi.bund.de/dok/nis-2-infopakete',
  },
  {
    id: 'TA-07',
    phase: 1,
    phaseLabel: 'Phase 1 (Tage 1–30)',
    titel: 'IT-Asset-Bestandsaufnahme starten',
    beschreibung: 'Alle IT-Systeme, Server, Anwendungen, Cloud-Dienste erfassen. Ziel: 80% Vollständigkeit in Phase 1. Für Rettungsdienst-IT getrennte Liste anlegen.',
    rechtsgrundlage: '§30 Nr. 9 BSIG',
    fristTage: 30,
    prioritaet: 'hoch',
    status: 'offen',
  },
  // Phase 2: Tage 31–60 – Strukturaufbau
  {
    id: 'TA-08',
    phase: 2,
    phaseLabel: 'Phase 2 (Tage 31–60)',
    titel: 'Gap-Analyse §30 BSIG durchführen',
    beschreibung: 'Ist-Zustand systematisch gegen alle 10 Mindestmaßnahmen des §30 BSIG abgleichen. Externer Berater sinnvoll. BSI CyberRisikoCheck nutzen.',
    rechtsgrundlage: '§30 BSIG',
    fristTage: 60,
    prioritaet: 'mittel',
    status: 'offen',
  },
  {
    id: 'TA-09',
    phase: 2,
    phaseLabel: 'Phase 2 (Tage 31–60)',
    titel: 'Risikoanalyse (erste Version)',
    beschreibung: 'Kritische Assets identifizieren. Bedrohungen bewerten. Risikobehandlungsplan erstellen. Fokus zuerst auf Rettungsdienst-IT.',
    rechtsgrundlage: '§30 Nr. 1 BSIG',
    fristTage: 60,
    prioritaet: 'mittel',
    status: 'offen',
    bsiLink: 'https://www.bsi.bund.de/dok/nis-2-infopakete',
  },
  {
    id: 'TA-10',
    phase: 2,
    phaseLabel: 'Phase 2 (Tage 31–60)',
    titel: 'ISMS-Framework entscheiden',
    beschreibung: 'Entscheidung zwischen ISO 27001, BSI IT-Grundschutz oder CISIS12. Für DRK-KV mit Rettungsdienst: ISO 27001 empfohlen. Entscheidung dokumentieren und freigeben.',
    rechtsgrundlage: '§30 Nr. 1 BSIG',
    fristTage: 60,
    prioritaet: 'mittel',
    status: 'offen',
  },
  {
    id: 'TA-11',
    phase: 2,
    phaseLabel: 'Phase 2 (Tage 31–60)',
    titel: 'Informationssicherheitsleitlinie erstellen',
    beschreibung: 'Einseitiges bis dreiseitiges Grundsatzdokument. Von Geschäftsleitung verabschieden lassen. Im gesamten Kreisverband kommunizieren.',
    rechtsgrundlage: '§30 Nr. 1 BSIG',
    fristTage: 60,
    prioritaet: 'mittel',
    status: 'offen',
  },
  {
    id: 'TA-12',
    phase: 2,
    phaseLabel: 'Phase 2 (Tage 31–60)',
    titel: 'Backup-Situation auditieren',
    beschreibung: '3-2-1-Regel prüfen: 3 Kopien, 2 Medientypen, 1 offline/air-gapped. Restore-Test durchführen und dokumentieren. Immutable Backups einrichten.',
    rechtsgrundlage: '§30 Nr. 3 BSIG',
    fristTage: 60,
    prioritaet: 'mittel',
    status: 'offen',
  },
  {
    id: 'TA-13',
    phase: 2,
    phaseLabel: 'Phase 2 (Tage 31–60)',
    titel: 'Incident-Response-Plan (Entwurf)',
    beschreibung: 'Eskalationsstufen, Rollen, Kommunikationswege definieren. 24/7-Erreichbarkeit sicherstellen. BSI-Meldepflichten integrieren.',
    rechtsgrundlage: '§30 Nr. 2 BSIG',
    fristTage: 60,
    prioritaet: 'mittel',
    status: 'offen',
  },
  {
    id: 'TA-14',
    phase: 2,
    phaseLabel: 'Phase 2 (Tage 31–60)',
    titel: 'Lieferantenverzeichnis erstellen',
    beschreibung: 'Alle IT-Dienstleister, Cloud-Anbieter, Software-Lieferanten erfassen. Kritikalitätsbewertung je Lieferant. Bestehende Verträge auf Sicherheitsklauseln prüfen.',
    rechtsgrundlage: '§30 Nr. 4 BSIG',
    fristTage: 60,
    prioritaet: 'mittel',
    status: 'offen',
  },
  // Phase 3: Tage 61–90 – Implementierung
  {
    id: 'TA-15',
    phase: 3,
    phaseLabel: 'Phase 3 (Tage 61–90)',
    titel: 'Geschäftsleitungsschulung durchführen',
    beschreibung: 'Schulung absolvieren. Zertifikat/Nachweis mit Datum und Inhalten aufbewahren (wichtigstes Haftungsschutz-Dokument).',
    rechtsgrundlage: '§38 Abs. 3 BSIG',
    fristTage: 90,
    prioritaet: 'kritisch',
    status: 'offen',
  },
  {
    id: 'TA-16',
    phase: 3,
    phaseLabel: 'Phase 3 (Tage 61–90)',
    titel: 'Security-Awareness-Training für alle Mitarbeitenden starten',
    beschreibung: 'Phishing-Erkennung, sichere Passwörter, Meldeweg. Rettungsdienst-Personal im Schichtdienst berücksichtigen (Kurzvideos, mobile-fähig). Erste Runde dokumentieren.',
    rechtsgrundlage: '§30 Nr. 7 BSIG',
    fristTage: 90,
    prioritaet: 'hoch',
    status: 'offen',
  },
  {
    id: 'TA-17',
    phase: 3,
    phaseLabel: 'Phase 3 (Tage 61–90)',
    titel: 'Schwachstellen-Scan aller extern erreichbaren Systeme',
    beschreibung: 'Externer oder interner Scan. Kritische Schwachstellen sofort patchen. Bericht dokumentieren.',
    rechtsgrundlage: '§30 Nr. 5 BSIG',
    fristTage: 90,
    prioritaet: 'mittel',
    status: 'offen',
  },
  {
    id: 'TA-18',
    phase: 3,
    phaseLabel: 'Phase 3 (Tage 61–90)',
    titel: 'Business Impact Analyse (BIA)',
    beschreibung: 'Geschäftskritische Prozesse identifizieren. RTO/RPO für Rettungsdienst-IT festlegen. Ergebnis dokumentieren.',
    rechtsgrundlage: '§30 Nr. 3 BSIG',
    fristTage: 90,
    prioritaet: 'mittel',
    status: 'offen',
  },
  {
    id: 'TA-19',
    phase: 3,
    phaseLabel: 'Phase 3 (Tage 61–90)',
    titel: 'Lieferantenverträge: Sicherheitsklauseln ergänzen',
    beschreibung: 'Cybersicherheitsanforderungen, Meldepflichten, Audit-Rechte in bestehende und neue Verträge aufnehmen. Muster-Klausel verwenden.',
    rechtsgrundlage: '§30 Nr. 4 BSIG',
    fristTage: 90,
    prioritaet: 'mittel',
    status: 'offen',
  },
  {
    id: 'TA-20',
    phase: 3,
    phaseLabel: 'Phase 3 (Tage 61–90)',
    titel: 'Netzwerksegmentierung planen',
    beschreibung: 'Rettungsdienst-IT, Verwaltung, Gäste-WLAN segmentieren. Netzwerkplan mit Sicherheitszonen erstellen. Umsetzung in Phase 4.',
    rechtsgrundlage: '§30 Nr. 5 BSIG',
    fristTage: 90,
    prioritaet: 'mittel',
    status: 'offen',
  },
  {
    id: 'TA-21',
    phase: 3,
    phaseLabel: 'Phase 3 (Tage 61–90)',
    titel: '12-Monats-ISMS-Roadmap erstellen',
    beschreibung: 'Detaillierter Projektplan für ISMS-Aufbau und Zertifizierung (ISO 27001 dauert 9–18 Monate). Meilensteine, Verantwortliche, Budget.',
    rechtsgrundlage: 'ISO 27001 / §30 BSIG',
    fristTage: 90,
    prioritaet: 'mittel',
    status: 'offen',
  },
];

// 18 Pflichtdokumente nach §30 BSIG (aus Caritas-Dokument Kap. 12.11)
export const PFLICHT_DOKUMENTE: Omit<PflichtDokument, 'verantwortlich' | 'vorhandeneVersion'>[] = [
  { id: 'PD-01', nummer: 1,  titel: 'Informationssicherheitsleitlinie', beschreibung: 'Von GL verabschiedetes Grundsatzdokument (1–3 Seiten)', rechtsgrundlage: '§30 Nr. 1 BSIG', status: 'offen' },
  { id: 'PD-02', nummer: 2,  titel: 'Risikoanalyse', beschreibung: 'Systematische Bewertung aller IT-Risiken', rechtsgrundlage: '§30 Nr. 1 BSIG', status: 'offen' },
  { id: 'PD-03', nummer: 3,  titel: 'Risikobehandlungsplan', beschreibung: 'Maßnahmen zu jedem identifizierten Risiko', rechtsgrundlage: '§30 Nr. 1 BSIG', status: 'offen' },
  { id: 'PD-04', nummer: 4,  titel: 'Statement of Applicability (SoA)', beschreibung: 'Erklärung zur Anwendbarkeit aller Maßnahmen', rechtsgrundlage: 'ISO 27001', status: 'offen' },
  { id: 'PD-05', nummer: 5,  titel: 'IT-Asset-Inventar', beschreibung: 'Alle Systeme mit Klassifikation und Schutzbedarf', rechtsgrundlage: '§30 Nr. 9 BSIG', status: 'offen' },
  { id: 'PD-06', nummer: 6,  titel: 'Incident-Response-Plan', beschreibung: 'Eskalationsstufen, Rollen, Kommunikationswege, Meldefristen', rechtsgrundlage: '§30 Nr. 2 + §32 BSIG', status: 'offen' },
  { id: 'PD-07', nummer: 7,  titel: 'Business Continuity Plan', beschreibung: 'Notfallplan für kritische Dienste', rechtsgrundlage: '§30 Nr. 3 BSIG', status: 'offen' },
  { id: 'PD-08', nummer: 8,  titel: 'Disaster Recovery Plan', beschreibung: 'Technischer Wiederherstellungsplan', rechtsgrundlage: '§30 Nr. 3 BSIG', status: 'offen' },
  { id: 'PD-09', nummer: 9,  titel: 'Backup-Konzept', beschreibung: '3-2-1-Regel, Restore-Test-Protokolle', rechtsgrundlage: '§30 Nr. 3 BSIG', status: 'offen' },
  { id: 'PD-10', nummer: 10, titel: 'Lieferantenverzeichnis', beschreibung: 'Alle IT-Dienstleister mit Kritikalitätsbewertung', rechtsgrundlage: '§30 Nr. 4 BSIG', status: 'offen' },
  { id: 'PD-11', nummer: 11, titel: 'Lieferantenverträge mit Sicherheitsklauseln', beschreibung: 'Cybersicherheitsanforderungen, Meldepflichten, Audit-Rechte', rechtsgrundlage: '§30 Nr. 4 BSIG', status: 'offen' },
  { id: 'PD-12', nummer: 12, titel: 'Zugriffsrechte-Dokumentation', beschreibung: 'Wer hat Zugriff auf was, wann zuletzt überprüft', rechtsgrundlage: '§30 Nr. 9 BSIG', status: 'offen' },
  { id: 'PD-13', nummer: 13, titel: 'Schulungsnachweise', beschreibung: 'Alle Mitarbeitenden + Geschäftsleitung, Datum, Inhalte', rechtsgrundlage: '§30 Nr. 7 + §38 BSIG', status: 'offen' },
  { id: 'PD-14', nummer: 14, titel: 'Audit-Berichte', beschreibung: 'Interne/externe Audit-Ergebnisse und Korrekturmaßnahmen', rechtsgrundlage: '§30 Nr. 6 BSIG', status: 'offen' },
  { id: 'PD-15', nummer: 15, titel: 'Maßnahmenplan', beschreibung: 'Priorisierter Plan mit Verantwortlichkeiten und Terminen', rechtsgrundlage: '§30 BSIG', status: 'offen' },
  { id: 'PD-16', nummer: 16, titel: 'Kryptographie-Konzept', beschreibung: 'Verwendete Verfahren, Schlüsselmanagement', rechtsgrundlage: '§30 Nr. 8 BSIG', status: 'offen' },
  { id: 'PD-17', nummer: 17, titel: 'Netzwerkplan mit Sicherheitszonen', beschreibung: 'Dokumentierte Segmentierung', rechtsgrundlage: '§30 Nr. 5 BSIG', status: 'offen' },
  { id: 'PD-18', nummer: 18, titel: 'Meldeprozess-Dokument', beschreibung: 'Wer meldet was wann an wen (inkl. BSI, DSGVO)', rechtsgrundlage: '§32 BSIG + Art. 33 DSGVO', status: 'offen' },
];
```

### Tracker-State in localStorage

**Key:** `nis2-tracker-state`

```typescript
interface TrackerState {
  aufgaben: Record<string, {
    status: AufgabenStatus;
    verantwortlich: string;
    notiz: string;
    erledigtAm?: string;  // ISO-Datum
  }>;
  dokumente: Record<string, {
    status: AufgabenStatus;
    verantwortlich: string;
    version: string;
  }>;
  startdatum: string;  // ISO-Datum, wann wurde Tracker angelegt
  letzteAktualisierung: string;
}
```

### Seitenstruktur `/app/tracker/page.tsx`

1. **Fortschrittsbalken gesamt** (erledigte Aufgaben / 21 + erledigte Dokumente / 18)
1. **Tabs:** “Aufgaben (21)” | “Pflichtdokumente (18)”
1. **Aufgaben-Tab:**
- Gruppiert nach Phase (1–4)
- Pro Aufgabe: Titel, Status-Badge (Ampel), Eingabefeld Verantwortlich, Textfeld Notiz, §-Angabe, BSI-Link
- Status per Klick toggelbar: offen → in_arbeit → erledigt → offen
- Erledigungsdate wird automatisch gesetzt
1. **Dokumente-Tab:**
- Tabellarisch (Nr., Dokument, Status, Verantwortlich, Version)
- Status togglebar
1. **Export-Button:** Druckbare Checkliste (selbe print-CSS wie bestehende ExportActions)
1. **QR-Code:** Tracker-State zusätzlich in QR kodieren (state-codec.ts erweitern)

**Validierung:** Die Tracker-Seite muss ohne vorhandenen localStorage-Eintrag `nis2-audit-result` funktionieren (Tracker ist unabhängig nutzbar).

-----

## Modul 3: Vorstand-Briefing-Generator

### Ziel

Druckfertiger Einseiter (A4) für die nächste Vorstandssitzung. Generiert sich automatisch aus Self-Check-Ergebnis. Kein Fachjargon. Klare Handlungsaufforderung.

### Keine neue Route nötig

Integriere als neuen Tab oder Abschnitt auf der bestehenden Ergebnisseite `/app/ergebnis/page.tsx`.  
Alternativ: eigene Print-Route `/app/ergebnis/briefing/page.tsx` (bevorzugt, wegen sauberer URL für Weitergabe).

### Neue Datei: Briefing-Generator

**Pfad:** `lib/briefing/vorstand-briefing.ts`

```typescript
import type { AssessmentResult, WizardAnswers, Grunddaten } from '@/lib/types';

export interface VorstandBriefing {
  datum: string;
  kvName: string;
  vorstand: string;
  
  // Betroffenheit (in einfacher Sprache)
  betroffenheitLabel: string;       // "Wahrscheinlich betroffen"
  betroffenheitGrund: string;       // "Rettungsdienst ≥50 VZÄ → NIS-2 Gesundheitssektor"
  einstufung: string;               // "Wichtige Einrichtung (§28 BSIG)"
  
  // Offene Pflichten (Ampel-Liste)
  pflichten: Array<{
    titel: string;
    status: 'offen' | 'unklar';
    frist?: string;
    paragraph: string;
  }>;
  
  // Haftung (persönlich, klar formuliert)
  haftungText: string;
  busseldText: string;
  
  // Kosten (Bandbreite)
  kostenEinmaligMin: number;
  kostenEinmaligMax: number;
  kostenJaehrlichMin: number;
  kostenJaehrlichMax: number;
  
  // Drei nächste Schritte
  naechsteSchritte: Array<{
    schritt: number;
    aktion: string;
    frist: string;
  }>;
  
  // QR-Code URL (für Wiederaufruf des vollständigen Checks)
  toolUrl: string;
}

export function generiereVorstandBriefing(
  result: AssessmentResult,
  answers: WizardAnswers,
  grunddaten: Grunddaten
): VorstandBriefing {
  const isBetroffenWahrscheinlich = result.outcome.type === 'B' || result.outcome.type === 'A' || result.outcome.type === 'C';
  const vzae = (answers['THR-01'] as number) ?? 0;
  const groesse = vzae < 50 ? 'S' : vzae <= 250 ? 'M' : 'L';
  
  // Kostenschätzung (vereinfacht)
  const kostenMap = {
    S: { einmaligMin: 40000,  einmaligMax: 150000,  jaehrlichMin: 25000,  jaehrlichMax: 80000  },
    M: { einmaligMin: 150000, einmaligMax: 500000,  jaehrlichMin: 80000,  jaehrlichMax: 250000 },
    L: { einmaligMin: 400000, einmaligMax: 1200000, jaehrlichMin: 200000, jaehrlichMax: 600000 },
  };
  const kosten = kostenMap[groesse];

  return {
    datum: new Date().toLocaleDateString('de-DE'),
    kvName: grunddaten.kreisverband || 'DRK-Kreisverband',
    vorstand: grunddaten.vorstand || '',
    
    betroffenheitLabel: isBetroffenWahrscheinlich ? 'Wahrscheinlich betroffen' : 'Möglicherweise betroffen',
    betroffenheitGrund: result.jurisdiction.isRdProvider
      ? `Rettungsdienst-Leistungen + ${vzae > 0 ? vzae + ' VZÄ' : 'Schwellenwert geprüft'} → Gesundheitssektor NIS-2`
      : result.outcome.summary,
    einstufung: result.jurisdiction.classification || 'Einstufung unklar – Rechtsberatung empfohlen',
    
    pflichten: [
      {
        titel: 'Registrierung beim BSI',
        status: 'offen',
        frist: '06.03.2026',
        paragraph: '§33 BSIG',
      },
      {
        titel: 'Risikomanagement (10 Maßnahmen)',
        status: 'offen',
        frist: 'Sofort (seit 06.12.2025)',
        paragraph: '§30 BSIG',
      },
      {
        titel: '24h-Meldepflicht bei Sicherheitsvorfällen',
        status: 'offen',
        frist: 'Sofort bei Vorfall',
        paragraph: '§32 BSIG',
      },
      {
        titel: 'Pflichtschulung Geschäftsleitung',
        status: 'offen',
        frist: 'Regelmäßig (alle 2–3 Jahre)',
        paragraph: '§38 Abs. 3 BSIG',
      },
    ],
    
    haftungText: 'Als Mitglieder der Geschäftsleitung haften Sie persönlich mit Ihrem Privatvermögen für schuldhaft verursachte Schäden durch Nichterfüllung der NIS-2-Pflichten (§38 Abs. 2 BSIG i.V.m. §43 GmbHG).',
    busseldText: result.jurisdiction.classification?.includes('besonders') 
      ? 'Bußgeld bis 10 Mio. EUR oder 2% Jahresumsatz möglich.'
      : 'Bußgeld bis 7 Mio. EUR oder 1,4% Jahresumsatz möglich.',
    
    kostenEinmaligMin: kosten.einmaligMin,
    kostenEinmaligMax: kosten.einmaligMax,
    kostenJaehrlichMin: kosten.jaehrlichMin,
    kostenJaehrlichMax: kosten.jaehrlichMax,
    
    naechsteSchritte: [
      {
        schritt: 1,
        aktion: 'IT-Sicherheitsbeauftragte/n (ISB) benennen (intern oder extern)',
        frist: `bis ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE')}`,
      },
      {
        schritt: 2,
        aktion: 'BSI-Registrierung abschließen (ELSTER-Zertifikat beantragen, dauert 5+ Werktage)',
        frist: '06.03.2026',
      },
      {
        schritt: 3,
        aktion: 'Haushaltsposition IT-Sicherheit beschließen',
        frist: 'nächste Vorstandssitzung',
      },
    ],
    
    toolUrl: 'https://nis2.henryagi.de',
  };
}
```

### Briefing-Komponente

**Pfad:** `components/results/VorstandBriefing.tsx`

Das Briefing ist ein rein print-optimiertes Komponente (`@media print`). Es rendert als normales div, aber beim Drucken erscheint nur dieser Block auf einer A4-Seite.

Layout des Einseiter-Briefings:

```
┌──────────────────────────────────────────────────────┐
│ [DRK-Logo]  NIS-2 Lagebericht                         │
│             [KV-Name] · Stand [Datum]                  │
├──────────────────────────────────────────────────────┤
│ BETROFFENHEIT                                         │
│ ● [Label] — [Grund]                                   │
│ Einstufung: [Klassifikation]                          │
├──────────────────────────────────────────────────────┤
│ OFFENE PFLICHTEN          │ HAFTUNG                   │
│ ✗ BSI-Registrierung       │ Persönliche Haftung       │
│   06.03.2026 · §33 BSIG   │ Privatvermögen!           │
│ ✗ Risikomanagement        │ [Bußgeldhöhe]             │
│ ✗ 24h-Meldepflicht        │                           │
│ ✗ GL-Pflichtschulung      │                           │
├──────────────────────────────────────────────────────┤
│ KOSTEN (Orientierung)                                 │
│ Einmalig: [min]–[max] EUR                             │
│ Laufend:  [min]–[max] EUR/Jahr                        │
│ Vergleich: Ransomware-Schaden Ø 2–23 Mio. EUR        │
├──────────────────────────────────────────────────────┤
│ NÄCHSTE SCHRITTE                                      │
│ 1. [Aktion] – bis [Frist]                             │
│ 2. [Aktion] – bis [Frist]                             │
│ 3. [Aktion] – bis [Frist]                             │
├──────────────────────────────────────────────────────┤
│ Detailanalyse: [QR-Code]  nis2.henryagi.de            │
│ Hinweis: Keine Rechtsberatung. Stand März 2026.       │
└──────────────────────────────────────────────────────┘
```

Implementierung: Nutze `@media print { .briefing-only { display: block } .no-print { display: none } }` in der globalen CSS. Der “Briefing drucken”-Button triggert `window.print()`.

Auf der Ergebnisseite: Neuer Button “📋 Vorstand-Briefing drucken” in der `ExportActions.tsx`-Komponente, der die Briefing-Komponente via State sichtbar macht und dann `window.print()` aufruft.

-----

## Modul 4: Lieferketten-Check (für nicht-direkt-betroffene KV)

### Ziel

Kreisverbände ohne Rettungsdienst (Outcome D) können prüfen, ob sie über Geschäftsbeziehungen zu NIS-2-pflichtigen Partnern indirekt betroffen sind.

### Einstiegspunkt

Nur anzeigen wenn `result.outcome.type === 'D'` (nicht direkt betroffen). Auf der Ergebnisseite unterhalb des Outcome-D-Textes: “Trotzdem betroffen? Lieferketten-Check starten →”

Alternativ: eigenständige Route `/app/lieferkette/page.tsx`

### Neue Datei: Lieferketten-Fragen

**Pfad:** `lib/lieferkette/lieferketten-check.ts`

```typescript
export interface LieferkettenFrage {
  id: string;
  frage: string;
  erklaerung: string;
  relevanzWennJa: string;  // Was bedeutet "Ja" konkret?
}

export interface LieferkettenAntworten {
  [key: string]: boolean | undefined;
}

export interface LieferkettenErgebnis {
  indirektBetroffen: boolean;
  betroffeheitsgrad: 'hoch' | 'mittel' | 'gering' | 'keiner';
  ausloesendeFragen: string[];  // IDs der Fragen mit "Ja"
  anforderungen: LieferkettenAnforderung[];
  empfehlung: string;
}

export interface LieferkettenAnforderung {
  kategorie: string;
  beschreibung: string;
  wahrscheinlichkeit: 'sehr hoch' | 'hoch' | 'mittel';
  rechtsgrundlage: string;
}

export const LIEFERKETTEN_FRAGEN: LieferkettenFrage[] = [
  {
    id: 'LK-01',
    frage: 'Nutzt euer Kreisverband einen IT-Dienstleister des DRK-Landesverbands oder eine geteilte IT-Infrastruktur mit anderen Verbänden?',
    erklaerung: 'Wenn dieser IT-Dienstleister NIS-2-pflichtig ist (z.B. weil er für andere KV Rettungsdienst-IT betreibt), gelten seine Sicherheitsvorgaben auch für euch.',
    relevanzWennJa: 'Euer IT-Dienstleister wird IT-Sicherheitsanforderungen vertraglich weitergeben (MFA, Meldepflichten, Passwortrichtlinien).',
  },
  {
    id: 'LK-02',
    frage: 'Erbringt euer Kreisverband digitale Leistungen für ein Krankenhaus oder eine Reha-Einrichtung (z.B. Wäscherei, Catering, Reinigung mit digitalem Auftragssystem)?',
    erklaerung: 'Krankenhäuser sind NIS-2-pflichtig und müssen nach §30 Abs. 2 Nr. 4 BSIG ihre Lieferkette sichern.',
    relevanzWennJa: 'Das Krankenhaus muss IT-Sicherheitsanforderungen vertraglich an euch weitergeben. Erwartet: Sicherheitsfragebögen, Audit-Rechte, Meldepflichten.',
  },
  {
    id: 'LK-03',
    frage: 'Ist euer Kreisverband Teil einer gemeinsamen IT-Infrastruktur mit einem anderen KV, der Rettungsdienst erbringt?',
    erklaerung: 'Gemeinsames Active Directory, gemeinsame Server oder gemeinsames Netz reichen aus – technische Trennung ist dann nicht gegeben.',
    relevanzWennJa: 'Durch die geteilte Infrastruktur erstreckt sich der NIS-2-Scope faktisch auf euch. Ein Angriff auf euer Netz könnte den Rettungsdienst-KV treffen.',
  },
  {
    id: 'LK-04',
    frage: 'Betreibt euer Kreisverband digitale Schnittstellen oder Datenaustausch mit NIS-2-pflichtigen Einrichtungen (z.B. Leitstellen, Krankenhäuser, Rettungsdienst-Träger)?',
    erklaerung: 'API-Verbindungen, Datenaustauschplattformen oder gemeinsame Software zählen.',
    relevanzWennJa: 'Die NIS-2-pflichtige Einrichtung wird Sicherheitsanforderungen für Schnittstellen vertraglich fordern.',
  },
  {
    id: 'LK-05',
    frage: 'Erbringt euer Kreisverband Pflegeleistungen (ambulant oder stationär) für Einrichtungen, die mit einem NIS-2-pflichtigen Träger verbunden sind?',
    erklaerung: 'Komplexträger-Strukturen: Wenn ein anderer Träger euren Kreisverband als Dienstleister nutzt und selbst NIS-2-pflichtig ist.',
    relevanzWennJa: 'Vertragliche IT-Sicherheitsanforderungen und möglicherweise Audit-Rechte.',
  },
  {
    id: 'LK-06',
    frage: 'Ist euer Kreisverband SoCura-Kunde (oder Kunde eines vergleichbaren NIS-2-pflichtigen IT-Dienstleisters)?',
    erklaerung: 'NIS-2-pflichtige IT-Dienstleister (Managed Service Provider) müssen ihre Kunden über Sicherheitsvoraussetzungen informieren.',
    relevanzWennJa: 'SoCura (und vergleichbare MSPs) werden Sicherheitsvorgaben einfordern: MFA, Passwortrichtlinien, Meldung von Vorfällen innerhalb definierter Fristen.',
  },
];

// Mapping: Welche Anforderungen entstehen bei welchen "Ja"-Antworten
export function berechneLieferkettenErgebnis(
  antworten: LieferkettenAntworten
): LieferkettenErgebnis {
  const ausloesendeFragen = Object.entries(antworten)
    .filter(([, v]) => v === true)
    .map(([k]) => k);

  const indirektBetroffen = ausloesendeFragen.length > 0;
  
  const betroffeheitsgrad = 
    ausloesendeFragen.length >= 3 ? 'hoch' :
    ausloesendeFragen.length === 2 ? 'mittel' :
    ausloesendeFragen.length === 1 ? 'gering' : 'keiner';

  const anforderungen: LieferkettenAnforderung[] = [];
  
  if (indirektBetroffen) {
    anforderungen.push(
      {
        kategorie: 'Multi-Faktor-Authentifizierung',
        beschreibung: 'MFA für alle Konten mit Zugang zu geteilten Systemen oder Schnittstellen',
        wahrscheinlichkeit: 'sehr hoch',
        rechtsgrundlage: '§30 Nr. 10 BSIG (über Lieferkette)',
      },
      {
        kategorie: 'Sicherheitsfragebogen',
        beschreibung: 'Nachweis eurer IT-Sicherheitsmaßnahmen auf Anforderung des Partners',
        wahrscheinlichkeit: 'sehr hoch',
        rechtsgrundlage: '§30 Nr. 4 BSIG',
      },
      {
        kategorie: 'Meldepflicht bei Vorfällen',
        beschreibung: 'Meldung von Sicherheitsvorfällen an den NIS-2-pflichtigen Partner (oft 24h)',
        wahrscheinlichkeit: 'hoch',
        rechtsgrundlage: '§30 Nr. 4 BSIG i.V.m. Vertragsrecht',
      },
      {
        kategorie: 'Patch-Management',
        beschreibung: 'Nachweis zeitnaher Sicherheitsupdates aller verbundenen Systeme',
        wahrscheinlichkeit: 'hoch',
        rechtsgrundlage: '§30 Nr. 5 BSIG',
      },
    );

    if (ausloesendeFragen.includes('LK-01') || ausloesendeFragen.includes('LK-06')) {
      anforderungen.push({
        kategorie: 'Passwortrichtlinien & Konten-Hygiene',
        beschreibung: 'Starke Passwörter, keine geteilten Accounts, regelmäßige Zugriffsreviews',
        wahrscheinlichkeit: 'sehr hoch',
        rechtsgrundlage: '§30 Nr. 9 BSIG (über IT-Dienstleister)',
      });
    }

    if (ausloesendeFragen.includes('LK-03')) {
      anforderungen.push({
        kategorie: 'Netztrennung / Segmentierung',
        beschreibung: 'Euer Netz darf keine Brücke zum Rettungsdienst-Netz bilden – aktive Segmentierung erforderlich',
        wahrscheinlichkeit: 'sehr hoch',
        rechtsgrundlage: '§30 Nr. 5 BSIG + technischer Scope',
      });
    }
  }

  const empfehlung = !indirektBetroffen
    ? 'Aktuell keine indirekte NIS-2-Betroffenheit erkennbar. IT-Sicherheit trotzdem auf angemessenem Niveau halten.'
    : betroffeheitsgrad === 'hoch'
    ? 'Erhebliche indirekte Betroffenheit. Proaktiv mit Partnern sprechen, bevor erste Sicherheitsanforderungen per Brief kommen. Basishygiene (MFA, Backup, Meldeprozess) jetzt umsetzen.'
    : 'Indirekte Betroffenheit über Lieferkette. Basishygiene-Maßnahmen umsetzen und auf erste Anforderungen der Partner vorbereiten.';

  return {
    indirektBetroffen,
    betroffeheitsgrad,
    ausloesendeFragen,
    anforderungen,
    empfehlung,
  };
}
```

### Seitenstruktur Lieferketten-Check

1. **Einstieg:** Erklärender Text “Auch ohne direkten Rettungsdienst könnt ihr betroffen sein – über eure Geschäftspartner.”
1. **6 Ja/Nein-Fragen** mit Erklärungstext (aufklappbar)
1. **Ergebnis:**
- Betroffenheitsgrad-Badge (hoch/mittel/gering/keiner)
- Liste der wahrscheinlichen Anforderungen als Cards
- Empfehlung als Infobox
1. **Verknüpfung:** “Für direkt betroffene KV → vollständiger Self-Check” (Link zur Startseite)

-----

## Navigation & Startseite

### Hauptnavigation erweitern

In `app/layout.tsx`: Navigationslinks ergänzen:

- ✅ Self-Check (bestehend → `/check`)
- ➕ Kostenrechner (`/kosten`)
- ➕ Compliance-Tracker (`/tracker`)

### Startseite (`app/page.tsx`)

Unterhalb des bestehenden CTA-Buttons (“Check starten”) vier Feature-Cards einfügen:

```
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ 🔍 Self-Check    │ │ 💶 Kostenrechner  │ │ ✅ Tracker       │ │ 🔗 Lieferkette  │
│ Bin ich          │ │ Was kostet NIS-2  │ │ Was ist          │ │ Auch ohne        │
│ betroffen?       │ │ meinen KV?        │ │ erledigt?        │ │ Rettungsdienst  │
│ 10–15 min        │ │ Bundesland-       │ │ 21 Aufgaben,     │ │ betroffen?      │
│                  │ │ spezifisch        │ │ 18 Dokumente     │ │                 │
└──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────────┘
```

-----

## Technische Gesamtanforderungen

### Datenhaltung

Alle neuen Module nutzen **ausschließlich localStorage** und folgen der Zero-Data-Philosophie:

- Kein Server, keine API, kein Account
- Alle Keys mit Prefix `nis2-` (bestehende Konvention beibehalten)
- Neue Keys:
  - `nis2-kosten-bundesland` → string (Bundesland-Code)
  - `nis2-tracker-state` → JSON (TrackerState)
  - `nis2-lieferkette-antworten` → JSON (LieferkettenAntworten)

### Datenintegrität

- Alle Seiten müssen graceful degraden wenn keine localStorage-Daten vorhanden sind
- Fehlermeldung: “Führe zuerst den Self-Check durch → /check”
- Ausnahme: Tracker und Lieferketten-Check können standalone genutzt werden

### TypeScript

- Alle neuen Dateien: strict mode
- Keine `any`-Types
- Alle Interfaces in `lib/types.ts` ergänzen (neue Typen dort zentralisieren)

### Styling

- Tailwind CSS 4 (nur Core-Utilities, kein JIT-only)
- DRK-Farben aus `globals.css` verwenden (keine hardcodierten Hex-Werte)
- Print-Styles für Briefing und Tracker-Export in `globals.css` ergänzen

### Validierung (nach jeder Teilaufgabe)

```bash
npm run build      # muss fehlerfrei
npx tsc --noEmit   # muss fehlerfrei
```

-----

## Reihenfolge der Implementierung

1. **Neue Typen** in `lib/types.ts` ergänzen (alle Interfaces für alle 4 Module)
1. **Modul 3** (Vorstand-Briefing) – kleinster Aufwand, größter sofortiger Nutzen, nutzt nur bestehende Daten
1. **Modul 1** (Kostenrechner) – `lib/costs/` anlegen, Seite bauen
1. **Modul 4** (Lieferketten-Check) – `lib/lieferkette/` anlegen, Seite bauen
1. **Modul 2** (Compliance-Tracker) – `lib/tracker/` anlegen, Seite bauen (größter Aufwand)
1. **Navigation & Startseite** – Feature-Cards, Links ergänzen
1. **Abschluss-Validierung** – `npm run build` + `npx tsc --noEmit`

-----

## Wichtige Hinweise

**Zu Modul 1 – Bundesland-Daten:**
Die `bundesland-refinanzierung.ts` enthält den aktuellen Wissensstand (März 2026). Die Daten zu `rdItKostenAnerkannt`, `pflegesatzPraxis` etc. basieren auf öffentlich verfügbaren Informationen und der Caritas-Netzwerk-IT-Analyse. Sie sind Orientierungshilfe, keine Rechtsberatung. Auf jeder Bundesland-spezifischen Anzeige muss dieser Hinweis erscheinen:

> “Die Refinanzierungsmöglichkeiten sind bundesland- und trägerabhängig. Diese Informationen sind Orientierungshilfe ohne Gewähr. Wende dich an deinen DRK-Landesverband oder eine Rechtsberatung für verbindliche Auskunft. Stand: März 2026.”

**Zu Modul 2 – Keine Datenbankpflicht:**
Der Tracker funktioniert rein über localStorage. Für zukünftige v3-Überlegungen (z.B. mehrere Mitarbeitende pflegen den Tracker) müsste ein Backend ergänzt werden – das ist nicht Teil dieser Anweisung.

**Zur Bundesland-Auswahl:**
Falls kein Bundesland gewählt wird, zeige nur die bundesweiten Pfade. Nie einen leeren Zustand zeigen.
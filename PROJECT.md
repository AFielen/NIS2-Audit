# PROJECT.md – Interne Projektdokumentation

## App-Name
NIS-2 Audit

## Kurzbeschreibung
DRK-spezifische NIS-2-Betroffenheitsanalyse für Kreisverbände und Landesverbände mit Ergebnislogik, Scope-Bewertung und 90-Tage-Roadmap.

## Status
In Entwicklung (v1.0.0)

---

## Architekturentscheidungen

### Statisch / clientseitig
Die App wird als statischer Next.js-Export deployt (`output: 'export'`). Die gesamte Fachlogik läuft im Browser. Kein Backend, keine API, keine Datenbank.

### localStorage
Wizard-Fortschritt, Antworten und Ergebnisse werden in `localStorage` gespeichert. Beim Schließen des Browsers bleiben die Daten erhalten, können aber jederzeit gelöscht werden.

### Kein Backend
Bewusste Entscheidung: Die Sensibilität der erhobenen Daten (Organisationsstruktur, IT-Architektur, Sicherheitslücken) rechtfertigt keine serverseitige Speicherung. Alle Daten verbleiben auf dem Gerät des Nutzers.

---

## Policy-Packs

Policy-Packs werden in `lib/rules/policy-packs.ts` gepflegt.

### public-bsi
- Bildet den öffentlich auffindbaren BSI-Regelstand ab
- Rettungsdienst ist kein automatischer Sektor-Trigger
- Relevante Regel: REG-010

### verbandslinie-konservativ (Default)
- Konservative Auslegung für DRK-Verbände
- Rettungsdienst wird als sektoraler Trigger behandelt
- Relevante Regel: REG-011

### Neue Policy-Packs hinzufügen
1. Typ in `lib/types.ts` erweitern
2. Konfiguration in `lib/rules/policy-packs.ts` ergänzen
3. Ggf. spezifische Regeln in `lib/rules/decision-matrix.ts` ergänzen
4. UI in `PolicyPackSwitch.tsx` erweitert sich automatisch

---

## Regelpflege

### Entscheidungsmatrix
Alle Regeln (REG-001 bis REG-060) sind in `lib/rules/decision-matrix.ts` als typisierte Datenstruktur definiert. Jede Regel referenziert:
- Frage-ID und Antwortcode
- Policy-Pack-Zuordnung
- Ergebniswirkung
- Roadmap-Packs

### Evaluations-Engine
Die Kernlogik in `lib/rules/evaluate.ts` arbeitet in 10 Schritten:
1. Policy-Pack lesen
2. Relevanten Rechtsträger bestimmen
3. Sektor-Trigger prüfen
4. Schwellenwerte prüfen
5. Komplexe Verbundstruktur prüfen
6. Shared IT prüfen
7. Trennungsnachweis prüfen
8. Nachweisniveau prüfen
9. Reifegradlücken in Roadmap-Packs übersetzen
10. Ergebnis A/B/C/D ableiten

### Harte Trennungslogik
Ergebnis B erfordert den Vollnachweis aller 8 Kriterien (siehe Briefing §12). Die Prüfung erfolgt in `evaluate.ts` → `checkHardSeparation()`.

---

## Roadmap-Packs

12 Maßnahmenpakete (P1–P12) in `lib/rules/roadmap.ts`:
- P1: Governance & Haftung (0–30 Tage)
- P2: Rechtsträger- & Schwellenwertprüfung (0–15 Tage)
- P3: Registrierung & Meldeprozess (0–30 Tage)
- P4: Identity & Access (0–45 Tage)
- P5: Netzwerk & Segmentierung (0–60 Tage)
- P6: Backup / BCM / Wiederanlauf (0–60 Tage)
- P7: Incident Response & Logging (0–60 Tage)
- P8: Lieferkette & Verträge (30–90 Tage)
- P9: Dokumentation & Mock Audit (60–90 Tage)
- P10: Harter Trennungsnachweis (30–90 Tage)
- P11: Komplexe Verbundstruktur / juristische Review (0–30 Tage)
- P12: Datenqualität & Nachweislage (0–30 Tage)

---

## Bekannte fachliche Grenzen (v1)

- Das Tool ersetzt keine juristische Beratung
- Krankentransport wird nicht als automatischer Trigger gewertet (nur Review-Flag)
- Pflegeleistungen werden für Shared-IT-Scope gemappt, aber nicht als eigenständiger NIS-2-Trigger
- Die Schwellenwertlogik bildet die EU-KMU-Definition vereinfacht ab
- Katastrophenschutz wird nur auf BCM/IT-Aspekte geprüft

---

## Offene Punkte für v2

- [ ] Mehrsprachige Ergebnistexte vollständig ausbauen
- [ ] Presets automatisch aus Verbandsdatenbank laden
- [ ] Detailliertere Reifegrad-Analyse pro Kontrollbereich
- [ ] Vergleichsfunktion: eigenes Ergebnis vs. Benchmark
- [ ] PDF-Export mit Layout (clientseitig via jsPDF o.ä.)
- [ ] Multi-Entity-Prüfung in einem Durchlauf (mehrere Rechtsträger eines Verbunds)
- [ ] Versionierung der Policy-Packs mit Changelog
- [ ] Optionale Anbindung an DRK-interne Systeme

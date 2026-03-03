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

## Regelwerk (Single Ruleset)

Das gesamte Fachregelwerk ist in einer einzigen JSON-Datei definiert:

```
lib/rules/nis2-drk-ruleset.v1.json
```

Diese Datei ist die **Single Source of Truth** und enthält:
- **meta**: Version, Name, Beschreibung
- **enums**: Wiederverwendbare Wertemengen (z.B. Rechtsform, Outcome-Typen)
- **questions**: Alle ~32 Fragen mit Texten, Antwortoptionen und `visibleIf`-Bedingungen
- **rules**: Entscheidungsregeln im WHEN/THEN-Format
- **scoring**: 12 Sicherheitskontrollen + 4 Reifegrad-Bänder
- **roadmapPacks**: 7 Maßnahmenpakete (P1–P7)

### Evaluations-Engine

Die generische Engine in `lib/rules/evaluate.ts`:
1. Lädt das JSON-Regelwerk
2. Iteriert über alle Regeln in Reihenfolge
3. Prüft WHEN-Bedingungen (questionId-basiert oder path-basiert)
4. Führt THEN-Aktionen aus (set, addRoadmapPacks, compute)
5. Berechnet Scoring aus SEC-01..SEC-12 Antworten
6. Gibt ein typisiertes `AssessmentResult` zurück

Unterstützte Bedingungstypen: `eq`, `gt`, `lte`, `in`, `missing`, `lte_or_missing`, `any`, `all`
Unterstützte Aktionen: `set` (Pfad-basiert), `addRoadmapPacks`, `compute` (z.B. `allYes`)

### Harte Trennungslogik
Ergebnis B erfordert den Vollnachweis aller 8 Trennungskriterien (SEP-01 bis SEP-08). Die Prüfung erfolgt über eine `compute: allYes`-Regel im JSON.

### Regelwerk erweitern
1. JSON-Datei `nis2-drk-ruleset.v1.json` bearbeiten
2. Neue Fragen, Regeln oder Roadmap-Packs hinzufügen
3. Die Engine verarbeitet sie automatisch — kein Code-Änderung nötig

---

## Roadmap-Packs

7 Maßnahmenpakete (P1–P7) im JSON-Regelwerk:
- P1: Governance, Rollen & Haftung
- P2: IAM & Admin-Konten
- P3: Netz-Segmentierung & Firewall
- P4: Backup, BCM & Wiederanlauf
- P5: Incident Response, SIEM & Logging
- P6: Lieferketten-Sicherheit & Verträge
- P7: Dokumentation & Audit-Readiness

---

## Bekannte fachliche Grenzen (v1)

- Das Tool ersetzt keine juristische Beratung
- Krankentransport wird nicht als automatischer Trigger gewertet
- Pflegeleistungen werden für Shared-IT-Scope betrachtet, aber nicht als eigenständiger NIS-2-Trigger
- Die Schwellenwertlogik bildet die EU-KMU-Definition vereinfacht ab
- Katastrophenschutz wird nur auf BCM/IT-Aspekte geprüft

---

## Offene Punkte für v2

- [ ] Mehrsprachige Ergebnistexte vollständig ausbauen
- [ ] Presets automatisch aus Verbandsdatenbank laden
- [ ] Detailliertere Reifegrad-Analyse pro Kontrollbereich
- [ ] Vergleichsfunktion: eigenes Ergebnis vs. Benchmark
- [ ] PDF-Export mit Layout (clientseitig via jsPDF o.ä.)
- [ ] Multi-Entity-Prüfung in einem Durchlauf (mehrere Rechtsträger eines Verbands)
- [ ] Versionierung des Regelwerks mit Changelog
- [ ] Optionale Anbindung an DRK-interne Systeme

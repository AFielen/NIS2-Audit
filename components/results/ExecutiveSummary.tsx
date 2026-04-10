'use client';

import { useState } from 'react';
import type { AssessmentResult, ScoringResult } from '@/lib/types';
import { getOutcomeColor, getOutcomeBgColor } from '@/lib/report';

interface ExecutiveSummaryProps {
  result: AssessmentResult;
}

function HintIcon({ hint }: { hint: string }) {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline-block ml-1">
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold leading-none"
        style={{ background: 'var(--text-muted)', color: '#fff' }}
        aria-label="Erklärung anzeigen"
      >
        ?
      </button>
      {show && (
        <>
          <div className="fixed inset-0 z-[9]" onClick={() => setShow(false)} />
          <span
            className="drk-hint-tooltip absolute left-1/2 -translate-x-1/2 top-6 z-10 w-64 max-w-[calc(100vw-2rem)] p-2 rounded-lg text-xs font-normal shadow-lg"
            style={{ background: 'var(--bg-card)', color: 'var(--text-light)', border: '1px solid var(--border)' }}
          >
            {hint}
          </span>
        </>
      )}
    </span>
  );
}

function isMaturityPoor(scoring: ScoringResult): boolean {
  return scoring.bandLabel === 'kritisch' || scoring.bandLabel === 'basal';
}

export default function ExecutiveSummary({ result }: ExecutiveSummaryProps) {
  const outcomeColor = getOutcomeColor(result.outcome.type);
  const outcomeBg = getOutcomeBgColor(result.outcome.type);

  const classificationLabel: Record<string, string> = {
    none: 'Keine',
    important: 'Wichtige Einrichtung',
    especially_important: 'Besonders wichtige Einrichtung',
  };

  const showHaftung = result.outcome.type === 'A' && isMaturityPoor(result.scoring);

  return (
    <div className="drk-card drk-fade-in">
      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>
        Executive Summary
      </h2>

      {/* Outcome Badge */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 p-3 sm:p-4 rounded-xl" style={{ background: outcomeBg }}>
        <div
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold shrink-0"
          style={{ background: outcomeColor, color: '#fff' }}
        >
          {result.outcome.type}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-base sm:text-lg" style={{ color: outcomeColor }}>
            Ergebnis {result.outcome.type}*
          </div>
          <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
            {result.outcome.label}
          </div>
          <div className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-light)' }}>
            {result.outcome.summary}
          </div>
        </div>
      </div>

      {/* Geschäftsführerhaftung warning for Category A with poor maturity */}
      {showHaftung && (
        <div
          className="p-3 rounded-lg border-l-4 mb-4"
          style={{ borderLeftColor: 'var(--drk)', background: 'var(--drk-bg)' }}
        >
          <div className="flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="shrink-0 mt-0.5" style={{ color: 'var(--drk)' }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <div className="text-sm font-bold" style={{ color: 'var(--drk)' }}>
                Hinweis: Geschäftsführerhaftung
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--text-light)' }}>
                Ihr Verband fällt voraussichtlich nicht unter NIS-2, aber die Sicherheitsreife ist als
                {' '}<strong>{result.scoring.bandLabel}</strong> eingestuft. Unabhängig von NIS-2 besteht eine
                Eigenverantwortung der Geschäftsführung für angemessene IT-Sicherheit (§ 43 GmbHG, § 93 AktG).
                Schwere Sicherheitsvorfälle können zu persönlicher Haftung führen. Wir empfehlen, die in der Roadmap
                genannten Maßnahmen dennoch umzusetzen.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* § 28 Abs. 4 BSIG Aggregation Warning — only for MSP path with IT interdependency */}
      {result.jurisdiction.isMspProvider && result.jurisdiction.mspAggregationWarning && (
        <div
          className="p-4 rounded-lg border-l-4 mb-4"
          style={{ borderLeftColor: 'var(--info)', background: 'var(--info-bg)' }}
        >
          <div className="flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="shrink-0 mt-0.5" style={{ color: 'var(--info)' }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <div>
              <div className="text-sm font-bold mb-1" style={{ color: 'var(--info)' }}>
                Hinweis: § 28 Abs. 4 BSIG – Zurechnung verbundener Unternehmen
              </div>
              <div className="text-sm space-y-2" style={{ color: 'var(--text-light)' }}>
                <p>
                  Sie haben angegeben, dass der IT-erbringende Rechtsträger mit dem Verbund IT-seitig verflochten ist
                  (gemeinsame Identitäten / Admins / Systeme). Damit greift in der Regel KEINE Ausnahme nach § 28 Abs. 4 BSIG —
                  die Schwellenwerte sind nicht nur isoliert auf Ebene des IT-Rechtsträgers zu prüfen, sondern unter Einbeziehung
                  verbundener Unternehmen nach KMU-Empfehlung 2003/361/EG.
                </p>
                <p>
                  <strong>Praktisch:</strong> Bei verbundenen Unternehmen (&gt; 50 % Beteiligung / Kontrolle) werden die Mitarbeiter-
                  und Finanzkennzahlen in der Regel VOLL hinzugerechnet, bei Partnerunternehmen (25–50 %) anteilig. Für den typischen
                  DRK-Verbund bedeutet das: Die Gesamt-VZÄ und der Gesamtumsatz des KV (inkl. Tochter-gGmbHs) sind maßgeblich, nicht
                  nur die des IT-erbringenden Rechtsträgers.
                </p>
                {result.jurisdiction.mspAggregationApplied && (
                  <p className="font-semibold" style={{ color: 'var(--text)' }}>
                    ⚠ Ihre Betroffenheit wurde automatisch auf Basis der Verbund-Kennzahlen (Gesamt-VZÄ / Gesamtumsatz des Verbands)
                    berechnet. Ohne die IT-Verflechtung mit dem Verbund wäre die isolierte Schwellenwertprüfung auf Ebene des
                    IT-Rechtsträgers ggf. nicht erreicht worden.
                  </p>
                )}
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Eine Nicht-Zurechnung nach § 28 Abs. 4 BSIG setzt eine nachweisbare IT-seitige Unabhängigkeit voraus
                  („rechtliche, wirtschaftliche und tatsächliche Umstände mit Blick auf die Beschaffenheit und den Betrieb der
                  informationstechnischen Systeme") — bei echter Zentral-IT für Töchter praktisch kaum zu begründen. Im Zweifel
                  juristisch prüfen lassen.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-scope warning for C and D — sector-aware */}
      {(result.outcome.type === 'C' || result.outcome.type === 'D') && (() => {
        const sector = result.jurisdiction.regulationSector;
        // MSP-only: Scope-Warnung betrifft den IT-Betrieb als Regulierungsgegenstand, nicht den "restlichen Verband"
        const isMspOnly = sector === 'digital_infrastructure';
        const isBoth = sector === 'both';

        const headline = result.outcome.type === 'D'
          ? 'Konservative Annahme: gesamter Rechtsträger fällt unter NIS-2'
          : isMspOnly
            ? 'IT-Betrieb ist Regulierungsgegenstand — Scope umfasst den gesamten MSP-Rechtsträger'
            : isBoth
              ? 'Doppelbetroffenheit: Gesundheit + Digitale Infrastruktur — gesamter Kreisverband im Scope'
              : 'Nicht nur der Rettungsdienst — der gesamte Kreisverband ist betroffen';

        const body = result.outcome.type === 'D'
          ? 'Solange die Schwellenwerte nicht belastbar geklärt und keine harte Trennung nachgewiesen ist, muss konservativ davon ausgegangen werden, dass der betroffene Rechtsträger unter NIS-2 fällt — je nach Trigger als Gesundheits- oder als Digitale-Infrastruktur-Einrichtung.'
          : isMspOnly
            ? 'Der zentrale IT-Betrieb für andere juristische Personen ist selbst die regulierte Tätigkeit (Sektor »Digitale Infrastruktur«, Anlage 1 BSIG). Eine Scope-Begrenzung durch technische Trennung ist hier nicht möglich — alle IT-Systeme und Prozesse, die dem Betrieb für Dritte dienen, müssen die NIS-2-Anforderungen erfüllen. Bei verbundenen Unternehmen sind Schwellenwerte nach KMU-Empfehlung 2003/361/EG zu prüfen.'
            : isBoth
              ? 'Ihr Verband ist zweifach betroffen: einmal über den Rettungsdienst (Sektor Gesundheit) und einmal über den zentralen IT-Betrieb für andere juristische Personen (Sektor Digitale Infrastruktur). Beide Pfade führen zur direkten Regulierung. Eine technische Trennung des Rettungsdienstes würde den MSP-Pfad nicht auflösen.'
              : 'Da keine harte technische Trennung zwischen Rettungsdienst und restlichem Verband nachgewiesen ist, erstreckt sich der NIS-2-Scope auf den gesamten DRK-Kreisverband. Alle IT-Systeme, Prozesse, Netzwerke und Zugänge des Verbands — nicht nur die des Rettungsdienstes — müssen die NIS-2-Anforderungen erfüllen.';

        return (
          <div
            className="p-4 rounded-lg border-l-4 mb-4"
            style={{ borderLeftColor: result.outcome.type === 'C' ? '#b45309' : 'var(--drk)', background: result.outcome.type === 'C' ? 'var(--warning-bg)' : 'var(--drk-bg)' }}
          >
            <div className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                   className="shrink-0 mt-0.5" style={{ color: result.outcome.type === 'C' ? '#b45309' : 'var(--drk)' }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <div className="text-sm font-bold mb-1" style={{ color: result.outcome.type === 'C' ? '#b45309' : 'var(--drk)' }}>
                  {headline}
                </div>
                <p className="text-sm" style={{ color: 'var(--text-light)' }}>{body}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Key facts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
          <div className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
            Rettungsdienst-Anbieter
            <HintIcon hint="Gibt an, ob Ihr Verband Rettungsdienst betreibt oder an einer RD-Gesellschaft beteiligt ist. Rettungsdienst ist im Gesundheitssektor eine potenziell NIS-2-relevante Tätigkeit." />
          </div>
          <div className="font-bold" style={{ color: 'var(--text)' }}>
            {result.jurisdiction.isRdProvider ? 'Ja' : 'Nein'}
          </div>
        </div>

        <div className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
          <div className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
            IT-Dienstleister (MSP)
            <HintIcon hint="Gibt an, ob Ihre Einheit operative IT-Betriebsleistungen für andere juristische Personen erbringt (Tochter-gGmbHs, andere Kreisverbände, externe Dritte). Managed Service Providers nach § 2 Nr. 26 BSIG fallen unter den Sektor »Digitale Infrastruktur« der Anlage 1 BSIG." />
          </div>
          <div className="font-bold" style={{ color: 'var(--text)' }}>
            {result.jurisdiction.isMspProvider ? 'Ja' : 'Nein'}
          </div>
        </div>

        <div className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
          <div className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
            Direkt reguliert
            <HintIcon hint="Gibt an, ob der Rechtsträger die Schwellenwerte für NIS-2 überschreitet und damit direkt reguliert wird. Für Anlage 1 BSIG: ≥ 50 VZÄ oder > 10 Mio € Umsatz UND > 10 Mio € Bilanz (wichtig) / ≥ 250 VZÄ oder > 50 Mio € Umsatz UND > 43 Mio € Bilanz (besonders wichtig)." />
          </div>
          <div className="font-bold" style={{ color: 'var(--text)' }}>
            {result.jurisdiction.directlyRegulated ? 'Ja' : 'Nein'}
          </div>
        </div>

        <div className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
          <div className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
            Einstufung
            <HintIcon hint="NIS-2 unterscheidet zwischen ›Wichtigen Einrichtungen‹ und ›Besonders wichtigen Einrichtungen‹. Die Einstufung hängt von Sektor, Größe (VZÄ) und Umsatz ab. Besonders wichtige Einrichtungen unterliegen strengeren Aufsichts- und Meldepflichten." />
          </div>
          <div className="font-bold" style={{ color: 'var(--text)' }}>
            {classificationLabel[result.jurisdiction.classification] || result.jurisdiction.classification}
          </div>
        </div>

        <div className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
          <div className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
            Triggernder Sektor
            <HintIcon hint="Zeigt, über welchen Sektor der Anlage 1/2 BSIG die Betroffenheit ausgelöst wird. Gesundheit (Rettungsdienst) und/oder Digitale Infrastruktur (Managed Services) sind möglich. Bei Doppelbetroffenheit gelten beide Pflichtenkreise." />
          </div>
          <div className="font-bold" style={{ color: 'var(--text)' }}>
            {result.jurisdiction.regulationSector === 'none' && 'Keiner'}
            {result.jurisdiction.regulationSector === 'health' && 'Gesundheit'}
            {result.jurisdiction.regulationSector === 'digital_infrastructure' && 'Digitale Infrastruktur'}
            {result.jurisdiction.regulationSector === 'both' && 'Gesundheit + Digitale Infrastruktur'}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs p-3 rounded-lg" style={{ background: 'var(--bg)', color: 'var(--text-muted)' }}>
        <strong>* Haftungsausschluss:</strong> Diese Einschätzung basiert auf den von Ihnen gemachten Angaben und einem
        regelbasierten Modell. Sie stellt keine Rechtsberatung dar und ersetzt nicht die individuelle juristische Prüfung
        durch eine qualifizierte Fachperson.
        {(result.outcome.type === 'A' || result.outcome.type === 'B') && (
          <> Auch wenn die Analyse eine geringe oder keine Betroffenheit ergibt, kann die tatsächliche Rechtslage
          abweichen — insbesondere bei komplexen Verbandsstrukturen oder wenn sich regulatorische Rahmenbedingungen
          ändern. Eine abschließende Bewertung sollte stets unter Einbeziehung juristischer Expertise erfolgen.</>
        )}
      </div>
    </div>
  );
}

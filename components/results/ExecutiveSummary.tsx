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
        aria-label="Erklärung"
      >
        ?
      </button>
      {show && (
        <span
          className="absolute left-1/2 -translate-x-1/2 top-6 z-10 w-64 p-2 rounded-lg text-xs font-normal shadow-lg"
          style={{ background: 'var(--bg-card)', color: 'var(--text-light)', border: '1px solid var(--border)' }}
        >
          {hint}
          <button
            type="button"
            onClick={() => setShow(false)}
            className="block mt-1 text-[10px] font-semibold underline"
            style={{ color: 'var(--text-muted)' }}
          >
            Schließen
          </button>
        </span>
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
      <div className="flex items-center gap-4 mb-4 p-4 rounded-xl" style={{ background: outcomeBg }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold shrink-0"
          style={{ background: outcomeColor, color: '#fff' }}
        >
          {result.outcome.type}
        </div>
        <div>
          <div className="font-bold text-lg" style={{ color: outcomeColor }}>
            Ergebnis {result.outcome.type}*
          </div>
          <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
            {result.outcome.label}
          </div>
          <div className="text-sm mt-1" style={{ color: 'var(--text-light)' }}>
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

      {/* Key facts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
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
            Direkt reguliert
            <HintIcon hint="Gibt an, ob der Verband selbst (nicht nur eine Tochtergesellschaft) die Schwellenwerte für NIS-2 überschreitet und damit direkt reguliert wird. Bei gemischten Strukturen kann auch nur die Tochtergesellschaft reguliert sein." />
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

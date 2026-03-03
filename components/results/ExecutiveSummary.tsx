'use client';

import type { AssessmentResult } from '@/lib/types';
import { getOutcomeColor, getOutcomeBgColor } from '@/lib/report';

interface ExecutiveSummaryProps {
  result: AssessmentResult;
}

export default function ExecutiveSummary({ result }: ExecutiveSummaryProps) {
  const outcomeColor = getOutcomeColor(result.outcome.type);
  const outcomeBg = getOutcomeBgColor(result.outcome.type);

  const classificationLabel: Record<string, string> = {
    none: 'Keine',
    important: 'Wichtige Einrichtung',
    especially_important: 'Besonders wichtige Einrichtung',
  };

  return (
    <div className="drk-card drk-fade-in">
      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>
        Executive Summary
      </h2>

      {/* Outcome Badge */}
      <div className="flex items-center gap-4 mb-6 p-4 rounded-xl" style={{ background: outcomeBg }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold shrink-0"
          style={{ background: outcomeColor, color: '#fff' }}
        >
          {result.outcome.type}
        </div>
        <div>
          <div className="font-bold text-lg" style={{ color: outcomeColor }}>
            Ergebnis {result.outcome.type}
          </div>
          <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
            {result.outcome.label}
          </div>
          <div className="text-sm mt-1" style={{ color: 'var(--text-light)' }}>
            {result.outcome.summary}
          </div>
        </div>
      </div>

      {/* Key facts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
          <div className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
            Rettungsdienst-Anbieter
          </div>
          <div className="font-bold" style={{ color: 'var(--text)' }}>
            {result.jurisdiction.isRdProvider ? 'Ja' : 'Nein'}
          </div>
        </div>

        <div className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
          <div className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
            Direkt reguliert
          </div>
          <div className="font-bold" style={{ color: 'var(--text)' }}>
            {result.jurisdiction.directlyRegulated ? 'Ja' : 'Nein'}
          </div>
        </div>

        <div className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
          <div className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
            Einstufung
          </div>
          <div className="font-bold" style={{ color: 'var(--text)' }}>
            {classificationLabel[result.jurisdiction.classification] || result.jurisdiction.classification}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { AssessmentResult, WizardAnswers } from '@/lib/types';
import ExecutiveSummary from '@/components/results/ExecutiveSummary';
import ScopeCards from '@/components/results/ScopeCards';
import MaturityBadge from '@/components/results/MaturityBadge';
import TopRisks from '@/components/results/TopRisks';
import TriggeredRulesList from '@/components/results/TriggeredRulesList';
import RoadmapView from '@/components/results/RoadmapView';
import ExportActions from '@/components/results/ExportActions';

export default function ErgebnisPage() {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const resultRaw = localStorage.getItem('nis2-audit-result');
      const answersRaw = localStorage.getItem('nis2-audit-answers');
      if (resultRaw) {
        setResult(JSON.parse(resultRaw));
      }
      if (answersRaw) {
        setAnswers(JSON.parse(answersRaw));
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] flex items-center justify-center">
        <div style={{ color: 'var(--text-muted)' }}>Laden...</div>
      </div>
    );
  }

  if (!result) {
    return (
      <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="drk-card text-center drk-fade-in">
            <div className="text-4xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                   style={{ color: 'var(--text-muted)', margin: '0 auto' }}>
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              Keine Auswertungsdaten vorhanden
            </h2>
            <p className="mb-6" style={{ color: 'var(--text-light)' }}>
              Bitte führen Sie zuerst den Self-Check durch.
            </p>
            <Link href="/check" className="drk-btn-primary">
              Self-Check starten
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Print header (only visible in print) */}
        <div className="hidden print:block mb-6">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--drk)' }}>NIS-2 Audit – Ergebnis</h1>
          <p className="text-sm" style={{ color: 'var(--text-light)' }}>
            DRK Kreisverband StädteRegion Aachen e.V.
          </p>
        </div>

        <ExecutiveSummary result={result} />
        <ScopeCards result={result} />
        <MaturityBadge maturity={result.maturitySummary} />
        <TopRisks risks={result.topRisks} />
        <TriggeredRulesList rules={result.triggeredRules} />
        <RoadmapView roadmap={result.roadmap} />
        <ExportActions result={result} answers={answers} />

        {/* Review flags */}
        {result.reviewFlags.length > 0 && (
          <div className="drk-card drk-fade-in no-print">
            <h3 className="font-bold mb-3" style={{ color: 'var(--text)' }}>Review-Flags</h3>
            <div className="space-y-2">
              {result.reviewFlags.map((flag) => (
                <div
                  key={flag.id}
                  className="p-3 rounded-lg border-l-4"
                  style={{
                    borderLeftColor: flag.severity === 'high' ? 'var(--drk)' : flag.severity === 'medium' ? 'var(--warning)' : 'var(--info)',
                    background: 'var(--bg)',
                  }}
                >
                  <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                    {flag.title.de}
                  </div>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {flag.description.de}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

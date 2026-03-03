'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { AssessmentResult, WizardAnswers, Grunddaten } from '@/lib/types';
import { buildRoadmap } from '@/lib/roadmap/build-roadmap';
import ExecutiveSummary from '@/components/results/ExecutiveSummary';
import RegistrationCallout from '@/components/results/RegistrationCallout';
import ScopeCards from '@/components/results/ScopeCards';
import MaturityBadge from '@/components/results/MaturityBadge';
import TriggeredRulesList from '@/components/results/TriggeredRulesList';
import RoadmapView from '@/components/results/RoadmapView';
import LayeredRoadmapView from '@/components/results/LayeredRoadmapView';
import OpenItems from '@/components/results/OpenItems';
import ExportActions from '@/components/results/ExportActions';

export default function ErgebnisPage() {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [grunddaten, setGrunddaten] = useState<Grunddaten>({ kreisverband: '', adresse: '', vorstand: '' });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const resultRaw = localStorage.getItem('nis2-audit-result');
      const answersRaw = localStorage.getItem('nis2-audit-answers');
      const grunddatenRaw = localStorage.getItem('nis2-audit-grunddaten');
      if (resultRaw) {
        setResult(JSON.parse(resultRaw));
      }
      if (answersRaw) {
        setAnswers(JSON.parse(answersRaw));
      }
      if (grunddatenRaw) {
        setGrunddaten(JSON.parse(grunddatenRaw));
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
        {/* Print header */}
        <div className="hidden print:block mb-6">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--drk)' }}>NIS-2 Audit – Ergebnis</h1>
          <p className="text-sm" style={{ color: 'var(--text-light)' }}>
            {grunddaten.kreisverband || 'DRK Kreisverband'} · Regelwerk v1.0 · {new Date().toLocaleDateString('de-DE')}
          </p>
          {grunddaten.adresse && (
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{grunddaten.adresse}</p>
          )}
          {grunddaten.vorstand && (
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Verantwortlich: {grunddaten.vorstand}</p>
          )}
        </div>

        {/* Report header (on-screen) */}
        <div className="drk-card drk-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold" style={{ color: 'var(--text)' }}>
                {grunddaten.kreisverband || 'DRK Kreisverband'}
              </h2>
              {grunddaten.adresse && (
                <p className="text-sm" style={{ color: 'var(--text-light)' }}>{grunddaten.adresse}</p>
              )}
              {grunddaten.vorstand && (
                <p className="text-sm" style={{ color: 'var(--text-light)' }}>
                  Verantwortlich: {grunddaten.vorstand}
                </p>
              )}
            </div>
            <div className="sm:text-right shrink-0">
              <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                {new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Regelwerk v1.0
              </div>
            </div>
          </div>
        </div>

        <ExecutiveSummary result={result} />
        <RegistrationCallout registration={result.registration} outcomeType={result.outcome.type} />
        <ScopeCards result={result} />
        <MaturityBadge scoring={result.scoring} />
        <TriggeredRulesList rules={result.triggeredRules} />
        <LayeredRoadmapView roadmap={buildRoadmap(result.outcome.type, result.sizingType)} />
        <RoadmapView result={result} answers={answers} />
        <OpenItems answers={answers} />

        {/* Signature line — print only */}
        <div className="hidden print:block drk-card" style={{ pageBreakInside: 'avoid' }}>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                Datum
              </div>
              <div className="text-sm mb-6" style={{ color: 'var(--text)' }}>
                {new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </div>
              <div style={{ borderBottom: '1px solid var(--text-muted)', width: '100%', marginBottom: '4px' }} />
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Ort, Datum</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                Verantwortlich
              </div>
              <div className="text-sm mb-6" style={{ color: 'var(--text)' }}>
                {grunddaten.vorstand || '—'}
              </div>
              <div style={{ borderBottom: '1px solid var(--text-muted)', width: '100%', marginBottom: '4px' }} />
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Unterschrift</div>
            </div>
          </div>
        </div>

        <ExportActions result={result} answers={answers} />
      </div>
    </div>
  );
}

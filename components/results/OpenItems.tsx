'use client';

import type { WizardAnswers, RulesetQuestion } from '@/lib/types';
import { getRulesetQuestions } from '@/lib/rules/evaluate';

interface OpenItemsProps {
  answers: WizardAnswers;
}

export function collectUnknownAnswers(answers: WizardAnswers): Array<{ questionId: string; label: string; section: string }> {
  const questions = getRulesetQuestions() as RulesetQuestion[];
  const unknowns: Array<{ questionId: string; label: string; section: string }> = [];

  for (const q of questions) {
    if (answers[q.id] === 'unknown') {
      unknowns.push({ questionId: q.id, label: q.label, section: q.section });
    }
  }

  return unknowns;
}

const SECTION_LABELS: Record<string, string> = {
  it: 'IT-Struktur',
  separation: 'Harte Trennung',
  security: 'Sicherheitsreife',
};

export default function OpenItems({ answers }: OpenItemsProps) {
  const unknowns = collectUnknownAnswers(answers);

  if (unknowns.length === 0) return null;

  return (
    <div className="drk-card drk-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             style={{ color: 'var(--warning)' }}>
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
        <h3 className="font-bold" style={{ color: 'var(--text)' }}>
          Offene Punkte – Noch zu klären
        </h3>
      </div>
      <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
        {unknowns.length} Frage{unknowns.length !== 1 ? 'n' : ''} wurde{unknowns.length !== 1 ? 'n' : ''} mit
        „Nicht bekannt" beantwortet. Eine Klärung dieser Punkte kann die Bewertung verbessern.
      </p>
      <div className="space-y-2">
        {unknowns.map((item) => (
          <div
            key={item.questionId}
            className="flex items-start gap-3 p-3 rounded-lg"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
          >
            <div
              className="w-5 h-5 mt-0.5 shrink-0 rounded border-2 flex items-center justify-center"
              style={{ borderColor: 'var(--text-muted)' }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded"
                      style={{ background: 'var(--warning-bg)', color: '#b45309' }}>
                  {item.questionId}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {SECTION_LABELS[item.section] || item.section}
                </span>
              </div>
              <p className="text-sm mt-1" style={{ color: 'var(--text)' }}>
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-lg text-sm" style={{ background: 'var(--info-bg)', color: 'var(--info)' }}>
        Tipp: Leiten Sie diese Liste an die zuständige Fachabteilung weiter.
        Nach Klärung können Sie den Self-Check erneut durchführen, um die Bewertung zu aktualisieren.
      </div>
    </div>
  );
}

'use client';

import type { AssessmentResult, WizardAnswers } from '@/lib/types';

interface RoadmapViewProps {
  result: AssessmentResult;
  answers?: WizardAnswers;
}

const PACK_COLORS: Record<string, string> = {
  P1_GOV_REG: 'var(--drk)',
  P2_IAM_ADMIN: 'var(--info)',
  P3_BACKUP_DR: 'var(--warning)',
  P4_NETWORK_SEG: 'var(--info)',
  P5_INCIDENT_REPORT: 'var(--drk)',
  P6_SUPPLY_CHAIN: '#b45309',
  P7_DOC_AUDIT: 'var(--success)',
};

// Welche Fragen müssen erfüllt sein, damit ein Pack als erledigt gilt
const PACK_FULFILLMENT: Record<string, Array<{ questionId: string; fulfilledValues: string[] }>> = {
  P1_GOV_REG: [
    { questionId: 'SEC-01', fulfilledValues: ['yes'] },
    { questionId: 'SEC-02', fulfilledValues: ['yes'] },
  ],
  P2_IAM_ADMIN: [
    { questionId: 'SEC-04', fulfilledValues: ['yes'] },
    { questionId: 'SEC-05', fulfilledValues: ['yes'] },
  ],
  P3_BACKUP_DR: [
    { questionId: 'SEC-07', fulfilledValues: ['yes'] },
    { questionId: 'SEC-10', fulfilledValues: ['yes'] },
  ],
  P4_NETWORK_SEG: [
    { questionId: 'SEC-06', fulfilledValues: ['yes'] },
    { questionId: 'IT-05', fulfilledValues: ['clean'] },
  ],
  P5_INCIDENT_REPORT: [
    { questionId: 'SEC-08', fulfilledValues: ['yes'] },
    { questionId: 'SEC-09', fulfilledValues: ['yes'] },
  ],
  P6_SUPPLY_CHAIN: [
    { questionId: 'SEC-11', fulfilledValues: ['yes'] },
  ],
  P7_DOC_AUDIT: [
    { questionId: 'SEC-03', fulfilledValues: ['yes'] },
    { questionId: 'SEC-12', fulfilledValues: ['yes'] },
  ],
};

function checkFulfillment(packId: string, answers: WizardAnswers): { fulfilled: boolean; met: number; total: number } {
  const criteria = PACK_FULFILLMENT[packId];
  if (!criteria || criteria.length === 0) return { fulfilled: false, met: 0, total: 0 };

  let met = 0;
  for (const c of criteria) {
    const answer = answers[c.questionId];
    if (typeof answer === 'string' && c.fulfilledValues.includes(answer)) {
      met++;
    }
  }

  return { fulfilled: met === criteria.length, met, total: criteria.length };
}

export default function RoadmapView({ result, answers }: RoadmapViewProps) {
  const { registration } = result;
  const hasRoadmapItems = result.roadmapItems.length > 0;
  const showSchritt0 = registration.required || registration.recommended;

  if (!hasRoadmapItems && !showSchritt0) return null;

  return (
    <div className="drk-card drk-fade-in">
      <h3 className="font-bold mb-4" style={{ color: 'var(--text)' }}>
        90-Tage-Roadmap
      </h3>
      <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
        {showSchritt0 && 'Beginnen Sie mit Schritt 0 (BSI-Registrierung) vor Tag 1. '}
        {hasRoadmapItems && `${result.roadmapPacks.length} Maßnahmenpakete basierend auf Ihrem Ergebnis und Reifegrad.`}
      </p>
      <div className="space-y-4">
        {/* Schritt 0 – BSI-Registrierung */}
        {showSchritt0 && (
          <div
            className="p-4 rounded-lg border-l-4"
            style={{
              background: registration.required ? 'var(--drk-bg)' : 'var(--warning-bg)',
              borderLeftColor: registration.required ? 'var(--drk)' : '#b45309',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                style={{
                  background: registration.required ? 'var(--drk)' : '#b45309',
                  color: '#fff',
                }}
              >
                SCHRITT 0
              </span>
              <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                BSI-Registrierung — Sofort / vor Tag 1
              </span>
            </div>
            <ul className="space-y-1 ml-4">
              <li className="text-sm flex items-start gap-2" style={{ color: 'var(--text-light)' }}>
                <span style={{ color: 'var(--drk)' }}>•</span>
                Schwellenwerte finalisieren (VZÄ / Finanzen) — falls unklar
              </li>
              <li className="text-sm flex items-start gap-2" style={{ color: 'var(--text-light)' }}>
                <span style={{ color: 'var(--drk)' }}>•</span>
                Registrierung / Angaben vorbereiten und über das BSI-Portal einreichen
              </li>
              <li className="text-sm flex items-start gap-2" style={{ color: 'var(--text-light)' }}>
                <span style={{ color: 'var(--drk)' }}>•</span>
                Interne Zuständigkeit und Kontaktadresse festlegen
              </li>
            </ul>
            <div className="mt-3">
              <a
                href={registration.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold underline"
                style={{ color: registration.required ? 'var(--drk)' : '#b45309' }}
              >
                BSI-Registrierungsanleitung →
              </a>
            </div>
          </div>
        )}

        {/* Regular roadmap packs */}
        {result.roadmapItems.map((pack) => {
          const color = PACK_COLORS[pack.packId] || 'var(--text)';
          const status = answers ? checkFulfillment(pack.packId, answers) : null;
          const isFulfilled = status?.fulfilled ?? false;
          const hasProgress = status && status.total > 0 && status.met > 0 && !isFulfilled;

          return (
            <div
              key={pack.packId}
              className="p-4 rounded-lg"
              style={{
                background: isFulfilled ? 'var(--success-bg)' : 'var(--bg)',
                border: isFulfilled ? '1px solid var(--success)' : 'none',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                  style={{
                    background: isFulfilled ? 'var(--success-bg)' : 'var(--drk-bg)',
                    color: isFulfilled ? 'var(--success)' : color,
                  }}
                >
                  {pack.packId}
                </span>
                <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                  {pack.title}
                </span>
                {isFulfilled && (
                  <span
                    className="ml-auto flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--success-bg)', color: 'var(--success)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Erfüllt
                  </span>
                )}
                {hasProgress && (
                  <span
                    className="ml-auto text-xs px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--warning-bg)', color: '#b45309' }}
                  >
                    {status.met}/{status.total} Kriterien
                  </span>
                )}
              </div>
              <ul className="space-y-1 ml-4">
                {pack.items.map((item, i) => (
                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: isFulfilled ? 'var(--text-muted)' : 'var(--text-light)' }}>
                    <span style={{ color: isFulfilled ? 'var(--success)' : color }}>
                      {isFulfilled ? '✓' : '•'}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

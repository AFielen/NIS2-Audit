'use client';

import type { ScoringResult } from '@/lib/types';

interface MaturityBadgeProps {
  scoring: ScoringResult;
}

const BAND_COLORS: Record<string, { bg: string; color: string }> = {
  kritisch: { bg: 'var(--drk-bg)', color: 'var(--drk)' },
  basal: { bg: 'var(--warning-bg)', color: '#b45309' },
  belastbar: { bg: 'var(--info-bg)', color: 'var(--info)' },
  fortgeschritten: { bg: 'var(--success-bg)', color: 'var(--success)' },
};

const BAND_LABELS: Record<string, string> = {
  kritisch: 'Kritisch',
  basal: 'Basal',
  belastbar: 'Belastbar',
  fortgeschritten: 'Fortgeschritten',
};

export default function MaturityBadge({ scoring }: MaturityBadgeProps) {
  const colors = BAND_COLORS[scoring.bandLabel] ?? BAND_COLORS.kritisch;
  const pct = Math.round((scoring.totalPoints / scoring.maxPoints) * 100);

  return (
    <div className="drk-card drk-fade-in">
      <h3 className="font-bold mb-4" style={{ color: 'var(--text)' }}>
        Sicherheitsreifegrad
      </h3>

      <div className="flex items-center gap-4 mb-4">
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color: colors.color }}>
            {scoring.totalPoints}
          </div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            / {scoring.maxPoints}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-3 py-1 rounded-full text-sm font-semibold"
              style={{ background: colors.bg, color: colors.color }}
            >
              {BAND_LABELS[scoring.bandLabel] || scoring.bandLabel}
            </span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ background: 'var(--border)' }}>
            <div
              className="h-2 rounded-full transition-all"
              style={{ width: `${pct}%`, background: colors.color }}
            />
          </div>
        </div>
      </div>

      {scoring.gaps.length > 0 && (
        <div>
          <div className="text-sm font-semibold mb-2" style={{ color: 'var(--text-light)' }}>
            Lücken:
          </div>
          <div className="flex flex-wrap gap-2">
            {scoring.gaps.map(gap => (
              <span
                key={gap}
                className="text-xs px-2 py-1 rounded-full"
                style={{ background: 'var(--drk-bg)', color: 'var(--drk)' }}
              >
                {gap}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

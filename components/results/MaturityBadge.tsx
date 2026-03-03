'use client';

import type { MaturitySummary, Locale, MaturityBand } from '@/lib/types';
import { getControlLabel } from '@/lib/scoring';

interface MaturityBadgeProps {
  maturity: MaturitySummary;
  locale?: Locale;
}

const BAND_COLORS: Record<MaturityBand, { bg: string; color: string }> = {
  kritisch: { bg: 'var(--drk-bg)', color: 'var(--drk)' },
  basal: { bg: 'var(--warning-bg)', color: '#b45309' },
  belastbar: { bg: 'var(--info-bg)', color: 'var(--info)' },
  fortgeschritten: { bg: 'var(--success-bg)', color: 'var(--success)' },
};

const BAND_LABELS: Record<MaturityBand, { de: string; en: string }> = {
  kritisch: { de: 'Kritisch', en: 'Critical' },
  basal: { de: 'Basal', en: 'Basic' },
  belastbar: { de: 'Belastbar', en: 'Solid' },
  fortgeschritten: { de: 'Fortgeschritten', en: 'Advanced' },
};

export default function MaturityBadge({ maturity, locale = 'de' }: MaturityBadgeProps) {
  const { bg, color } = BAND_COLORS[maturity.band];
  const pct = Math.round((maturity.score / maturity.maxScore) * 100);

  return (
    <div className="drk-card drk-fade-in">
      <h3 className="font-bold mb-4" style={{ color: 'var(--text)' }}>
        {locale === 'de' ? 'Sicherheitsreifegrad' : 'Security Maturity'}
      </h3>

      <div className="flex items-center gap-4 mb-4">
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color }}>
            {maturity.score}
          </div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            / {maturity.maxScore}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-3 py-1 rounded-full text-sm font-semibold"
              style={{ background: bg, color }}
            >
              {BAND_LABELS[maturity.band][locale]}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 rounded-full" style={{ background: 'var(--border)' }}>
            <div
              className="h-2 rounded-full transition-all"
              style={{ width: `${pct}%`, background: color }}
            />
          </div>
        </div>
      </div>

      {/* Gaps */}
      {maturity.gaps.length > 0 && (
        <div>
          <div className="text-sm font-semibold mb-2" style={{ color: 'var(--text-light)' }}>
            {locale === 'de' ? 'Lücken:' : 'Gaps:'}
          </div>
          <div className="flex flex-wrap gap-2">
            {maturity.gaps.map(gap => (
              <span
                key={gap}
                className="text-xs px-2 py-1 rounded-full"
                style={{ background: 'var(--drk-bg)', color: 'var(--drk)' }}
              >
                {getControlLabel(gap)[locale]}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

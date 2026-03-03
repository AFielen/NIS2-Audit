'use client';

import type { RiskEntry, Locale } from '@/lib/types';

interface TopRisksProps {
  risks: RiskEntry[];
  locale?: Locale;
}

export default function TopRisks({ risks, locale = 'de' }: TopRisksProps) {
  if (risks.length === 0) return null;

  return (
    <div className="drk-card drk-fade-in">
      <h3 className="font-bold mb-4" style={{ color: 'var(--text)' }}>
        {locale === 'de' ? 'Top-Risiken' : 'Top Risks'}
      </h3>
      <div className="space-y-3">
        {risks.map((risk, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
              style={{ background: 'var(--drk-bg)', color: 'var(--drk)' }}
            >
              {index + 1}
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                {risk.title[locale]}
              </div>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {risk.description[locale]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

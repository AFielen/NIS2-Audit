'use client';

import type { RoadmapPhase, Locale } from '@/lib/types';

interface RoadmapViewProps {
  roadmap: RoadmapPhase[];
  locale?: Locale;
}

const PHASE_COLORS = ['var(--drk)', 'var(--warning)', 'var(--info)'];
const PHASE_BG = ['var(--drk-bg)', 'var(--warning-bg)', 'var(--info-bg)'];

export default function RoadmapView({ roadmap, locale = 'de' }: RoadmapViewProps) {
  return (
    <div className="drk-card drk-fade-in">
      <h3 className="font-bold mb-4" style={{ color: 'var(--text)' }}>
        {locale === 'de' ? '90-Tage-Roadmap' : '90-Day Roadmap'}
      </h3>
      <div className="space-y-6">
        {roadmap.map((phase, phaseIndex) => {
          if (phase.packs.length === 0) return null;
          return (
            <div key={phaseIndex}>
              {/* Phase header */}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="px-3 py-1 rounded-full text-sm font-bold"
                  style={{ background: PHASE_BG[phaseIndex], color: PHASE_COLORS[phaseIndex] }}
                >
                  {phase.label[locale]}
                </div>
              </div>
              {/* Pack cards */}
              <div className="space-y-2 ml-2 pl-4" style={{ borderLeft: `3px solid ${PHASE_COLORS[phaseIndex]}` }}>
                {phase.packs.map((pack) => (
                  <div key={pack.id} className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                        style={{ background: PHASE_BG[phaseIndex], color: PHASE_COLORS[phaseIndex] }}
                      >
                        {pack.id}
                      </span>
                      <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                        {pack.title[locale]}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-light)' }}>
                      {pack.content[locale]}
                    </p>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                      {locale === 'de' ? 'Verantwortlich' : 'Owner'}: {pack.owner[locale]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

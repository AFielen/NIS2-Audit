'use client';

import type { AssessmentResult } from '@/lib/types';

interface RoadmapViewProps {
  result: AssessmentResult;
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

export default function RoadmapView({ result }: RoadmapViewProps) {
  if (result.roadmapItems.length === 0) return null;

  return (
    <div className="drk-card drk-fade-in">
      <h3 className="font-bold mb-4" style={{ color: 'var(--text)' }}>
        90-Tage-Roadmap
      </h3>
      <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
        {result.roadmapPacks.length} Maßnahmenpakete basierend auf Ihrem Ergebnis und Reifegrad.
      </p>
      <div className="space-y-4">
        {result.roadmapItems.map((pack) => {
          const color = PACK_COLORS[pack.packId] || 'var(--text)';
          return (
            <div key={pack.packId} className="p-4 rounded-lg" style={{ background: 'var(--bg)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                  style={{ background: 'var(--drk-bg)', color }}
                >
                  {pack.packId}
                </span>
                <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                  {pack.title}
                </span>
              </div>
              <ul className="space-y-1 ml-4">
                {pack.items.map((item, i) => (
                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-light)' }}>
                    <span style={{ color }}>•</span>
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

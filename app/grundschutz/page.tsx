'use client';

import Link from 'next/link';
import { grundschutz10 } from '@/lib/roadmap/grundschutz10';
import type { RoadmapItem } from '@/lib/roadmap/types';

const PRIORITY_STYLES: Record<RoadmapItem['priority'], { bg: string; text: string; label: string }> = {
  hoch: { bg: 'var(--drk-bg)', text: 'var(--drk)', label: 'Hoch' },
  mittel: { bg: '#fff7ed', text: '#b45309', label: 'Mittel' },
  niedrig: { bg: '#f0fdf4', text: 'var(--success)', label: 'Niedrig' },
};

export default function GrundschutzPage() {
  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="drk-card drk-fade-in">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            Grundschutz-10
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
            10 Kernmaßnahmen, die jeder NIS-2-betroffene Kreisverband unabhängig von der Größe umsetzen sollte.
            Diese Maßnahmen bilden das Fundament für die NIS-2-Compliance und sollten vor oder parallel zur
            90-Tage-Roadmap angegangen werden.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/check" className="drk-btn-primary text-sm">
              Self-Check starten
            </Link>
            <Link href="/ergebnis" className="drk-btn-secondary text-sm">
              Zum Ergebnis
            </Link>
          </div>
        </div>

        {/* Maßnahmen */}
        <div className="space-y-3">
          {grundschutz10.items.map((item, i) => {
            const ps = PRIORITY_STYLES[item.priority];
            return (
              <div key={i} className="drk-card drk-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-start gap-4">
                  {/* Number badge */}
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                    style={{ background: 'var(--drk)', color: '#fff' }}
                  >
                    {i + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold" style={{ color: 'var(--text)' }}>
                        {item.title.replace(/^\d+\.\s*/, '')}
                      </h3>
                      <span
                        className="shrink-0 text-xs font-bold px-2 py-0.5 rounded"
                        style={{ background: ps.bg, color: ps.text }}
                      >
                        {ps.label}
                      </span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: 'var(--text-light)' }}>
                      {item.description}
                    </p>
                    <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                      Verantwortlich: {item.owner}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="drk-card text-center drk-fade-in">
          <p className="text-sm" style={{ color: 'var(--text-light)' }}>
            Diese 10 Maßnahmen sind ein Startpunkt. Für eine vollständige, auf Ihren Kreisverband zugeschnittene
            Roadmap führen Sie den{' '}
            <Link href="/check" className="font-semibold underline" style={{ color: 'var(--drk)' }}>
              NIS-2 Self-Check
            </Link>{' '}
            durch.
          </p>
        </div>
      </div>
    </div>
  );
}

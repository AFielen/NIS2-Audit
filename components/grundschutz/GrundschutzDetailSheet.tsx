'use client';

import { useEffect, useRef } from 'react';
import type { GrundschutzDetail } from '@/lib/content/grundschutz-details';

const PRIORITY_STYLES: Record<GrundschutzDetail['priority'], { bg: string; text: string; label: string }> = {
  hoch: { bg: 'var(--drk-bg)', text: 'var(--drk)', label: 'Hoch' },
  mittel: { bg: '#fff7ed', text: '#b45309', label: 'Mittel' },
  niedrig: { bg: '#f0fdf4', text: 'var(--success)', label: 'Niedrig' },
};

interface GrundschutzDetailSheetProps {
  detail: GrundschutzDetail | null;
  onClose: () => void;
  onNext?: () => void;
  hasNext?: boolean;
}

export default function GrundschutzDetailSheet({ detail, onClose, onNext, hasNext }: GrundschutzDetailSheetProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (!detail) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [detail]);

  // Escape key
  useEffect(() => {
    if (!detail) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [detail, onClose]);

  // Scroll to top when detail changes
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [detail?.id]);

  if (!detail) return null;

  const ps = PRIORITY_STYLES[detail.priority];

  return (
    <div className="no-print">
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[50] drk-backdrop-enter"
        style={{ background: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      />

      {/* Sheet container */}
      <div className="fixed inset-0 z-[51] flex items-end sm:items-center sm:justify-center pointer-events-none">
        <div
          ref={contentRef}
          className="pointer-events-auto w-full sm:max-w-2xl sm:mx-4 max-h-[90vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl overflow-y-auto overscroll-contain drk-sheet-enter"
          style={{ background: 'var(--bg-card)' }}
        >
          {/* Drag handle (mobile) */}
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full" style={{ background: 'var(--border)' }} />
          </div>

          {/* Header */}
          <div
            className="sticky top-0 z-10 px-6 pt-4 pb-3 border-b"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: 'var(--drk)', color: '#fff' }}
                  >
                    {detail.id}
                  </span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ background: ps.bg, color: ps.text }}
                  >
                    {ps.label}
                  </span>
                </div>
                <h2 className="text-lg font-bold leading-tight" style={{ color: 'var(--text)' }}>
                  {detail.title}
                </h2>
                <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  Verantwortlich: {detail.owner}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Schließen"
                className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full hover:bg-black/5 transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-5">
            <Section label="Warum ist das wichtig?">
              <p className="text-sm" style={{ color: 'var(--text-light)' }}>{detail.whyItMatters}</p>
            </Section>

            <Section label="Was sollte die Geschäftsführung jetzt tun?">
              <p className="text-sm" style={{ color: 'var(--text-light)' }}>{detail.managementAction}</p>
            </Section>

            <Section label="Praktische Schritte">
              <ol className="space-y-2 ml-0">
                {detail.practicalSteps.map((step, i) => (
                  <li key={i} className="text-sm flex items-start gap-3" style={{ color: 'var(--text-light)' }}>
                    <span
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{ background: 'var(--bg)', color: 'var(--text-muted)' }}
                    >
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Section>

            <Section label="Einfachste praktikable Umsetzung">
              <div className="text-sm p-3 rounded-lg" style={{ background: 'var(--success-bg)', color: 'var(--text-light)' }}>
                {detail.simpleImplementation}
              </div>
            </Section>

            <Section label="Woran erkenne ich, dass es erledigt ist?">
              <p className="text-sm" style={{ color: 'var(--text-light)' }}>{detail.doneWhen}</p>
            </Section>

            <Section label="Welche Nachweise sollte ich mir geben lassen?">
              <ul className="space-y-1">
                {detail.evidence.map((item, i) => (
                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-light)' }}>
                    <svg className="shrink-0 mt-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--success)' }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Typischer Fehler — Warn-Box */}
            <div className="p-3 rounded-lg" style={{ background: 'var(--warning-bg)', borderLeft: '3px solid #b45309' }}>
              <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#b45309' }}>
                Typischer Fehler
              </div>
              <p className="text-sm" style={{ color: '#92400e' }}>{detail.commonMistake}</p>
            </div>

            <Section label="Management-Aufwand">
              <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{detail.managementEffort}</p>
            </Section>
          </div>

          {/* Footer CTAs */}
          <div
            className="sticky bottom-0 px-6 py-4 border-t flex gap-3"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <button className="drk-btn-primary flex-1" onClick={onClose}>
              Verstanden
            </button>
            {hasNext && onNext && (
              <button className="drk-btn-secondary flex-1" onClick={onNext}>
                Nächster Punkt
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>
        {label}
      </h3>
      {children}
    </div>
  );
}

'use client';

import type { VorstandBriefing } from '@/lib/types';

function formatEUR(value: number): string {
  return value.toLocaleString('de-DE') + ' EUR';
}

interface VorstandBriefingProps {
  briefing: VorstandBriefing;
  qrSvg?: string;
}

export default function VorstandBriefingView({ briefing, qrSvg }: VorstandBriefingProps) {
  return (
    <div className="briefing-content">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3" style={{ borderBottom: '2px solid var(--drk)' }}>
        <img src="/logo.png" alt="DRK Logo" width={36} height={36} className="print:block" />
        <div>
          <h1 className="text-lg font-bold" style={{ color: 'var(--drk)' }}>NIS-2 Lagebericht</h1>
          <div className="text-sm" style={{ color: 'var(--text-light)' }}>
            {briefing.kvName} · Stand {briefing.datum}
          </div>
        </div>
      </div>

      {/* Betroffenheit */}
      <div className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
          Betroffenheit
        </h2>
        <div className="flex items-start gap-2">
          <span className="inline-block w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: 'var(--drk)' }} />
          <div>
            <span className="font-bold" style={{ color: 'var(--text)' }}>{briefing.betroffenheitLabel}</span>
            <span className="text-sm" style={{ color: 'var(--text-light)' }}> — {briefing.betroffenheitGrund}</span>
          </div>
        </div>
        <div className="text-sm mt-1" style={{ color: 'var(--text-light)' }}>
          Einstufung: <strong style={{ color: 'var(--text)' }}>{briefing.einstufung}</strong>
        </div>
      </div>

      {/* Pflichten + Haftung */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
            Offene Pflichten
          </h2>
          <div className="space-y-1.5">
            {briefing.pflichten.map((p, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span style={{ color: 'var(--drk)' }} className="font-bold shrink-0">✗</span>
                <div>
                  <span style={{ color: 'var(--text)' }}>{p.titel}</span>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {p.frist && `${p.frist} · `}{p.paragraph}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
            Haftung
          </h2>
          <div className="p-3 rounded-lg text-sm" style={{ background: 'var(--drk-bg)', color: 'var(--text)' }}>
            <div className="font-bold mb-1" style={{ color: 'var(--drk)' }}>Persönliche Haftung</div>
            <p className="text-xs mb-2">{briefing.haftungText}</p>
            <p className="text-xs font-semibold">{briefing.busseldText}</p>
          </div>
        </div>
      </div>

      {/* Kosten */}
      <div className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
          Kosten (Orientierung)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Einmalig</div>
            <div className="font-bold text-sm" style={{ color: 'var(--text)' }}>
              {formatEUR(briefing.kostenEinmaligMin)}–{formatEUR(briefing.kostenEinmaligMax)}
            </div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Laufend / Jahr</div>
            <div className="font-bold text-sm" style={{ color: 'var(--text)' }}>
              {formatEUR(briefing.kostenJaehrlichMin)}–{formatEUR(briefing.kostenJaehrlichMax)}
            </div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: 'var(--drk-bg)', border: '1px solid var(--border)' }}>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Ransomware-Schaden Ø</div>
            <div className="font-bold text-sm" style={{ color: 'var(--drk)' }}>2–23 Mio. EUR</div>
          </div>
        </div>
        <div className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
          Diese Werte sind eine grobe Orientierung. Eine detaillierte Aufschlüsselung nach §30-Maßnahmen — unter Berücksichtigung bereits umgesetzter Maßnahmen — finden Sie im Kostenrechner unter {briefing.toolUrl}/kosten
        </div>
      </div>

      {/* Nächste Schritte */}
      <div className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
          Nächste Schritte
        </h2>
        <div className="space-y-2">
          {briefing.naechsteSchritte.map((s) => (
            <div key={s.schritt} className="flex items-start gap-3 text-sm">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: 'var(--drk)' }}
              >
                {s.schritt}
              </span>
              <div>
                <span style={{ color: 'var(--text)' }}>{s.aktion}</span>
                <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>– {s.frist}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with QR */}
      <div className="pt-3 flex items-end justify-between" style={{ borderTop: '1px solid var(--border)' }}>
        <div>
          {qrSvg && (
            <div className="flex items-center gap-2">
              <div dangerouslySetInnerHTML={{ __html: qrSvg }} className="shrink-0" />
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Detailanalyse:<br />{briefing.toolUrl}
              </div>
            </div>
          )}
          {!qrSvg && (
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Detailanalyse: {briefing.toolUrl}
            </div>
          )}
        </div>
        <div className="text-xs text-right" style={{ color: 'var(--text-muted)' }}>
          Keine Rechtsberatung.<br />Stand März 2026.
        </div>
      </div>
    </div>
  );
}

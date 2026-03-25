'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { LieferkettenAntworten } from '@/lib/types';
import { LIEFERKETTEN_FRAGEN, berechneLieferkettenErgebnis } from '@/lib/lieferkette/lieferketten-check';

const GRAD_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  hoch:    { bg: '#fce4ec', color: '#c62828', label: 'Hohe indirekte Betroffenheit' },
  mittel:  { bg: '#fff3e0', color: '#e65100', label: 'Mittlere indirekte Betroffenheit' },
  gering:  { bg: '#e8f5e9', color: '#2e7d32', label: 'Geringe indirekte Betroffenheit' },
  keiner:  { bg: '#e8f5e9', color: '#2e7d32', label: 'Keine indirekte Betroffenheit erkennbar' },
};

const WAHRSCHEINLICHKEIT_STYLES: Record<string, { bg: string; color: string }> = {
  'sehr hoch': { bg: '#fce4ec', color: '#c62828' },
  'hoch':      { bg: '#fff3e0', color: '#e65100' },
  'mittel':    { bg: '#f5f5f5', color: '#757575' },
};

export default function LieferkettePage() {
  const [antworten, setAntworten] = useState<LieferkettenAntworten>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedAnf, setExpandedAnf] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('nis2-lieferkette-antworten');
      if (raw) setAntworten(JSON.parse(raw));
    } catch (e) { console.warn('localStorage read failed:', e); }
    setLoaded(true);
  }, []);

  const setAntwort = (id: string, value: boolean) => {
    const updated = { ...antworten, [id]: value };
    setAntworten(updated);
    try {
      localStorage.setItem('nis2-lieferkette-antworten', JSON.stringify(updated));
    } catch (e) { console.warn('localStorage write failed:', e); }
  };

  if (!loaded) {
    return (
      <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] flex items-center justify-center">
        <div style={{ color: 'var(--text-muted)' }}>Laden...</div>
      </div>
    );
  }

  const answeredCount = Object.values(antworten).filter(v => v !== undefined).length;
  const ergebnis = answeredCount > 0 ? berechneLieferkettenErgebnis(antworten) : null;
  const gradStyle = ergebnis ? GRAD_STYLES[ergebnis.betroffeheitsgrad] : null;

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Intro */}
        <div className="drk-card drk-fade-in">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            Indirekte Betroffenheit
          </h2>
          <p className="mb-3" style={{ color: 'var(--text-light)' }}>
            Auch ohne eigenen Rettungsdienst kann euer Kreisverband von NIS-2 betroffen sein — über eure Geschäftspartner und IT-Dienstleister.
          </p>
          <div className="p-3 rounded-lg mb-3" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--text)' }}>Warum ist das wichtig?</h3>
            <ul className="text-sm space-y-1.5" style={{ color: 'var(--text-light)' }}>
              <li>
                <strong>§30 Nr. 4 BSIG</strong> verpflichtet NIS-2-pflichtige Einrichtungen, ihre gesamte Lieferkette abzusichern — das betrifft auch euch als Zulieferer oder Kunde.
              </li>
              <li>
                <strong>IT-Dienstleister im DRK</strong> — häufig bieten Landesverbände oder verbandseigene IT-Gesellschaften zentrale IT-Services an. Fallen diese unter NIS-2, geben sie Sicherheitsvorgaben an euch weiter.
              </li>
              <li>
                <strong>Krankenhäuser, Leitstellen, Rettungsdienst-Träger</strong> sind NIS-2-pflichtig und werden IT-Sicherheitsanforderungen vertraglich an ihre Partner stellen.
              </li>
              <li>
                <strong>Konsequenz:</strong> Verträge mit IT-Sicherheitsklauseln, Sicherheitsfragebögen, MFA-Pflicht, Meldepflichten bei Vorfällen — auch ohne eigene NIS-2-Pflicht.
              </li>
            </ul>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Beantwortet die folgenden 6 Fragen, um eure indirekte Betroffenheit einzuschätzen.
          </p>
        </div>

        {/* Questions */}
        {LIEFERKETTEN_FRAGEN.map((frage, index) => {
          const isExpanded = expandedId === frage.id;
          const currentAnswer = antworten[frage.id];

          return (
            <div key={frage.id} className="drk-card drk-slide-up">
              <div className="flex items-start gap-3">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
                  style={{ background: currentAnswer === true ? 'var(--drk)' : currentAnswer === false ? 'var(--success)' : 'var(--text-muted)' }}
                >
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-sm mb-2" style={{ color: 'var(--text)' }}>
                    {frage.frage}
                  </p>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : frage.id)}
                    className="text-xs mb-3 flex items-center gap-1"
                    style={{ color: 'var(--drk)' }}
                  >
                    {isExpanded ? '▾' : '▸'} Was bedeutet das?
                  </button>

                  {isExpanded && (
                    <div className="mb-3 p-2 rounded text-xs" style={{ background: 'var(--bg)', color: 'var(--text-light)' }}>
                      <p className="mb-1">{frage.erklaerung}</p>
                      {currentAnswer === true && (
                        <p className="font-semibold mt-2" style={{ color: 'var(--drk)' }}>
                          → {frage.relevanzWennJa}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setAntwort(frage.id, true)}
                      className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                        currentAnswer === true ? 'text-white' : ''
                      }`}
                      style={{
                        background: currentAnswer === true ? 'var(--drk)' : 'var(--bg)',
                        color: currentAnswer === true ? '#fff' : 'var(--text)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      Ja
                    </button>
                    <button
                      onClick={() => setAntwort(frage.id, false)}
                      className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                        currentAnswer === false ? 'text-white' : ''
                      }`}
                      style={{
                        background: currentAnswer === false ? 'var(--success)' : 'var(--bg)',
                        color: currentAnswer === false ? '#fff' : 'var(--text)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      Nein
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Result */}
        {ergebnis && gradStyle && (
          <>
            <div className="drk-card drk-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-sm px-4 py-1.5 rounded-full font-bold"
                  style={{ background: gradStyle.bg, color: gradStyle.color }}
                >
                  {gradStyle.label}
                </span>
              </div>

              {/* Requirements with GF details */}
              {ergebnis.anforderungen.length > 0 && (
                <>
                  <h3 className="font-bold text-sm mb-3" style={{ color: 'var(--text)' }}>
                    Wahrscheinliche Anforderungen an euren Kreisverband
                  </h3>
                  <div className="space-y-2 mb-4">
                    {ergebnis.anforderungen.map((anf, i) => {
                      const ws = WAHRSCHEINLICHKEIT_STYLES[anf.wahrscheinlichkeit];
                      const isAnfExpanded = expandedAnf === i;
                      return (
                        <div key={i} className="p-3 rounded-lg" style={{ border: '1px solid var(--border)' }}>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                              {anf.kategorie}
                            </h4>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0"
                              style={{ background: ws.bg, color: ws.color }}
                            >
                              {anf.wahrscheinlichkeit}
                            </span>
                          </div>
                          <p className="text-xs" style={{ color: 'var(--text-light)' }}>{anf.beschreibung}</p>
                          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{anf.rechtsgrundlage}</p>

                          {/* GF-Detail Accordion */}
                          <button
                            onClick={() => setExpandedAnf(isAnfExpanded ? null : i)}
                            className="text-xs mt-2 flex items-center gap-1 font-semibold"
                            style={{ color: 'var(--drk)' }}
                          >
                            {isAnfExpanded ? '▾' : '▸'} Was muss die Geschäftsführung tun?
                          </button>
                          {isAnfExpanded && (
                            <div className="mt-2 p-2.5 rounded text-xs" style={{ background: 'var(--drk-bg)', color: 'var(--text)' }}>
                              {anf.gfHinweis}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Recommendation */}
              <div
                className="p-3 rounded-lg border-l-4"
                style={{
                  borderLeftColor: ergebnis.indirektBetroffen ? 'var(--warning)' : 'var(--success)',
                  background: ergebnis.indirektBetroffen ? 'var(--warning-bg)' : 'var(--success-bg)',
                }}
              >
                <p className="text-sm" style={{ color: 'var(--text)' }}>{ergebnis.empfehlung}</p>
              </div>
            </div>
          </>
        )}

        {/* Cross-link */}
        <div className="drk-card text-center">
          <p className="text-sm mb-3" style={{ color: 'var(--text-light)' }}>
            Für direkt betroffene Kreisverbände (mit Rettungsdienst):
          </p>
          <Link href="/check" className="drk-btn-primary">
            Vollständigen Self-Check starten
          </Link>
        </div>
      </div>
    </div>
  );
}

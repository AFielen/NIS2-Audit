'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { AssessmentResult, WizardAnswers, Grunddaten } from '@/lib/types';
import { downloadJSON } from '@/lib/report';
import { encodeState } from '@/lib/state-codec';
import { generateQrSvg } from '@/lib/qr-svg';

interface ExportActionsProps {
  result: AssessmentResult;
  answers: WizardAnswers;
  grunddaten?: Grunddaten;
}

export default function ExportActions({ result, answers, grunddaten }: ExportActionsProps) {
  const [qrSvg, setQrSvg] = useState<string>('');
  const [stateUrl, setStateUrl] = useState<string>('');
  const [kopiert, setKopiert] = useState(false);
  const [ctaHinweis, setCtaHinweis] = useState(false);

  useEffect(() => {
    try {
      const encoded = encodeState({ answers, grunddaten });
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '');
      const url = `${baseUrl}/check?state=${encoded}`;
      setStateUrl(url);
      const svg = generateQrSvg(url, 120);
      setQrSvg(svg);
    } catch (e) {
      console.warn('QR code generation failed:', e);
    }
  }, [answers, grunddaten]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    downloadJSON(result, answers, grunddaten);
  };

  const handleCopyLink = async () => {
    if (!stateUrl) return;
    try {
      await navigator.clipboard.writeText(stateUrl);
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2000);
    } catch {
      // Fallback: select input if clipboard fails
    }
  };

  const handleCopyForManager = async () => {
    if (!stateUrl) return;
    try {
      await navigator.clipboard.writeText(stateUrl);
      setCtaHinweis(true);
      setTimeout(() => setCtaHinweis(false), 5000);
    } catch {
      // Fallback: select input if clipboard fails
    }
  };

  return (
    <>
      {/* QR Code section - visible in print only */}
      {qrSvg && (
        <div className="hidden print:block drk-card" style={{ pageBreakInside: 'avoid' }}>
          <div className="flex items-start gap-4">
            {/* Safe: qrSvg is generated internally by lib/qr-svg.ts, not from user input */}
            <div dangerouslySetInnerHTML={{ __html: qrSvg }} className="shrink-0" />
            <div>
              <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>
                QR-Code: Audit wiederherstellen
              </h3>
              <p className="text-xs" style={{ color: 'var(--text-light)' }}>
                Scannen Sie diesen QR-Code, um den NIS-2 Self-Check mit allen Antworten erneut zu öffnen.
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                Alle Daten sind komprimiert im QR-Code gespeichert — es werden keine Daten auf einem Server abgelegt.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* QR Code preview - visible on screen */}
      {qrSvg && (
        <div className="drk-card drk-fade-in no-print">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            {/* Safe: qrSvg is generated internally by lib/qr-svg.ts, not from user input */}
            <div dangerouslySetInnerHTML={{ __html: qrSvg }} className="shrink-0 rounded border mx-auto sm:mx-0" style={{ borderColor: 'var(--border)', padding: '4px' }} />
            <div>
              <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>
                QR-Code: Audit wiederherstellen
              </h3>
              <p className="text-xs" style={{ color: 'var(--text-light)' }}>
                Dieser QR-Code enthält alle Ihre Antworten in komprimierter Form. Scannen Sie ihn, um den Check später fortzusetzen oder auf einem anderen Gerät zu öffnen.
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                Alle Daten sind ausschließlich im QR-Code gespeichert — es werden keine Daten auf einem Server abgelegt.
              </p>
              <div className="mt-2 p-2 rounded text-xs" style={{ background: 'var(--warning-bg)', color: '#b45309' }}>
                <strong>Hinweis:</strong> Behandeln Sie diesen QR-Code vertraulich. Wer ihn scannt, kann alle Ihre Audit-Antworten einsehen.
              </div>
              {/* Copyable URL */}
              {stateUrl && (
                <div className="mt-3 w-full">
                  <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--text-muted)' }}>
                    Link zum Wiederherstellen:
                  </label>
                  <div className="flex gap-1">
                    <input
                      readOnly
                      value={stateUrl}
                      className="drk-input flex-1 text-xs font-mono"
                      style={{ textOverflow: 'ellipsis' }}
                      onFocus={(e) => e.target.select()}
                    />
                    <button
                      onClick={handleCopyLink}
                      className="drk-btn-secondary shrink-0 px-2 text-xs"
                      title="Link kopieren"
                    >
                      {kopiert ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="drk-card drk-fade-in no-print">
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={handlePrint} className="drk-btn-primary flex-1">
            Ergebnis drucken / als PDF speichern
          </button>
          <Link href="/ergebnis/briefing" className="drk-btn-secondary flex-1 text-center">
            Vorstand-Briefing
          </Link>
          <button onClick={handleExportJSON} className="drk-btn-secondary flex-1">
            JSON exportieren
          </button>
          <button onClick={handleCopyLink} className="drk-btn-secondary flex-1" disabled={!stateUrl}>
            {kopiert ? 'Kopiert!' : 'Link kopieren'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-3">
          <Link href="/check" className="drk-btn-secondary flex-1 text-center">
            Erneut bearbeiten
          </Link>
          <button
            onClick={() => {
              try {
                localStorage.removeItem('nis2-audit-wizard-state');
                localStorage.removeItem('nis2-audit-result');
                localStorage.removeItem('nis2-audit-answers');
              } catch (e) { console.warn('localStorage clear failed:', e); }
              window.location.href = '/check';
            }}
            className="drk-btn-secondary flex-1"
          >
            Neuen Check starten
          </button>
        </div>

        {/* CTA: In NIS-2 Manager übernehmen */}
        {stateUrl && (
          <div className="mt-3 p-4 rounded-xl" style={{ background: 'var(--drk-bg)', border: '2px solid var(--drk)' }}>
            <button
              onClick={handleCopyForManager}
              className="drk-btn-primary w-full py-2.5 text-sm font-semibold"
            >
              Ergebnis in NIS-2 Manager übernehmen
            </button>
            {ctaHinweis && (
              <p className="text-xs mt-2 text-center" style={{ color: 'var(--drk)' }}>
                Link kopiert. Öffne <strong>drk-isms.de</strong> und füge den Link im Import-Bereich ein.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

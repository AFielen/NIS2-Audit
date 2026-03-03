'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { AssessmentResult, WizardAnswers, PolicyPack, Locale } from '@/lib/types';
import { downloadJSON } from '@/lib/report';
import { encodeState } from '@/lib/state-codec';
import { generateQrSvg } from '@/lib/qr-svg';

interface ExportActionsProps {
  result: AssessmentResult;
  answers: WizardAnswers;
  locale?: Locale;
}

export default function ExportActions({ result, answers, locale = 'de' }: ExportActionsProps) {
  const [qrSvg, setQrSvg] = useState<string>('');

  useEffect(() => {
    try {
      const encoded = encodeState({
        answers,
        policyPack: result.activePolicyPack as PolicyPack,
      });
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const stateUrl = `${baseUrl}/check?state=${encoded}`;
      const svg = generateQrSvg(stateUrl, 120);
      setQrSvg(svg);
    } catch {
      // QR generation failed silently
    }
  }, [answers, result.activePolicyPack]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    downloadJSON(result, answers);
  };

  return (
    <>
      {/* QR Code section - visible in print only */}
      {qrSvg && (
        <div className="hidden print:block drk-card" style={{ pageBreakInside: 'avoid' }}>
          <div className="flex items-start gap-4">
            <div dangerouslySetInnerHTML={{ __html: qrSvg }} className="shrink-0" />
            <div>
              <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>
                QR-Code: Audit wiederherstellen
              </h3>
              <p className="text-xs" style={{ color: 'var(--text-light)' }}>
                Scannen Sie diesen QR-Code, um den NIS-2 Self-Check mit allen Antworten erneut zu öffnen.
                Alle Daten sind im QR-Code enthalten – es werden keine Daten auf einem Server gespeichert.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* QR Code preview - visible on screen */}
      {qrSvg && (
        <div className="drk-card drk-fade-in no-print">
          <div className="flex items-start gap-4">
            <div dangerouslySetInnerHTML={{ __html: qrSvg }} className="shrink-0 rounded border" style={{ borderColor: 'var(--border)', padding: '4px' }} />
            <div>
              <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>
                {locale === 'de' ? 'QR-Code: Audit wiederherstellen' : 'QR Code: Restore Audit'}
              </h3>
              <p className="text-xs" style={{ color: 'var(--text-light)' }}>
                {locale === 'de'
                  ? 'Dieser QR-Code enthält alle Ihre Antworten. Scannen Sie ihn, um den Check später fortzusetzen oder auf einem anderen Gerät zu öffnen. Der QR-Code erscheint auch auf dem gedruckten PDF.'
                  : 'This QR code contains all your answers. Scan it to continue the check later or open on another device. The QR code also appears on the printed PDF.'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="drk-card drk-fade-in no-print">
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={handlePrint} className="drk-btn-primary flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="mr-2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            {locale === 'de' ? 'Ergebnis drucken / als PDF speichern' : 'Print / Save as PDF'}
          </button>

          <button onClick={handleExportJSON} className="drk-btn-secondary flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {locale === 'de' ? 'JSON exportieren' : 'Export JSON'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-3">
          <Link href="/check" className="drk-btn-secondary flex-1 text-center">
            {locale === 'de' ? 'Erneut bearbeiten' : 'Edit Again'}
          </Link>
          <button
            onClick={() => {
              try {
                localStorage.removeItem('nis2-audit-wizard-state');
                localStorage.removeItem('nis2-audit-result');
                localStorage.removeItem('nis2-audit-answers');
                localStorage.removeItem('nis2-audit-policy');
              } catch { /* ignore */ }
              window.location.href = '/check';
            }}
            className="drk-btn-secondary flex-1"
          >
            {locale === 'de' ? 'Neuen Check starten' : 'Start New Check'}
          </button>
        </div>
      </div>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { AssessmentResult, WizardAnswers } from '@/lib/types';
import { downloadJSON } from '@/lib/report';
import { encodeState } from '@/lib/state-codec';
import { generateQrSvg } from '@/lib/qr-svg';

interface ExportActionsProps {
  result: AssessmentResult;
  answers: WizardAnswers;
}

export default function ExportActions({ result, answers }: ExportActionsProps) {
  const [qrSvg, setQrSvg] = useState<string>('');

  useEffect(() => {
    try {
      const encoded = encodeState({ answers });
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const stateUrl = `${baseUrl}/check?state=${encoded}`;
      const svg = generateQrSvg(stateUrl, 120);
      setQrSvg(svg);
    } catch {
      // QR generation failed silently
    }
  }, [answers]);

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
                QR-Code: Audit wiederherstellen
              </h3>
              <p className="text-xs" style={{ color: 'var(--text-light)' }}>
                Dieser QR-Code enthält alle Ihre Antworten. Scannen Sie ihn, um den Check später fortzusetzen oder auf einem anderen Gerät zu öffnen.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="drk-card drk-fade-in no-print">
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={handlePrint} className="drk-btn-primary flex-1">
            Ergebnis drucken / als PDF speichern
          </button>
          <button onClick={handleExportJSON} className="drk-btn-secondary flex-1">
            JSON exportieren
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
              } catch { /* ignore */ }
              window.location.href = '/check';
            }}
            className="drk-btn-secondary flex-1"
          >
            Neuen Check starten
          </button>
        </div>
      </div>
    </>
  );
}

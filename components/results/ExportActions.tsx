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

  useEffect(() => {
    try {
      const encoded = encodeState({ answers, grunddaten });
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const stateUrl = `${baseUrl}/check?state=${encoded}`;
      const svg = generateQrSvg(stateUrl, 120);
      setQrSvg(svg);
    } catch {
      // QR generation failed silently
    }
  }, [answers, grunddaten]);

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

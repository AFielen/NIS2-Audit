'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { AssessmentResult, WizardAnswers, Grunddaten } from '@/lib/types';
import { generiereVorstandBriefing } from '@/lib/briefing/vorstand-briefing';
import { generateQrSvg } from '@/lib/qr-svg';
import VorstandBriefingView from '@/components/results/VorstandBriefing';

export default function BriefingPage() {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [grunddaten, setGrunddaten] = useState<Grunddaten>({ kreisverband: '', adresse: '', vorstand: '' });
  const [loaded, setLoaded] = useState(false);
  const [qrSvg, setQrSvg] = useState('');

  useEffect(() => {
    try {
      const resultRaw = localStorage.getItem('nis2-audit-result');
      const answersRaw = localStorage.getItem('nis2-audit-answers');
      const grunddatenRaw = localStorage.getItem('nis2-audit-grunddaten');
      if (resultRaw) setResult(JSON.parse(resultRaw));
      if (answersRaw) setAnswers(JSON.parse(answersRaw));
      if (grunddatenRaw) setGrunddaten(JSON.parse(grunddatenRaw));
    } catch (e) {
      console.warn('localStorage read failed:', e);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!result) return;
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '');
      const svg = generateQrSvg(baseUrl, 80);
      setQrSvg(svg);
    } catch (e) {
      console.warn('QR code generation failed:', e);
    }
  }, [result]);

  if (!loaded) {
    return (
      <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] flex items-center justify-center">
        <div style={{ color: 'var(--text-muted)' }}>Laden...</div>
      </div>
    );
  }

  if (!result) {
    return (
      <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="drk-card text-center drk-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 style={{ color: 'var(--text-muted)', margin: '0 auto' }} className="mb-4">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              Keine Auswertungsdaten vorhanden
            </h2>
            <p className="mb-6" style={{ color: 'var(--text-light)' }}>
              Bitte führen Sie zuerst den Self-Check durch, um ein Vorstand-Briefing zu generieren.
            </p>
            <Link href="/check" className="drk-btn-primary">
              Self-Check starten
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const briefing = generiereVorstandBriefing(result, answers, grunddaten);

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Screen-only controls */}
        <div className="flex items-center justify-between no-print">
          <Link href="/ergebnis" className="text-sm hover:underline" style={{ color: 'var(--drk)' }}>
            ← Zurück zum Ergebnis
          </Link>
          <button onClick={() => window.print()} className="drk-btn-primary">
            Briefing drucken
          </button>
        </div>

        {/* Briefing card */}
        <div className="drk-card briefing-page">
          <VorstandBriefingView briefing={briefing} qrSvg={qrSvg} />
        </div>

        {/* Screen-only hint */}
        <div className="text-center text-xs no-print" style={{ color: 'var(--text-muted)' }}>
          Tipp: Nutzen Sie &quot;Drucken&quot; und wählen Sie &quot;Als PDF speichern&quot; für einen digitalen Versand.
        </div>
      </div>
    </div>
  );
}

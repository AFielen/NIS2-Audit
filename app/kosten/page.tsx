'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { AssessmentResult, WizardAnswers, KostenErgebnis, BundeslandProfil } from '@/lib/types';
import { berechneKosten, bestimmeKVGroesse } from '@/lib/costs/kostenrechner';
import { KOSTEN_BEREICHE, VERGLEICHSWERTE } from '@/lib/costs/kosten-modell';
import { BUNDESLAND_PROFILE, getBundeslandProfil } from '@/lib/costs/bundesland-refinanzierung';

function formatEUR(value: number): string {
  return value.toLocaleString('de-DE') + ' EUR';
}

const DECKUNGSGRAD_COLORS: Record<string, { bg: string; color: string }> = {
  hoch:      { bg: '#e8f5e9', color: '#2e7d32' },
  mittel:    { bg: '#fff3e0', color: '#e65100' },
  gering:    { bg: '#fce4ec', color: '#c62828' },
  unbekannt: { bg: 'var(--bg)', color: 'var(--text-muted)' },
};

export default function KostenPage() {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [loaded, setLoaded] = useState(false);
  const [bundesland, setBundesland] = useState('');
  const [expandedEinmalig, setExpandedEinmalig] = useState(false);
  const [expandedJaehrlich, setExpandedJaehrlich] = useState(false);

  useEffect(() => {
    try {
      const resultRaw = localStorage.getItem('nis2-audit-result');
      const answersRaw = localStorage.getItem('nis2-audit-answers');
      const blRaw = localStorage.getItem('nis2-kosten-bundesland');
      if (resultRaw) setResult(JSON.parse(resultRaw));
      if (answersRaw) setAnswers(JSON.parse(answersRaw));
      if (blRaw) setBundesland(blRaw);
    } catch (e) {
      console.warn('localStorage read failed:', e);
    }
    setLoaded(true);
  }, []);

  const handleBundeslandChange = (code: string) => {
    setBundesland(code);
    try {
      localStorage.setItem('nis2-kosten-bundesland', code);
    } catch (e) { console.warn('localStorage write failed:', e); }
  };

  if (!loaded) {
    return (
      <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] flex items-center justify-center">
        <div style={{ color: 'var(--text-muted)' }}>Laden...</div>
      </div>
    );
  }

  // Gate: Self-Check erforderlich
  if (!result) {
    return (
      <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="drk-card text-center py-12">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" className="mx-auto mb-4">
              <path d="M9 7h6m0 10v-3m-3 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>Self-Check erforderlich</h2>
            <p className="mb-6" style={{ color: 'var(--text-light)' }}>
              Bitte führen Sie zuerst den NIS-2 Self-Check durch, um eine personalisierte Kostenberechnung zu erhalten.
              Die Kosten werden anhand Ihrer Verbandsgröße und bereits vorhandener Sicherheitsmaßnahmen berechnet.
            </p>
            <Link href="/check" className="drk-btn-primary inline-block">
              Self-Check starten
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const kostenErgebnis = berechneKosten(result, answers);
  const blProfil: BundeslandProfil | undefined = bundesland ? getBundeslandProfil(bundesland) : undefined;
  const groesseLabel = kostenErgebnis.groesse === 'S' ? 'Klein (<50 VZÄ)' : kostenErgebnis.groesse === 'M' ? 'Mittel (50–250 VZÄ)' : 'Groß (>250 VZÄ)';

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="drk-card drk-fade-in">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            NIS-2 Kostenrechner
          </h2>
          <p style={{ color: 'var(--text-light)' }}>
            Realistische Kostenschätzung für die NIS-2-Umsetzung — basierend auf §30 BSIG Maßnahmenkatalog.
          </p>
          <div className="mt-2 text-sm">
            <span style={{ color: 'var(--text-muted)' }}>Verbandsgröße: </span>
            <span className="font-semibold" style={{ color: 'var(--text)' }}>{groesseLabel}</span>
            <span style={{ color: 'var(--text-muted)' }}> ({kostenErgebnis.vzae} VZÄ)</span>
          </div>
        </div>

        {/* Bundesland Selector */}
        <div className="drk-card drk-fade-in">
          <label className="drk-label mb-2 block">Bundesland auswählen</label>
          <p className="text-sm mb-3" style={{ color: 'var(--text-light)' }}>
            Wir zeigen euch bundeslandspezifische Refinanzierungswege.
          </p>
          <select
            className="drk-input w-full max-w-md"
            value={bundesland}
            onChange={e => handleBundeslandChange(e.target.value)}
          >
            <option value="">— Bundesland wählen —</option>
            {BUNDESLAND_PROFILE.map(bl => (
              <option key={bl.code} value={bl.code}>{bl.name}</option>
            ))}
          </select>
        </div>

        {/* Einmalige Investition */}
        <div className="drk-card drk-slide-up">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Einmalige Investition</h3>
            <div className="text-right">
              <div className="text-xl font-bold" style={{ color: 'var(--drk)' }}>
                {formatEUR(kostenErgebnis.einmaligMin)}–{formatEUR(kostenErgebnis.einmaligMax)}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 rounded-full mb-3" style={{ background: 'var(--border)' }}>
            <div
              className="h-3 rounded-full"
              style={{
                background: 'var(--drk)',
                width: `${Math.min(100, (kostenErgebnis.einmaligMax / 1500000) * 100)}%`,
                opacity: 0.7,
              }}
            />
          </div>

          {/* Comparison */}
          <div className="text-sm mb-3 p-2 rounded" style={{ background: 'var(--bg)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Bundesregierung schätzt: </span>
            <span className="line-through" style={{ color: 'var(--text-muted)' }}>
              {formatEUR(VERGLEICHSWERTE.bundesregierungSchätzungEinmalig)}
            </span>
            <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>
              (unrealistisch niedrig – basiert auf Durchschnitt aller Branchen)
            </span>
          </div>

          {/* Expandable detail */}
          <button
            onClick={() => setExpandedEinmalig(!expandedEinmalig)}
            className="text-sm font-semibold flex items-center gap-1"
            style={{ color: 'var(--drk)' }}
          >
            {expandedEinmalig ? '▾' : '▸'} Details nach Bereich
          </button>
          {expandedEinmalig && (
            <div className="mt-3 space-y-2">
              {kostenErgebnis.bereiche.filter(b => b.einmaligMin > 0 || b.einmaligMax > 0 || b.bereitsUmgesetzt).map(b => (
                <div key={b.id} className="flex items-center justify-between text-sm p-2 rounded" style={{ background: b.bereitsUmgesetzt ? '#e8f5e9' : b.teilweiseErfuellt ? '#fff3e0' : 'var(--bg)' }}>
                  <div>
                    <span style={{ color: 'var(--text)' }}>{b.label}</span>
                    <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>{b.paragraph}</span>
                    {b.bereitsUmgesetzt && (
                      <div className="text-xs mt-0.5" style={{ color: '#2e7d32' }}>Bereits umgesetzt — keine Investition nötig</div>
                    )}
                    {b.teilweiseErfuellt && (
                      <div className="text-xs mt-0.5" style={{ color: '#e65100' }}>Teilweise umgesetzt — nur Lücken schließen</div>
                    )}
                  </div>
                  <span className="font-semibold shrink-0 ml-2" style={{ color: b.bereitsUmgesetzt ? '#2e7d32' : 'var(--text)' }}>
                    {b.bereitsUmgesetzt ? '0 EUR' : b.teilweiseErfuellt ? formatEUR(b.einmaligMin) : `${formatEUR(b.einmaligMin)}–${formatEUR(b.einmaligMax)}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Jährliche Kosten */}
        <div className="drk-card drk-slide-up">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Jährliche laufende Kosten</h3>
            <div className="text-right">
              <div className="text-xl font-bold" style={{ color: 'var(--drk)' }}>
                {formatEUR(kostenErgebnis.jaehrlichMin)}–{formatEUR(kostenErgebnis.jaehrlichMax)}
              </div>
            </div>
          </div>

          <div className="w-full h-3 rounded-full mb-3" style={{ background: 'var(--border)' }}>
            <div
              className="h-3 rounded-full"
              style={{
                background: 'var(--drk)',
                width: `${Math.min(100, (kostenErgebnis.jaehrlichMax / 800000) * 100)}%`,
                opacity: 0.7,
              }}
            />
          </div>

          <div className="text-sm mb-3" style={{ color: 'var(--text-light)' }}>
            Pro VZÄ/Jahr: ca. <strong>{formatEUR(kostenErgebnis.kostenProVzaeJahr)}</strong>
          </div>

          <button
            onClick={() => setExpandedJaehrlich(!expandedJaehrlich)}
            className="text-sm font-semibold flex items-center gap-1"
            style={{ color: 'var(--drk)' }}
          >
            {expandedJaehrlich ? '▾' : '▸'} Details nach Bereich
          </button>
          {expandedJaehrlich && (
            <div className="mt-3 space-y-2">
              {kostenErgebnis.bereiche.filter(b => b.jaehrlichMin > 0 || b.jaehrlichMax > 0 || b.bereitsUmgesetzt).map(b => (
                <div key={b.id} className="flex items-center justify-between text-sm p-2 rounded" style={{ background: b.bereitsUmgesetzt ? '#e8f5e9' : b.teilweiseErfuellt ? '#fff3e0' : 'var(--bg)' }}>
                  <div>
                    <span style={{ color: 'var(--text)' }}>{b.label}</span>
                    <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>{b.paragraph}</span>
                    {b.bereitsUmgesetzt && (
                      <div className="text-xs mt-0.5" style={{ color: '#2e7d32' }}>Bereits umgesetzt — keine laufenden Kosten</div>
                    )}
                    {b.teilweiseErfuellt && (
                      <div className="text-xs mt-0.5" style={{ color: '#e65100' }}>Teilweise umgesetzt — reduzierte Kosten</div>
                    )}
                    {!b.bereitsUmgesetzt && !b.teilweiseErfuellt && b.id === 'isb' && (
                      <div className="text-xs mt-0.5" style={{ color: 'var(--warning)' }}>
                        Fachkräftemangel – Kooperationsmodell prüfen
                      </div>
                    )}
                  </div>
                  <span className="font-semibold shrink-0 ml-2" style={{ color: b.bereitsUmgesetzt ? '#2e7d32' : 'var(--text)' }}>
                    {b.bereitsUmgesetzt ? '0 EUR' : b.teilweiseErfuellt ? formatEUR(b.jaehrlichMin) : `${formatEUR(b.jaehrlichMin)}–${formatEUR(b.jaehrlichMax)}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Refinanzierung */}
        <div className="drk-card drk-fade-in">
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
            Refinanzierungsmöglichkeiten
            {blProfil ? ` – ${blProfil.name}` : ''}
          </h3>

          {!blProfil && (
            <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
              Wählen Sie oben ein Bundesland, um landesspezifische Refinanzierungswege zu sehen. Hier die bundesweiten Pfade:
            </p>
          )}

          {/* Pfade */}
          <div className="space-y-3 mb-4">
            {(blProfil?.pfade ?? [
              { id: 'sgb11_digital', titel: 'Digitalisierungsförderung Pflege', rechtsgrundlage: '§8 Abs. 8 SGB XI', maxBetrag: 'max. 12.000 EUR', deckungsgrad: 'gering' as const, einmalig: true, voraussetzungen: ['Einrichtung erbringt Pflegeleistungen (SGB XI)'] },
              { id: 'rueckenwind3', titel: 'rückenwind3 (ESF+)', rechtsgrundlage: 'ESF+ 2021–2027', maxBetrag: 'bis 800.000 EUR', deckungsgrad: 'mittel' as const, einmalig: true, voraussetzungen: ['Träger der freien Wohlfahrtspflege'] },
              { id: 'bafa_beratung', titel: 'BAFA Unternehmensberatung', rechtsgrundlage: 'Bundesförderung', maxBetrag: 'max. 2.800 EUR', deckungsgrad: 'gering' as const, einmalig: true, voraussetzungen: ['BAFA-zugelassene Berater:in'] },
            ]).map(pfad => {
              const dg = DECKUNGSGRAD_COLORS[pfad.deckungsgrad] ?? DECKUNGSGRAD_COLORS.unbekannt;
              return (
                <div key={pfad.id} className="p-3 rounded-lg" style={{ border: '1px solid var(--border)' }}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{pfad.titel}</h4>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0"
                      style={{ background: dg.bg, color: dg.color }}
                    >
                      {pfad.deckungsgrad}
                    </span>
                  </div>
                  <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                    {pfad.rechtsgrundlage}
                    {pfad.maxBetrag && ` · ${pfad.maxBetrag}`}
                    {' · '}{pfad.einmalig ? 'Einmalig' : 'Laufend'}
                  </div>
                  <ul className="text-xs list-disc ml-4 mb-1" style={{ color: 'var(--text-light)' }}>
                    {pfad.voraussetzungen.map((v, i) => <li key={i}>{v}</li>)}
                  </ul>
                  {pfad.hinweis && (
                    <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>{pfad.hinweis}</p>
                  )}
                  {pfad.antragsLink && (
                    <a
                      href={pfad.antragsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline"
                      style={{ color: 'var(--drk)' }}
                    >
                      Zum Antrag →
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {/* RD & Pflege Blocks (only with Bundesland) */}
          {blProfil && (
            <div className="space-y-3 mb-4">
              {/* Rettungsdienst */}
              <div className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                    Rettungsdienst-Finanzierung
                  </h4>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: blProfil.rdItKostenAnerkannt ? '#e8f5e9' : '#fce4ec',
                      color: blProfil.rdItKostenAnerkannt ? '#2e7d32' : '#c62828',
                    }}
                  >
                    IT-Kosten {blProfil.rdItKostenAnerkannt ? 'anerkannt' : 'nicht explizit anerkannt'}
                  </span>
                </div>
                <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                  {blProfil.rdGesetz} · Modell: {blProfil.rdFinanzierungsModell}
                </div>
                <p className="text-xs" style={{ color: 'var(--text-light)' }}>{blProfil.rdHinweis}</p>
              </div>

              {/* Pflegesatz */}
              <div className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                    Pflegesatz-Verhandlung
                  </h4>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: blProfil.pflegesatzPraxis === 'offen' ? '#e8f5e9' : blProfil.pflegesatzPraxis === 'schwierig' ? '#fce4ec' : '#f5f5f5',
                      color: blProfil.pflegesatzPraxis === 'offen' ? '#2e7d32' : blProfil.pflegesatzPraxis === 'schwierig' ? '#c62828' : '#757575',
                    }}
                  >
                    {blProfil.pflegesatzPraxis}
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-light)' }}>{blProfil.pflegesatzHinweis}</p>
              </div>

              {blProfil.landesfoerderungIt && blProfil.landesfoerderungLink && (
                <div className="p-3 rounded-lg" style={{ background: '#e8f5e9' }}>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: '#2e7d32' }}>
                    Landesförderung IT/Digitalisierung verfügbar
                  </h4>
                  <a
                    href={blProfil.landesfoerderungLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline"
                    style={{ color: '#2e7d32' }}
                  >
                    {blProfil.landesfoerderungLink} →
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Disclaimer */}
          <div className="p-3 rounded-lg text-xs" style={{ background: 'var(--warning-bg)', color: '#b45309' }}>
            <strong>Hinweis:</strong> Die Refinanzierungsmöglichkeiten sind bundesland- und trägerabhängig. Diese Informationen sind Orientierungshilfe ohne Gewähr. Wende dich an deinen DRK-Landesverband oder eine Rechtsberatung für verbindliche Auskunft. Stand: März 2026.
          </div>
        </div>

        {/* Vergleichsrahmen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 drk-slide-up">
          <div className="drk-card text-center">
            <div className="text-xs uppercase font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>
              NIS-2-Compliance / Jahr
            </div>
            <div className="text-lg font-bold" style={{ color: 'var(--drk)' }}>
              {formatEUR(kostenErgebnis.jaehrlichMin)}–{formatEUR(kostenErgebnis.jaehrlichMax)}
            </div>
          </div>
          <div className="drk-card text-center">
            <div className="text-xs uppercase font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>
              Bußgeld bei Verstoß
            </div>
            <div className="text-lg font-bold" style={{ color: 'var(--warning)' }}>
              bis {formatEUR(VERGLEICHSWERTE.busseldMaxWichtig)}
            </div>
          </div>
          <div className="drk-card text-center">
            <div className="text-xs uppercase font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>
              Ransomware-Schaden Ø
            </div>
            <div className="text-lg font-bold" style={{ color: 'var(--text)' }}>
              2–23 Mio. EUR
            </div>
          </div>
        </div>

        {/* Haushaltsvorlage drucken */}
        <div className="drk-card text-center no-print">
          <button onClick={() => window.print()} className="drk-btn-primary">
            Haushaltsvorlage drucken
          </button>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            Einseitige Kostentabelle für die Vorstandssitzung
          </p>
        </div>
      </div>
    </div>
  );
}

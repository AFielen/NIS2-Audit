'use client';

import type { AssessmentResult } from '@/lib/types';

interface ScopeCardsProps {
  result: AssessmentResult;
}

export default function ScopeCards({ result }: ScopeCardsProps) {
  const { jurisdiction, scope } = result;
  const sector = jurisdiction.regulationSector;
  const isMspOnly = sector === 'digital_infrastructure';
  const isBoth = sector === 'both';

  // Derive legal scope text — sector-aware (RD only / MSP only / both)
  let legalSummary: string;
  let legalDetails: string;
  if (sector === 'none') {
    legalSummary = 'Kein sektoraler Trigger';
    legalDetails = 'Es wurde weder Rettungsdienst noch zentraler IT-Betrieb für andere juristische Personen angegeben. Aus diesem Tool ergibt sich kein direkter NIS-2-Trigger.';
  } else if (jurisdiction.directlyRegulated) {
    const classLabel = jurisdiction.classification === 'especially_important'
      ? 'Besonders wichtige Einrichtung'
      : 'Wichtige Einrichtung';
    if (isBoth) {
      legalSummary = `${classLabel} (Gesundheit + Digitale Infrastruktur)`;
      legalDetails = 'Der relevante Rechtsträger überschreitet die NIS-2-Schwellenwerte und wird über zwei Sektoren parallel reguliert: Rettungsdienst als Gesundheitsdienstleister (Anlage 1 BSIG, Sektor Gesundheit) UND zentraler IT-Betrieb für andere juristische Personen als Managed Service Provider (§ 2 Nr. 26 BSIG, Sektor Digitale Infrastruktur).';
    } else if (isMspOnly) {
      legalSummary = `${classLabel} (Digitale Infrastruktur)`;
      legalDetails = 'Der relevante Rechtsträger ist als Managed Service Provider (§ 2 Nr. 26 BSIG) direkt reguliert — Sektor »Digitale Infrastruktur / IKT-Dienstleistungsmanagement« nach Anlage 1 BSIG. Die Schwellenwerte (≥ 50 VZÄ oder > 10 Mio € Umsatz UND > 10 Mio € Bilanz) sind erfüllt.';
    } else {
      legalSummary = `${classLabel} (Gesundheit)`;
      legalDetails = 'Der relevante Rechtsträger überschreitet die NIS-2-Schwellenwerte und wird als Gesundheitsdienstleister (Rettungsdienst) direkt reguliert.';
    }
  } else {
    legalSummary = 'Schwellenwerte nicht erreicht';
    const triggerPhrase = isBoth
      ? 'Rettungsdienst und zentraler IT-Betrieb für Dritte werden erbracht'
      : isMspOnly
        ? 'Zentraler IT-Betrieb für andere juristische Personen wird erbracht'
        : 'Der Rettungsdienst wird betrieben';
    legalDetails = `${triggerPhrase}, aber die Schwellenwerte (≥ 50 VZÄ oder > 10 Mio € Umsatz UND > 10 Mio € Bilanz) werden nicht überschritten. Hinweis: § 28 Abs. 3 BSIG kennt eine enge Ausnahme für »vernachlässigbare Geschäftstätigkeiten« — bei echtem operativem IT-Betrieb hilft sie praktisch kaum. Im Grenzfall juristisch prüfen lassen.`;
  }

  // Derive technical scope text
  const techFactors: string[] = [];
  if (scope.technical.sharedIdentity) techFactors.push('Gemeinsame Identitäten (AD/Entra ID/M365)');
  if (scope.technical.sharedInfrastructure) techFactors.push('Gemeinsame Infrastruktur (Netz/Backup/MDM)');

  let techSummary: string;
  let techDetails: string;
  if (isMspOnly) {
    // MSP-only: hard-separation irrelevant, IT-Betrieb selbst ist der Scope
    techSummary = 'IT-Betrieb ist Regulierungsgegenstand';
    techDetails = 'Beim MSP-Pfad ist die IT-Betriebsleistung als solche der Regulierungsgegenstand. Eine Scope-Begrenzung durch technische Trennung ist nicht möglich — alle IT-Systeme, Prozesse und Zugänge, die dem Betrieb für Dritte dienen, fallen unter NIS-2.';
  } else if (techFactors.length === 0 && scope.technical.hardSeparationPossible) {
    techSummary = 'Technischer Scope begrenzbar';
    techDetails = 'Eine harte Trennung ist nachgewiesen. Der Scope lässt sich auf den Rettungsdienst begrenzen.';
  } else if (techFactors.length > 0) {
    techSummary = 'Gesamter Kreisverband im NIS-2-Scope';
    techDetails = isBoth
      ? 'Ohne harte Trennung erstreckt sich der NIS-2-Scope aus dem RD-Pfad auf den gesamten DRK-Kreisverband. Zusätzlich ist der MSP-Pfad separat geregelt (IT-Betrieb ist selbst reguliert).'
      : 'Ohne harte Trennung erstreckt sich der NIS-2-Scope auf den gesamten DRK-Kreisverband — nicht nur auf den Rettungsdienst. Alle IT-Systeme, Netzwerke und Prozesse des Verbands müssen die Anforderungen erfüllen.';
  } else {
    techSummary = 'Keine Shared-IT-Faktoren erkannt';
    techDetails = 'Es wurden keine gemeinsamen IT-Abhängigkeiten angegeben.';
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Legal Scope */}
      <div className="drk-card drk-fade-in">
        <div className="flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               style={{ color: 'var(--drk)' }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <h3 className="font-bold" style={{ color: 'var(--text)' }}>
            Juristischer Scope
          </h3>
        </div>
        <div className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
          {legalSummary}
        </div>
        <p className="text-sm" style={{ color: 'var(--text-light)' }}>
          {legalDetails}
        </p>
      </div>

      {/* Technical Scope */}
      <div className="drk-card drk-fade-in">
        <div className="flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               style={{ color: 'var(--info)' }}>
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <h3 className="font-bold" style={{ color: 'var(--text)' }}>
            Technischer Scope
          </h3>
        </div>
        <div className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
          {techSummary}
        </div>
        <p className="text-sm mb-3" style={{ color: 'var(--text-light)' }}>
          {techDetails}
        </p>
        {techFactors.length > 0 && (
          <ul className="text-sm space-y-1">
            {techFactors.map((f, i) => (
              <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--info)' }}>•</span>
                {f}
              </li>
            ))}
          </ul>
        )}
        {/* Hard separation status — nur wenn RD-Pfad aktiv ist */}
        {jurisdiction.isRdProvider && (
          <div className="mt-3 p-2 rounded-lg text-sm" style={{
            background: scope.technical.hardSeparationPossible ? 'var(--success-bg)' : 'var(--warning-bg)',
            color: scope.technical.hardSeparationPossible ? 'var(--success)' : '#b45309',
          }}>
            Harte Trennung: {scope.technical.hardSeparationPossible ? '8/8 Kriterien erfüllt' : 'Nicht vollständig nachgewiesen'}
          </div>
        )}
      </div>
    </div>
  );
}

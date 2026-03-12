'use client';

import type { RegistrationResult, OutcomeType } from '@/lib/types';

interface RegistrationCalloutProps {
  registration: RegistrationResult;
  outcomeType: OutcomeType;
}

function AlertIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export default function RegistrationCallout({ registration, outcomeType }: RegistrationCalloutProps) {
  const isUrgent = (registration.required || registration.recommended) && !registration.alreadyRegistered;

  const borderColor = registration.alreadyRegistered
    ? 'var(--success)'
    : registration.required
      ? 'var(--drk)'
      : registration.recommended
        ? '#b45309'
        : 'var(--success)';

  const bgColor = registration.alreadyRegistered
    ? 'var(--success-bg)'
    : registration.required
      ? 'var(--drk-bg)'
      : registration.recommended
        ? 'var(--warning-bg)'
        : 'var(--success-bg)';

  const statusLabel = registration.alreadyRegistered
    ? 'ABGESCHLOSSEN'
    : registration.required
      ? 'ERFORDERLICH'
      : registration.recommended
        ? 'DRINGEND EMPFOHLEN'
        : outcomeType === 'B'
          ? 'VORAUSSICHTLICH NICHT ERFORDERLICH'
          : 'NICHT ERFORDERLICH';

  const icon = registration.alreadyRegistered
    ? <CheckCircleIcon />
    : isUrgent
      ? <AlertIcon />
      : outcomeType === 'A'
        ? <CheckCircleIcon />
        : <InfoIcon />;

  return (
    <div
      className="drk-card drk-fade-in border-l-4"
      style={{ borderLeftColor: borderColor, background: bgColor }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="shrink-0 mt-0.5" style={{ color: borderColor }}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold" style={{ color: 'var(--text)' }}>
            Schritt 0: BSI-Registrierung
          </h3>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded mt-1"
            style={{ background: borderColor, color: '#fff' }}
          >
            {statusLabel}
          </span>
        </div>
      </div>

      <p className="text-sm mb-3" style={{ color: 'var(--text-light)' }}>
        {registration.message}
      </p>

      {isUrgent && (
        <>
          <div className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
            Welche Angaben werden benötigt?
          </div>
          <ul className="text-sm space-y-1 mb-3 ml-4" style={{ color: 'var(--text-light)' }}>
            <li className="flex items-start gap-2">
              <span style={{ color: borderColor }}>•</span>
              Identität / Rechtsform der Einrichtung
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: borderColor }}>•</span>
              Kontaktdaten und Erreichbarkeit
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: borderColor }}>•</span>
              Einordnung (wichtige / besonders wichtige Einrichtung) soweit bestimmbar
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: borderColor }}>•</span>
              Angaben zum Leistungsbereich (Rettungsdienst)
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: borderColor }}>•</span>
              Technische / organisatorische Ansprechpartner (z.B. IT-Sicherheit)
            </li>
          </ul>
          <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
            Details stehen in der verlinkten BSI-Anleitung.
          </p>
        </>
      )}

      <a
        href={registration.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${registration.alreadyRegistered ? 'drk-btn-secondary' : 'drk-btn-primary'} inline-flex items-center gap-2 text-sm`}
      >
        BSI-Registrierungsanleitung öffnen
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  );
}

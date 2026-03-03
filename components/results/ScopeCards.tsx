'use client';

import type { AssessmentResult, Locale } from '@/lib/types';

interface ScopeCardsProps {
  result: AssessmentResult;
  locale?: Locale;
}

export default function ScopeCards({ result, locale = 'de' }: ScopeCardsProps) {
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
            {locale === 'de' ? 'Juristischer Scope' : 'Legal Scope'}
          </h3>
        </div>
        <div className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
          {result.legalScope.summary[locale]}
        </div>
        <p className="text-sm mb-3" style={{ color: 'var(--text-light)' }}>
          {result.legalScope.details[locale]}
        </p>
        {result.legalScope.factors.length > 0 && (
          <ul className="text-sm space-y-1">
            {result.legalScope.factors.map((f, i) => (
              <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--drk)' }}>•</span>
                {f[locale]}
              </li>
            ))}
          </ul>
        )}
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
            {locale === 'de' ? 'Technischer Scope' : 'Technical Scope'}
          </h3>
        </div>
        <div className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
          {result.technicalScope.summary[locale]}
        </div>
        <p className="text-sm mb-3" style={{ color: 'var(--text-light)' }}>
          {result.technicalScope.details[locale]}
        </p>
        {result.technicalScope.factors.length > 0 && (
          <ul className="text-sm space-y-1">
            {result.technicalScope.factors.map((f, i) => (
              <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--info)' }}>•</span>
                {f[locale]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

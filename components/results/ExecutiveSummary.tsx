'use client';

import type { AssessmentResult, Locale } from '@/lib/types';
import { getOutcomeLabel, getOutcomeColor, getOutcomeBgColor } from '@/lib/report';
import { policyPacks } from '@/lib/rules/policy-packs';

interface ExecutiveSummaryProps {
  result: AssessmentResult;
  locale?: Locale;
}

export default function ExecutiveSummary({ result, locale = 'de' }: ExecutiveSummaryProps) {
  const outcomeColor = getOutcomeColor(result.outcomeType);
  const outcomeBg = getOutcomeBgColor(result.outcomeType);
  const packName = policyPacks[result.activePolicyPack].name[locale];
  const affectedLabel = locale === 'de'
    ? { yes: 'Ja', no: 'Nein', unclear: 'Unklar' }
    : { yes: 'Yes', no: 'No', unclear: 'Unclear' };

  return (
    <div className="drk-card drk-fade-in">
      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>
        {locale === 'de' ? 'Executive Summary' : 'Executive Summary'}
      </h2>

      {/* Outcome Badge */}
      <div className="flex items-center gap-4 mb-6 p-4 rounded-xl" style={{ background: outcomeBg }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold shrink-0"
          style={{ background: outcomeColor, color: '#fff' }}
        >
          {result.outcomeType}
        </div>
        <div>
          <div className="font-bold text-lg" style={{ color: outcomeColor }}>
            {locale === 'de' ? 'Ergebnis' : 'Outcome'} {result.outcomeType}
          </div>
          <div className="text-sm" style={{ color: 'var(--text-light)' }}>
            {getOutcomeLabel(result.outcomeType, locale)}
          </div>
        </div>
      </div>

      {/* Key facts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
          <div className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
            {locale === 'de' ? 'Direkte Betroffenheit' : 'Direct Affectedness'}
          </div>
          <div className="font-bold" style={{ color: 'var(--text)' }}>
            {affectedLabel[result.directAffectedness]}
          </div>
        </div>

        <div className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
          <div className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
            {locale === 'de' ? 'Aktiver Regelstand' : 'Active Policy Standard'}
          </div>
          <div className="font-bold" style={{ color: 'var(--text)' }}>
            {packName}
          </div>
        </div>
      </div>

      {/* Rule sensitivity alert */}
      {result.isRuleSensitive && (
        <div
          className="mt-4 p-4 rounded-lg border-l-4"
          style={{ borderLeftColor: 'var(--warning)', background: 'var(--warning-bg)' }}
        >
          <div className="font-semibold text-sm" style={{ color: '#b45309' }}>
            {locale === 'de' ? 'Regelstandssensitiv' : 'Rule-Sensitive'}
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--text-light)' }}>
            {locale === 'de'
              ? `Unter dem alternativen Regelstand (${policyPacks[result.activePolicyPack === 'verbandslinie-konservativ' ? 'public-bsi' : 'verbandslinie-konservativ'].name[locale]}) wäre das Ergebnis ${result.alternatePolicyPackOutcome}.`
              : `Under the alternate policy standard (${policyPacks[result.activePolicyPack === 'verbandslinie-konservativ' ? 'public-bsi' : 'verbandslinie-konservativ'].name[locale]}), the outcome would be ${result.alternatePolicyPackOutcome}.`
            }
          </p>
        </div>
      )}
    </div>
  );
}

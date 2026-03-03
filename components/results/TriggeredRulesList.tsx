'use client';

import { useState } from 'react';
import type { TriggeredRule, Locale } from '@/lib/types';

interface TriggeredRulesListProps {
  rules: TriggeredRule[];
  locale?: Locale;
}

export default function TriggeredRulesList({ rules, locale = 'de' }: TriggeredRulesListProps) {
  const [expanded, setExpanded] = useState(false);

  if (rules.length === 0) return null;

  const displayRules = expanded ? rules : rules.slice(0, 5);

  return (
    <div className="drk-card drk-fade-in">
      <h3 className="font-bold mb-4" style={{ color: 'var(--text)' }}>
        {locale === 'de' ? 'Warum dieses Ergebnis?' : 'Why this outcome?'}
      </h3>
      <div className="space-y-2">
        {displayRules.map((rule, index) => (
          <details key={index} className="group">
            <summary
              className="cursor-pointer flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span
                className="text-xs font-mono px-2 py-0.5 rounded shrink-0"
                style={{ background: 'var(--bg)', color: 'var(--text-muted)' }}
              >
                {rule.ruleId}
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                {rule.description[locale]}
              </span>
            </summary>
            <div className="pl-4 mt-1 mb-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <div>
                {locale === 'de' ? 'Frage' : 'Question'}: <span className="font-mono">{rule.questionId}</span>
                {rule.answerCode && (
                  <> → <span className="font-mono">{rule.answerCode}</span></>
                )}
              </div>
              {rule.roadmapPacks.length > 0 && (
                <div className="mt-1">
                  {locale === 'de' ? 'Maßnahmen' : 'Measures'}: {rule.roadmapPacks.join(', ')}
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
      {rules.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm font-semibold"
          style={{ color: 'var(--drk)' }}
        >
          {expanded
            ? (locale === 'de' ? 'Weniger anzeigen' : 'Show less')
            : (locale === 'de' ? `Alle ${rules.length} Regeln anzeigen` : `Show all ${rules.length} rules`)
          }
        </button>
      )}
    </div>
  );
}

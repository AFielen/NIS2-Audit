'use client';

import { useState } from 'react';
import type { TriggeredRuleInfo } from '@/lib/types';

interface TriggeredRulesListProps {
  rules: TriggeredRuleInfo[];
}

export default function TriggeredRulesList({ rules }: TriggeredRulesListProps) {
  const [expanded, setExpanded] = useState(false);

  if (rules.length === 0) return null;

  const displayRules = expanded ? rules : rules.slice(0, 5);

  return (
    <div className="drk-card drk-fade-in">
      <h3 className="font-bold mb-4" style={{ color: 'var(--text)' }}>
        Warum dieses Ergebnis?
      </h3>
      <div className="space-y-2">
        {displayRules.map((rule, index) => (
          <div
            key={index}
            className="flex items-start gap-2 p-2 rounded-lg"
            style={{ background: 'var(--bg)' }}
          >
            <span
              className="text-xs font-mono px-2 py-0.5 rounded shrink-0 mt-0.5"
              style={{ background: 'var(--drk-bg)', color: 'var(--text-muted)' }}
            >
              {rule.id}
            </span>
            <span className="text-sm" style={{ color: 'var(--text-light)' }}>
              {rule.description}
            </span>
          </div>
        ))}
      </div>
      {rules.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm font-semibold"
          style={{ color: 'var(--drk)' }}
        >
          {expanded ? 'Weniger anzeigen' : `Alle ${rules.length} Regeln anzeigen`}
        </button>
      )}
    </div>
  );
}

'use client';

import type { PolicyPack, Locale } from '@/lib/types';
import { policyPacks } from '@/lib/rules/policy-packs';

interface PolicyPackSwitchProps {
  value: PolicyPack;
  onChange: (pack: PolicyPack) => void;
  locale?: Locale;
}

export default function PolicyPackSwitch({ value, onChange, locale = 'de' }: PolicyPackSwitchProps) {
  const packs = Object.values(policyPacks);

  return (
    <div className="drk-card drk-fade-in">
      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
        {locale === 'de' ? 'Regelstand wählen' : 'Select Policy Standard'}
      </h3>
      <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
        {locale === 'de'
          ? 'Der Regelstand bestimmt, ob Rettungsdienst als automatischer sektoraler Trigger gewertet wird.'
          : 'The policy standard determines whether EMS is treated as an automatic sector trigger.'}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {packs.map((pack) => {
          const isSelected = value === pack.id;
          return (
            <label
              key={pack.id}
              className="flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-colors"
              style={{
                background: isSelected ? 'var(--drk-bg)' : 'transparent',
                border: `2px solid ${isSelected ? 'var(--drk)' : 'var(--border)'}`,
              }}
            >
              <input
                type="radio"
                name="policyPack"
                value={pack.id}
                checked={isSelected}
                onChange={() => onChange(pack.id)}
                className="mt-1 shrink-0"
                style={{ accentColor: 'var(--drk)' }}
              />
              <div>
                <span className="font-semibold" style={{ color: 'var(--text)' }}>
                  {pack.name[locale]}
                </span>
                {pack.id === 'verbandslinie-konservativ' && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: 'var(--drk-bg)', color: 'var(--drk)' }}>
                    {locale === 'de' ? 'Empfohlen' : 'Recommended'}
                  </span>
                )}
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  {pack.description[locale]}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

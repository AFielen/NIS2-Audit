'use client';

import type { Preset, Locale } from '@/lib/types';
import { presets } from '@/lib/presets';

interface PresetSelectorProps {
  value: string | null;
  onChange: (preset: Preset | null) => void;
  locale?: Locale;
}

export default function PresetSelector({ value, onChange, locale = 'de' }: PresetSelectorProps) {
  return (
    <div className="drk-card drk-fade-in">
      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
        {locale === 'de' ? 'Preset wählen (optional)' : 'Select Preset (optional)'}
      </h3>
      <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
        {locale === 'de'
          ? 'Wählen Sie eine typische Verbundstruktur als Ausgangspunkt. Antworten können anschließend angepasst werden.'
          : 'Choose a typical group structure as starting point. Answers can be adjusted afterwards.'}
      </p>
      <div className="space-y-2">
        {/* No preset option */}
        <label
          className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors"
          style={{
            background: value === null ? 'var(--drk-bg)' : 'transparent',
            border: `2px solid ${value === null ? 'var(--drk)' : 'var(--border)'}`,
            minHeight: '44px',
          }}
        >
          <input
            type="radio"
            name="preset"
            checked={value === null}
            onChange={() => onChange(null)}
            className="mt-1 shrink-0"
            style={{ accentColor: 'var(--drk)' }}
          />
          <span className="font-medium" style={{ color: 'var(--text)' }}>
            {locale === 'de' ? 'Ohne Preset starten' : 'Start without preset'}
          </span>
        </label>

        {presets.map((preset) => {
          const isSelected = value === preset.id;
          return (
            <label
              key={preset.id}
              className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors"
              style={{
                background: isSelected ? 'var(--drk-bg)' : 'transparent',
                border: `2px solid ${isSelected ? 'var(--drk)' : 'var(--border)'}`,
                minHeight: '44px',
              }}
            >
              <input
                type="radio"
                name="preset"
                checked={isSelected}
                onChange={() => onChange(preset)}
                className="mt-1 shrink-0"
                style={{ accentColor: 'var(--drk)' }}
              />
              <div>
                <span className="font-medium" style={{ color: 'var(--text)' }}>
                  {preset.title[locale]}
                </span>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {preset.description[locale]}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

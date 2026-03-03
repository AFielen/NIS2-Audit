'use client';

import type { Preset } from '@/lib/types';
import { presets } from '@/lib/presets';

interface PresetSelectorProps {
  value: string | null;
  onChange: (preset: Preset | null) => void;
}

export default function PresetSelector({ value, onChange }: PresetSelectorProps) {
  return (
    <div className="drk-card">
      <h3 className="font-bold mb-3" style={{ color: 'var(--text)' }}>
        Preset wählen (optional)
      </h3>
      <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
        Wählen Sie eine typische Verbandsstruktur, um Antworten vorzubefüllen.
      </p>
      <div className="space-y-2">
        {presets.map((preset) => {
          const isSelected = value === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onChange(isSelected ? null : preset)}
              className="w-full text-left p-3 rounded-lg transition-colors"
              style={{
                background: isSelected ? 'var(--drk-bg)' : 'var(--bg)',
                border: `2px solid ${isSelected ? 'var(--drk)' : 'var(--border)'}`,
              }}
            >
              <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                {preset.title}
              </div>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {preset.description}
              </p>
            </button>
          );
        })}
        <button
          onClick={() => onChange(null)}
          className="w-full text-left p-3 rounded-lg transition-colors"
          style={{
            background: value === null ? 'var(--drk-bg)' : 'var(--bg)',
            border: `2px solid ${value === null ? 'var(--drk)' : 'var(--border)'}`,
          }}
        >
          <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
            Ohne Preset starten
          </div>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Alle Fragen selbst beantworten.
          </p>
        </button>
      </div>
    </div>
  );
}

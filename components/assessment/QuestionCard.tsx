'use client';

import { useState } from 'react';
import type { RulesetQuestion } from '@/lib/types';

interface QuestionCardProps {
  question: RulesetQuestion;
  value: string | number | undefined;
  onChange: (questionId: string, value: string | number) => void;
  hasError?: boolean;
}

function HintToggle({ hint }: { hint: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-sm flex items-center gap-1.5 hover:underline"
        style={{ color: 'var(--info)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        {open ? 'Hilfe ausblenden' : 'Was bedeutet das?'}
      </button>
      {open && (
        <p
          className="text-sm mt-2 p-3 rounded-lg leading-relaxed"
          style={{ background: '#f0f9ff', color: 'var(--text-light)', borderLeft: '3px solid var(--info)' }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

export default function QuestionCard({ question, value, onChange, hasError }: QuestionCardProps) {
  if (question.type === 'number') {
    return (
      <div className="drk-card drk-fade-in" style={hasError ? { borderColor: 'var(--drk)', borderWidth: '2px' } : undefined}>
        <label className="block">
          <span className="text-lg font-bold flex items-start gap-2" style={{ color: 'var(--text)' }}>
            <span className="text-sm font-mono mr-2" style={{ color: 'var(--text-muted)' }}>{question.id}</span>
            {question.label}
            {question.required && <span style={{ color: 'var(--drk)' }}>*</span>}
          </span>
          {question.hint && <HintToggle hint={question.hint} />}
          <input
            type="number"
            min={question.min ?? 0}
            value={value != null && value !== '' ? value : ''}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') {
                onChange(question.id, '');
              } else {
                onChange(question.id, parseFloat(val));
              }
            }}
            className="drk-input mt-3 w-full"
            placeholder={question.required ? 'Pflichtfeld' : 'Optional'}
            style={{ minHeight: '44px' }}
          />
        </label>
        {hasError && (
          <p className="text-sm mt-2" style={{ color: 'var(--drk)' }}>
            Bitte geben Sie einen Wert ein.
          </p>
        )}
      </div>
    );
  }

  // single_select
  return (
    <div className="drk-card drk-fade-in" style={hasError ? { borderColor: 'var(--drk)', borderWidth: '2px' } : undefined}>
      <h3 className="text-lg font-bold mb-1 flex items-start gap-2" style={{ color: 'var(--text)' }}>
        <span className="flex-1">
          <span className="text-sm font-mono mr-2" style={{ color: 'var(--text-muted)' }}>{question.id}</span>
          {question.label}
          {question.required && <span style={{ color: 'var(--drk)' }}> *</span>}
        </span>
      </h3>
      {question.hint && <HintToggle hint={question.hint} />}
      <div className="space-y-2 mt-3">
        {question.options?.map((option) => {
          const isSelected = value === option.value;
          return (
            <label
              key={option.value}
              className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors"
              style={{
                background: isSelected ? 'var(--drk-bg)' : 'transparent',
                border: `2px solid ${isSelected ? 'var(--drk)' : 'var(--border)'}`,
                minHeight: '44px',
              }}
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(question.id, option.value)}
                className="mt-1 shrink-0"
                style={{ accentColor: 'var(--drk)' }}
              />
              <span className="font-medium" style={{ color: 'var(--text)' }}>
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
      {hasError && (
        <p className="text-sm mt-2" style={{ color: 'var(--drk)' }}>
          Bitte wählen Sie eine Option aus.
        </p>
      )}
    </div>
  );
}

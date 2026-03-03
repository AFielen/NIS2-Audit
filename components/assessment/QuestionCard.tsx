'use client';

import type { RulesetQuestion } from '@/lib/types';

interface QuestionCardProps {
  question: RulesetQuestion;
  value: string | number | undefined;
  onChange: (questionId: string, value: string | number) => void;
  hasError?: boolean;
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
      <h3 className="text-lg font-bold mb-4 flex items-start gap-2" style={{ color: 'var(--text)' }}>
        <span className="flex-1">
          <span className="text-sm font-mono mr-2" style={{ color: 'var(--text-muted)' }}>{question.id}</span>
          {question.label}
          {question.required && <span style={{ color: 'var(--drk)' }}> *</span>}
        </span>
      </h3>
      <div className="space-y-2">
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

'use client';

import { useState } from 'react';
import type { Question, Locale } from '@/lib/types';

interface QuestionCardProps {
  question: Question;
  value: string | undefined;
  onChange: (questionId: string, value: string) => void;
  locale?: Locale;
}

export default function QuestionCard({ question, value, onChange, locale = 'de' }: QuestionCardProps) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="drk-card drk-fade-in">
      <h3 className="text-lg font-bold mb-4 flex items-start gap-2" style={{ color: 'var(--text)' }}>
        <span className="flex-1">
          <span className="text-sm font-mono mr-2" style={{ color: 'var(--text-muted)' }}>{question.id}</span>
          {question.text[locale]}
        </span>
        {question.helpText && (
          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold transition-colors"
            style={{
              background: showHelp ? 'var(--drk)' : 'var(--border)',
              color: showHelp ? '#fff' : 'var(--text-light)',
              minWidth: '28px',
              minHeight: '28px',
            }}
            title={locale === 'de' ? 'Hilfe anzeigen' : 'Show help'}
          >
            ?
          </button>
        )}
      </h3>
      {showHelp && question.helpText && (
        <div
          className="mb-4 p-3 rounded-lg text-sm"
          style={{ background: 'var(--drk-bg)', color: 'var(--text-light)', borderLeft: '3px solid var(--drk)' }}
        >
          {question.helpText[locale]}
        </div>
      )}
      <div className="space-y-2">
        {question.options.map((option) => {
          const isSelected = value === option.code;
          return (
            <label
              key={option.code}
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
                value={option.code}
                checked={isSelected}
                onChange={() => onChange(question.id, option.code)}
                className="mt-1 shrink-0"
                style={{ accentColor: 'var(--drk)' }}
              />
              <div>
                <span className="font-medium" style={{ color: 'var(--text)' }}>
                  {option.label[locale]}
                </span>
                {option.hint && (
                  <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {option.hint[locale]}
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

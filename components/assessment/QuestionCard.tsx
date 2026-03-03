'use client';

import type { Question, Locale } from '@/lib/types';

interface QuestionCardProps {
  question: Question;
  value: string | undefined;
  onChange: (questionId: string, value: string) => void;
  locale?: Locale;
}

export default function QuestionCard({ question, value, onChange, locale = 'de' }: QuestionCardProps) {
  return (
    <div className="drk-card drk-fade-in">
      <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>
        <span className="text-sm font-mono mr-2" style={{ color: 'var(--text-muted)' }}>{question.id}</span>
        {question.text[locale]}
      </h3>
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

'use client';

interface StepNavigationProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function StepNavigation({ steps, currentStep, onStepClick }: StepNavigationProps) {
  return (
    <div className="drk-card mb-6">
      {/* Desktop: full labels */}
      <div className="hidden md:flex items-center justify-between gap-1">
        {steps.map((label, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <button
              key={index}
              onClick={() => onStepClick(index)}
              className="flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-colors flex-1"
              style={{
                cursor: index <= currentStep ? 'pointer' : 'default',
                opacity: index > currentStep ? 0.4 : 1,
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                style={{
                  background: isActive ? 'var(--drk)' : isCompleted ? 'var(--success)' : 'var(--border)',
                  color: isActive || isCompleted ? '#fff' : 'var(--text-muted)',
                }}
              >
                {isCompleted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className="text-xs font-medium text-center leading-tight"
                style={{ color: isActive ? 'var(--drk)' : 'var(--text-muted)' }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile: compact numbered dots */}
      <div className="flex md:hidden items-center justify-between gap-1">
        {steps.map((_, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <button
              key={index}
              onClick={() => index <= currentStep && onStepClick(index)}
              className="flex-1 flex justify-center"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                style={{
                  background: isActive ? 'var(--drk)' : isCompleted ? 'var(--success)' : 'var(--border)',
                  color: isActive || isCompleted ? '#fff' : 'var(--text-muted)',
                }}
              >
                {isCompleted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
            </button>
          );
        })}
      </div>
      <div className="md:hidden text-center mt-2 text-sm font-medium" style={{ color: 'var(--text)' }}>
        {steps[currentStep]}
      </div>
    </div>
  );
}

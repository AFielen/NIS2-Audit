'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { WizardState, WizardAnswers, PolicyPack, Preset, Locale, QuestionId } from '@/lib/types';
import { questionBlocks } from '@/lib/questions';
import { loadWizardState, saveWizardState, createEmptyState, clearWizardState } from '@/lib/storage';
import { evaluateAssessment } from '@/lib/rules/evaluate';
import StepNavigation from './StepNavigation';
import PolicyPackSwitch from './PolicyPackSwitch';
import PresetSelector from './PresetSelector';
import QuestionCard from './QuestionCard';

const STEP_LABELS = [
  'Start & Regelstand',
  'Organisation',
  'Leistungen',
  'Schwellenwerte',
  'IT-Struktur',
  'Sicherheitsreife',
  'Nachweise',
  'Ergebnis',
];

const STEP_BLOCK_MAP: Record<number, string | null> = {
  0: null, // Start/Policy
  1: 'organisation',
  2: 'leistungen',
  3: 'schwellenwerte',
  4: 'it-kopplung',
  5: 'sicherheitsreife',
  6: 'nachweisniveau',
  7: null, // Result
};

interface AssessmentWizardProps {
  locale?: Locale;
}

export default function AssessmentWizard({ locale = 'de' }: AssessmentWizardProps) {
  const router = useRouter();
  const [state, setState] = useState<WizardState>(createEmptyState);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);

  // Load saved state on mount
  useEffect(() => {
    const saved = loadWizardState();
    if (saved && Object.keys(saved.answers).length > 0) {
      setShowResumePrompt(true);
      setState(saved);
    }
    setHasLoaded(true);
  }, []);

  // Auto-save on changes
  useEffect(() => {
    if (hasLoaded) {
      saveWizardState(state);
    }
  }, [state, hasLoaded]);

  const handleResume = useCallback(() => {
    setShowResumePrompt(false);
  }, []);

  const handleRestart = useCallback(() => {
    clearWizardState();
    setState(createEmptyState());
    setShowResumePrompt(false);
  }, []);

  const handlePolicyPackChange = useCallback((pack: PolicyPack) => {
    setState(prev => ({ ...prev, policyPack: pack }));
  }, []);

  const handlePresetChange = useCallback((preset: Preset | null) => {
    if (preset) {
      setState(prev => ({
        ...prev,
        selectedPreset: preset.id,
        answers: { ...prev.answers, ...preset.answers },
      }));
    } else {
      setState(prev => ({ ...prev, selectedPreset: null }));
    }
  }, []);

  const handleAnswerChange = useCallback((questionId: string, value: string) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value } as WizardAnswers,
    }));
  }, []);

  const handleStepChange = useCallback((step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNext = useCallback(() => {
    if (state.currentStep < STEP_LABELS.length - 1) {
      handleStepChange(state.currentStep + 1);
    }
  }, [state.currentStep, handleStepChange]);

  const handleBack = useCallback(() => {
    if (state.currentStep > 0) {
      handleStepChange(state.currentStep - 1);
    }
  }, [state.currentStep, handleStepChange]);

  const handleComplete = useCallback(() => {
    // Run evaluation and save result, then navigate
    const result = evaluateAssessment(state.answers, state.policyPack);
    try {
      localStorage.setItem('nis2-audit-result', JSON.stringify(result));
      localStorage.setItem('nis2-audit-answers', JSON.stringify(state.answers));
      localStorage.setItem('nis2-audit-policy', state.policyPack);
    } catch {
      // silently fail
    }
    router.push('/ergebnis');
  }, [state, router]);

  const isQuestionVisible = useCallback((q: { conditionalOn?: { questionId: QuestionId; values: string[] } }) => {
    if (!q.conditionalOn) return true;
    const depAnswer = state.answers[q.conditionalOn.questionId];
    return depAnswer != null && q.conditionalOn.values.includes(depAnswer as string);
  }, [state.answers]);

  if (!hasLoaded) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center" style={{ color: 'var(--text-muted)' }}>
          {locale === 'de' ? 'Laden...' : 'Loading...'}
        </div>
      </div>
    );
  }

  // Resume prompt
  if (showResumePrompt) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="drk-card text-center drk-fade-in">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            {locale === 'de' ? 'Vorherige Eingaben gefunden' : 'Previous entries found'}
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-light)' }}>
            {locale === 'de'
              ? 'Es wurden gespeicherte Eingaben gefunden. Möchten Sie diese fortsetzen oder neu beginnen?'
              : 'Saved entries were found. Would you like to resume or start over?'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={handleResume} className="drk-btn-primary">
              {locale === 'de' ? 'Fortsetzen' : 'Resume'}
            </button>
            <button onClick={handleRestart} className="drk-btn-secondary">
              {locale === 'de' ? 'Neu beginnen' : 'Start over'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Current block
  const currentBlockId = STEP_BLOCK_MAP[state.currentStep];
  const currentBlock = currentBlockId
    ? questionBlocks.find(b => b.id === currentBlockId)
    : null;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <StepNavigation
        steps={STEP_LABELS}
        currentStep={state.currentStep}
        onStepClick={handleStepChange}
      />

      {/* Step 0: Policy Pack + Presets */}
      {state.currentStep === 0 && (
        <div className="space-y-4 drk-fade-in">
          <PolicyPackSwitch
            value={state.policyPack}
            onChange={handlePolicyPackChange}
            locale={locale}
          />
          <PresetSelector
            value={state.selectedPreset}
            onChange={handlePresetChange}
            locale={locale}
          />
        </div>
      )}

      {/* Steps 1-6: Question blocks */}
      {currentBlock && (
        <div className="space-y-4 drk-fade-in">
          <div className="mb-4">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
              {currentBlock.title[locale]}
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-light)' }}>
              {currentBlock.description[locale]}
            </p>
          </div>
          {currentBlock.questions
            .filter(isQuestionVisible)
            .map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                value={state.answers[question.id] as string | undefined}
                onChange={handleAnswerChange}
                locale={locale}
              />
            ))}
        </div>
      )}

      {/* Step 7: Evaluation trigger */}
      {state.currentStep === 7 && (
        <div className="drk-card text-center drk-fade-in">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            {locale === 'de' ? 'Auswertung' : 'Assessment'}
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-light)' }}>
            {locale === 'de'
              ? 'Alle Angaben wurden erfasst. Starten Sie jetzt die Auswertung.'
              : 'All information has been captured. Start the assessment now.'}
          </p>
          <button onClick={handleComplete} className="drk-btn-primary text-lg px-8">
            {locale === 'de' ? 'Auswertung starten' : 'Start Assessment'}
          </button>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="drk-btn-secondary"
          disabled={state.currentStep === 0}
          style={{ opacity: state.currentStep === 0 ? 0.3 : 1 }}
        >
          {locale === 'de' ? 'Zurück' : 'Back'}
        </button>

        {state.currentStep < 7 && (
          <button onClick={handleNext} className="drk-btn-primary">
            {locale === 'de' ? 'Weiter' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
}

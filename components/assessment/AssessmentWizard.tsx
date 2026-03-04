'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { WizardState, WizardAnswers, Preset, RulesetQuestion, Grunddaten } from '@/lib/types';
import { loadWizardState, saveWizardState, createEmptyState, clearWizardState } from '@/lib/storage';
import { evaluateAssessment, getRulesetQuestions, getRulesetSections } from '@/lib/rules/evaluate';
import { decodeState } from '@/lib/state-codec';
import StepNavigation from './StepNavigation';
import PresetSelector from './PresetSelector';
import QuestionCard from './QuestionCard';

const SECTION_LABELS: Record<string, string> = {
  org: 'Organisation',
  ops: 'Leistungen',
  thresholds: 'Schwellenwerte',
  it: 'IT-Struktur',
  separation: 'Harte Trennung',
  security: 'Sicherheitsreife',
};

const SECTION_DESCRIPTIONS: Record<string, string> = {
  org: 'Organisationsmodell und Verbandsstruktur Ihres DRK-Kreisverbands.',
  ops: 'Rettungsdienstliche Leistungen und sektorale Zuordnung.',
  thresholds: 'Schwellenwerte des relevanten Rechtsträgers (VZÄ, Umsatz, Bilanzsumme).',
  it: 'Gemeinsame IT-Infrastruktur zwischen Einheiten.',
  separation: 'Harte technische Trennung zwischen Rettungsdienst und restlichem Verband.',
  security: 'Sicherheitsreife: 12 Kernkontrollen nach NIS-2/BSIG.',
};

export default function AssessmentWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<WizardState>(createEmptyState);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [qrRestored, setQrRestored] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Set<string>>(new Set());

  const questions = getRulesetQuestions() as RulesetQuestion[];
  const sections = getRulesetSections();

  // Build step labels: Start + each section + Ergebnis
  const stepLabels = ['Start', ...sections.map(s => SECTION_LABELS[s] || s), 'Ergebnis'];

  // Load saved state on mount OR restore from QR code
  useEffect(() => {
    const stateParam = searchParams.get('state');
    if (stateParam) {
      const decoded = decodeState(stateParam);
      if (decoded) {
        setState({
          answers: decoded.answers,
          grunddaten: decoded.grunddaten ?? { kreisverband: '', adresse: '', vorstand: '' },
          currentStep: 0,
          selectedPreset: null,
          timestamp: Date.now(),
        });
        setQrRestored(true);
        window.history.replaceState({}, '', '/check');
        setHasLoaded(true);
        return;
      }
    }

    const saved = loadWizardState();
    if (saved && Object.keys(saved.answers).length > 0) {
      setShowResumePrompt(true);
      setState(saved);
    }
    setHasLoaded(true);
  }, [searchParams]);

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

  const handleGrunddatenChange = useCallback((field: keyof Grunddaten, value: string | number | undefined) => {
    setState(prev => ({
      ...prev,
      grunddaten: { ...prev.grunddaten, [field]: value },
    }));
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

  const handleAnswerChange = useCallback((questionId: string, value: string | number) => {
    setState(prev => {
      const newAnswers = { ...prev.answers, [questionId]: value };

      // Auto-fill IT detail questions based on aggregate IT-OVERVIEW answer
      if (questionId === 'IT-OVERVIEW') {
        if (value === 'all_shared') {
          ['IT-01', 'IT-02', 'IT-03', 'IT-04'].forEach(id => { newAnswers[id] = 'yes'; });
          newAnswers['IT-05'] = 'none';
        } else if (value === 'all_separate') {
          ['IT-01', 'IT-02', 'IT-03', 'IT-04'].forEach(id => { newAnswers[id] = 'no'; });
          newAnswers['IT-05'] = 'clean';
        }
      }

      // Auto-fill separation detail questions based on aggregate SEP-OVERVIEW answer
      if (questionId === 'SEP-OVERVIEW') {
        if (value === 'full') {
          ['SEP-01', 'SEP-02', 'SEP-03', 'SEP-04', 'SEP-05', 'SEP-06', 'SEP-07', 'SEP-08'].forEach(id => {
            newAnswers[id] = 'yes';
          });
        } else if (value === 'none') {
          ['SEP-01', 'SEP-02', 'SEP-03', 'SEP-04', 'SEP-05', 'SEP-06', 'SEP-07', 'SEP-08'].forEach(id => {
            newAnswers[id] = 'no';
          });
        }
      }

      // Auto-sync Gesamt-VZÄ/Umsatz when ORG-01 = 'ev_only'
      // (Kreisverband = Rechtsträger, also gleiche Werte)
      let newGrunddaten = prev.grunddaten;
      const orgModel = questionId === 'ORG-01' ? value : newAnswers['ORG-01'];
      if (orgModel === 'ev_only') {
        if (questionId === 'THR-01' || questionId === 'ORG-01') {
          const vzae = typeof newAnswers['THR-01'] === 'number' ? newAnswers['THR-01'] as number : undefined;
          newGrunddaten = { ...newGrunddaten, gesamtVzae: vzae };
        }
        if (questionId === 'THR-02' || questionId === 'ORG-01') {
          const umsatz = typeof newAnswers['THR-02'] === 'number' ? newAnswers['THR-02'] as number : undefined;
          newGrunddaten = { ...newGrunddaten, gesamtUmsatz: umsatz };
        }
      }

      return { ...prev, answers: newAnswers, grunddaten: newGrunddaten };
    });
    setValidationErrors(prev => {
      const next = new Set(prev);
      next.delete(questionId);
      return next;
    });
  }, []);

  const handleStepChange = useCallback((step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const isQuestionVisible = useCallback((q: RulesetQuestion): boolean => {
    if (!q.visibleIf) return true;
    return q.visibleIf.every(cond => {
      const answer = state.answers[cond.questionId];
      if (cond.op === 'eq') return answer === cond.value;
      return true;
    });
  }, [state.answers]);

  const getVisibleQuestionsForSection = useCallback((section: string): RulesetQuestion[] => {
    return questions.filter(q => q.section === section && isQuestionVisible(q));
  }, [questions, isQuestionVisible]);

  const validateCurrentStep = useCallback((): boolean => {
    const stepIndex = state.currentStep;
    if (stepIndex === 0 || stepIndex === stepLabels.length - 1) return true;

    const sectionId = sections[stepIndex - 1];
    const visibleQuestions = getVisibleQuestionsForSection(sectionId);
    const errors = new Set<string>();

    for (const q of visibleQuestions) {
      if (q.required) {
        const answer = state.answers[q.id];
        if (answer == null || answer === '' || answer === undefined) {
          errors.add(q.id);
        }
      }
    }

    setValidationErrors(errors);
    return errors.size === 0;
  }, [state.currentStep, state.answers, sections, stepLabels.length, getVisibleQuestionsForSection]);

  const handleNext = useCallback(() => {
    if (!validateCurrentStep()) return;
    if (state.currentStep < stepLabels.length - 1) {
      handleStepChange(state.currentStep + 1);
    }
  }, [state.currentStep, stepLabels.length, handleStepChange, validateCurrentStep]);

  const handleBack = useCallback(() => {
    if (state.currentStep > 0) {
      setValidationErrors(new Set());
      handleStepChange(state.currentStep - 1);
    }
  }, [state.currentStep, handleStepChange]);

  const handleComplete = useCallback(() => {
    const result = evaluateAssessment(state.answers, state.grunddaten);
    try {
      localStorage.setItem('nis2-audit-result', JSON.stringify(result));
      localStorage.setItem('nis2-audit-answers', JSON.stringify(state.answers));
      localStorage.setItem('nis2-audit-grunddaten', JSON.stringify(state.grunddaten));
    } catch {
      // silently fail
    }
    router.push('/ergebnis');
  }, [state, router]);

  if (!hasLoaded) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center" style={{ color: 'var(--text-muted)' }}>
          Laden...
        </div>
      </div>
    );
  }

  if (showResumePrompt) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="drk-card text-center drk-fade-in">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Vorherige Eingaben gefunden
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-light)' }}>
            Es wurden gespeicherte Eingaben gefunden. Möchten Sie diese fortsetzen oder neu beginnen?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={handleResume} className="drk-btn-primary">
              Fortsetzen
            </button>
            <button onClick={handleRestart} className="drk-btn-secondary">
              Neu beginnen
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Current section
  const currentSectionIndex = state.currentStep - 1;
  const currentSection = currentSectionIndex >= 0 && currentSectionIndex < sections.length
    ? sections[currentSectionIndex]
    : null;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <StepNavigation
        steps={stepLabels}
        currentStep={state.currentStep}
        onStepClick={handleStepChange}
      />

      {/* QR restore success banner */}
      {qrRestored && (
        <div
          className="drk-card drk-fade-in flex items-start gap-3 mb-4"
          style={{ background: '#f0fdf4', borderLeft: '4px solid var(--success)' }}
        >
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm" style={{ color: 'var(--success)' }}>
              Daten aus QR-Code wiederhergestellt
            </div>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-light)' }}>
              Alle Antworten wurden erfolgreich aus dem QR-Code geladen. Sie können die Eingaben prüfen und anpassen.
            </p>
          </div>
          <button
            onClick={() => setQrRestored(false)}
            className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Schließen"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Step 0: Grunddaten + Presets */}
      {state.currentStep === 0 && (
        <div className="space-y-4 drk-fade-in">
          {/* Grunddaten für den Bericht */}
          <div className="drk-card">
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
              Grunddaten des Kreisverbands
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
              Diese Angaben erscheinen auf dem Ausdruck / PDF-Bericht.
            </p>
            <div className="space-y-3">
              <div>
                <label className="drk-label">Kreisverband / Gliederung</label>
                <input
                  type="text"
                  className="drk-input"
                  placeholder="z.B. DRK Kreisverband StädteRegion Aachen e.V."
                  maxLength={200}
                  value={state.grunddaten.kreisverband}
                  onChange={(e) => handleGrunddatenChange('kreisverband', e.target.value)}
                />
              </div>
              <div>
                <label className="drk-label">Adresse</label>
                <input
                  type="text"
                  className="drk-input"
                  placeholder="z.B. Henry-Dunant-Platz 1, 52146 Würselen"
                  maxLength={200}
                  value={state.grunddaten.adresse}
                  onChange={(e) => handleGrunddatenChange('adresse', e.target.value)}
                />
              </div>
              <div>
                <label className="drk-label">Vorstand / Kreisgeschäftsführer</label>
                <input
                  type="text"
                  className="drk-input"
                  placeholder="z.B. Max Mustermann"
                  maxLength={200}
                  value={state.grunddaten.vorstand}
                  onChange={(e) => handleGrunddatenChange('vorstand', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="drk-card">
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              Willkommen zum NIS-2 Self-Check
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-light)' }}>
              Wählen Sie optional ein Preset für Ihre typische Verbandsstruktur oder starten Sie direkt.
              Regelwerk: <strong>DRK Standard Pack v1.0</strong> — Rettungsdienst wird als potenziell NIS-2-relevante Einrichtungsart behandelt.
            </p>
          </div>
          <PresetSelector
            value={state.selectedPreset}
            onChange={handlePresetChange}
          />
        </div>
      )}

      {/* Question steps */}
      {currentSection && (
        <div className="space-y-4 drk-fade-in">
          <div className="mb-4">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
              {SECTION_LABELS[currentSection] || currentSection}
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-light)' }}>
              {SECTION_DESCRIPTIONS[currentSection] || ''}
            </p>
          </div>
          {getVisibleQuestionsForSection(currentSection).map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              value={state.answers[question.id]}
              onChange={handleAnswerChange}
              hasError={validationErrors.has(question.id)}
            />
          ))}

          {/* Gesamt-VZÄ und Gesamt-Umsatz auf der Schwellenwerte-Seite */}
          {currentSection === 'thresholds' && (
            <div className="drk-card">
              <h3 className="font-bold mb-1" style={{ color: 'var(--text)' }}>
                Gesamtverband — Größenklasse
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
                VZÄ und Umsatz des gesamten Kreisverbands (alle Bereiche). Bestimmt die Größenklasse (S/M/L) der Roadmap.
              </p>
              {state.answers['ORG-01'] === 'ev_only' && (
                <div
                  className="text-xs p-2 rounded-lg mb-3"
                  style={{ background: 'var(--info-bg)', color: 'var(--info)' }}
                >
                  Da alles im Kreisverband liegt, entsprechen die Gesamtwerte den Werten des Rechtsträgers.
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="drk-label">Gesamt-VZÄ des Verbands</label>
                  <input
                    type="number"
                    className="drk-input"
                    placeholder="z.B. 350"
                    min={0}
                    readOnly={state.answers['ORG-01'] === 'ev_only'}
                    style={state.answers['ORG-01'] === 'ev_only' ? { background: '#f3f4f6', cursor: 'not-allowed' } : undefined}
                    value={state.grunddaten.gesamtVzae ?? ''}
                    onChange={(e) => handleGrunddatenChange('gesamtVzae', e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
                <div>
                  <label className="drk-label">Gesamtumsatz des Verbands (TEUR)</label>
                  <input
                    type="number"
                    className="drk-input"
                    placeholder="z.B. 15000"
                    min={0}
                    readOnly={state.answers['ORG-01'] === 'ev_only'}
                    style={state.answers['ORG-01'] === 'ev_only' ? { background: '#f3f4f6', cursor: 'not-allowed' } : undefined}
                    value={state.grunddaten.gesamtUmsatz ?? ''}
                    onChange={(e) => handleGrunddatenChange('gesamtUmsatz', e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Final step: Evaluation trigger */}
      {state.currentStep === stepLabels.length - 1 && (
        <div className="drk-card text-center drk-fade-in">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Auswertung
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-light)' }}>
            Alle Angaben wurden erfasst. Starten Sie jetzt die Auswertung.
          </p>
          <button onClick={handleComplete} className="drk-btn-primary text-lg px-8">
            Auswertung starten
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
          Zurück
        </button>

        {state.currentStep < stepLabels.length - 1 && (
          <button onClick={handleNext} className="drk-btn-primary">
            Weiter
          </button>
        )}
      </div>
    </div>
  );
}

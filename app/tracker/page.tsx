'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { TrackerState, AufgabenStatus } from '@/lib/types';
import { TRACKER_AUFGABEN, PFLICHT_DOKUMENTE } from '@/lib/tracker/tracker-aufgaben';

const STATUS_STYLES: Record<AufgabenStatus, { bg: string; color: string; label: string }> = {
  offen:     { bg: '#fce4ec', color: '#c62828', label: 'Offen' },
  in_arbeit: { bg: '#fff3e0', color: '#e65100', label: 'In Arbeit' },
  erledigt:  { bg: '#e8f5e9', color: '#2e7d32', label: 'Erledigt' },
};

const PRIO_STYLES: Record<string, { bg: string; color: string }> = {
  kritisch: { bg: '#fce4ec', color: '#c62828' },
  hoch:     { bg: '#fff3e0', color: '#e65100' },
  mittel:   { bg: '#f5f5f5', color: '#757575' },
};

const STATUS_CYCLE: AufgabenStatus[] = ['offen', 'in_arbeit', 'erledigt'];

function nextStatus(current: AufgabenStatus): AufgabenStatus {
  const idx = STATUS_CYCLE.indexOf(current);
  return STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
}

function createInitialState(): TrackerState {
  const now = new Date().toISOString();
  const aufgaben: TrackerState['aufgaben'] = {};
  for (const a of TRACKER_AUFGABEN) {
    aufgaben[a.id] = { status: 'offen', verantwortlich: '', notiz: '' };
  }
  const dokumente: TrackerState['dokumente'] = {};
  for (const d of PFLICHT_DOKUMENTE) {
    dokumente[d.id] = { status: 'offen', verantwortlich: '', version: '' };
  }
  return { aufgaben, dokumente, startdatum: now, letzteAktualisierung: now };
}

export default function TrackerPage() {
  const [state, setState] = useState<TrackerState | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [activeTab, setActiveTab] = useState<'aufgaben' | 'dokumente'>('aufgaben');
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  useEffect(() => {
    try {
      const resultRaw = localStorage.getItem('nis2-audit-result');
      setHasResult(!!resultRaw);
      const raw = localStorage.getItem('nis2-tracker-state');
      if (raw) {
        setState(JSON.parse(raw));
      } else {
        setState(createInitialState());
      }
    } catch {
      setState(createInitialState());
    }
    setLoaded(true);
  }, []);

  const saveState = useCallback((updated: TrackerState) => {
    const withTimestamp = { ...updated, letzteAktualisierung: new Date().toISOString() };
    setState(withTimestamp);
    try {
      localStorage.setItem('nis2-tracker-state', JSON.stringify(withTimestamp));
    } catch { /* ignore */ }
  }, []);

  if (!loaded || !state) {
    return (
      <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] flex items-center justify-center">
        <div style={{ color: 'var(--text-muted)' }}>Laden...</div>
    </div>
    );
  }

  // Gate: Self-Check erforderlich
  if (!hasResult) {
    return (
      <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="drk-card text-center py-12">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" className="mx-auto mb-4">
              <path d="M9 7h6m0 10v-3m-3 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>Self-Check erforderlich</h2>
            <p className="mb-6" style={{ color: 'var(--text-light)' }}>
              Bitte führen Sie zuerst den NIS-2 Self-Check durch, bevor Sie den Compliance-Tracker nutzen können.
            </p>
            <Link href="/check" className="drk-btn-primary inline-block">
              Self-Check starten
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Progress calculation
  const aufgabenErledigt = Object.values(state.aufgaben).filter(a => a.status === 'erledigt').length;
  const dokumenteErledigt = Object.values(state.dokumente).filter(d => d.status === 'erledigt').length;
  const totalErledigt = aufgabenErledigt + dokumenteErledigt;
  const totalGesamt = TRACKER_AUFGABEN.length + PFLICHT_DOKUMENTE.length;
  const progressPct = totalGesamt > 0 ? Math.round((totalErledigt / totalGesamt) * 100) : 0;

  // Group tasks by phase
  const phases = [1, 2, 3] as const;
  const tasksByPhase = phases.map(phase => ({
    phase,
    label: TRACKER_AUFGABEN.find(a => a.phase === phase)?.phaseLabel ?? `Phase ${phase}`,
    tasks: TRACKER_AUFGABEN.filter(a => a.phase === phase),
  }));

  const toggleAufgabenStatus = (id: string) => {
    const current = state.aufgaben[id];
    if (!current) return;
    const newStatus = nextStatus(current.status);
    saveState({
      ...state,
      aufgaben: {
        ...state.aufgaben,
        [id]: {
          ...current,
          status: newStatus,
          erledigtAm: newStatus === 'erledigt' ? new Date().toISOString().split('T')[0] : current.erledigtAm,
        },
      },
    });
  };

  const updateAufgabenField = (id: string, field: 'verantwortlich' | 'notiz', value: string) => {
    const current = state.aufgaben[id];
    if (!current) return;
    saveState({
      ...state,
      aufgaben: { ...state.aufgaben, [id]: { ...current, [field]: value } },
    });
  };

  const toggleDokumentStatus = (id: string) => {
    const current = state.dokumente[id];
    if (!current) return;
    const newStatus = nextStatus(current.status);
    saveState({
      ...state,
      dokumente: { ...state.dokumente, [id]: { ...current, status: newStatus } },
    });
  };

  const updateDokumentField = (id: string, field: 'verantwortlich' | 'version', value: string) => {
    const current = state.dokumente[id];
    if (!current) return;
    saveState({
      ...state,
      dokumente: { ...state.dokumente, [id]: { ...current, [field]: value } },
    });
  };

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="drk-card drk-fade-in">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            NIS-2 Compliance-Tracker
          </h2>
          <p style={{ color: 'var(--text-light)' }}>
            21 Pflichtaufgaben und 18 Pflichtdokumente — alles an einem Ort.
          </p>
        </div>

        {/* Progress bar */}
        <div className="drk-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
              Gesamtfortschritt
            </span>
            <span className="text-sm font-bold" style={{ color: 'var(--drk)' }}>
              {totalErledigt} / {totalGesamt} erledigt ({progressPct}%)
            </span>
          </div>
          <div className="w-full h-4 rounded-full" style={{ background: 'var(--border)' }}>
            <div
              className="h-4 rounded-full transition-all duration-300"
              style={{ background: 'var(--drk)', width: `${progressPct}%` }}
            />
          </div>
          <div className="flex gap-4 mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span>Aufgaben: {aufgabenErledigt}/{TRACKER_AUFGABEN.length}</span>
            <span>Dokumente: {dokumenteErledigt}/{PFLICHT_DOKUMENTE.length}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 tracker-no-print">
          <button
            onClick={() => setActiveTab('aufgaben')}
            className={activeTab === 'aufgaben' ? 'drk-btn-primary' : 'drk-btn-secondary'}
          >
            Aufgaben ({TRACKER_AUFGABEN.length})
          </button>
          <button
            onClick={() => setActiveTab('dokumente')}
            className={activeTab === 'dokumente' ? 'drk-btn-primary' : 'drk-btn-secondary'}
          >
            Pflichtdokumente ({PFLICHT_DOKUMENTE.length})
          </button>
        </div>

        {/* Aufgaben Tab */}
        {activeTab === 'aufgaben' && (
          <div className="space-y-6">
            {tasksByPhase.map(({ phase, label, tasks }) => (
              <div key={phase}>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                  {label}
                </h3>
                <div className="space-y-3">
                  {tasks.map(task => {
                    const taskState = state.aufgaben[task.id] ?? { status: 'offen' as AufgabenStatus, verantwortlich: '', notiz: '' };
                    const ss = STATUS_STYLES[taskState.status];
                    const ps = PRIO_STYLES[task.prioritaet];
                    const isExpanded = expandedTask === task.id;

                    return (
                      <div key={task.id} className="drk-card">
                        <div className="flex items-start gap-3">
                          {/* Status toggle */}
                          <button
                            onClick={() => toggleAufgabenStatus(task.id)}
                            className="text-xs px-2 py-1 rounded-full font-semibold shrink-0 mt-0.5 cursor-pointer transition-colors"
                            style={{ background: ss.bg, color: ss.color }}
                            title="Klicken zum Ändern"
                          >
                            {ss.label}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{task.id}</span>
                                <h4 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{task.titel}</h4>
                              </div>
                              <span
                                className="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0"
                                style={{ background: ps.bg, color: ps.color }}
                              >
                                {task.prioritaet}
                              </span>
                            </div>

                            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                              {task.rechtsgrundlage} · Richtwert: {task.fristTage} Tage
                            </div>

                            <button
                              onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                              className="text-xs mt-1 flex items-center gap-1"
                              style={{ color: 'var(--drk)' }}
                            >
                              {isExpanded ? '▾' : '▸'} Details
                            </button>

                            {isExpanded && (
                              <div className="mt-2 space-y-2">
                                <p className="text-xs" style={{ color: 'var(--text-light)' }}>{task.beschreibung}</p>

                                {task.bsiLink && (
                                  <a
                                    href={task.bsiLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs underline block"
                                    style={{ color: 'var(--drk)' }}
                                  >
                                    BSI-Link →
                                  </a>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <div>
                                    <label className="text-xs font-semibold block mb-0.5" style={{ color: 'var(--text-muted)' }}>
                                      Verantwortlich
                                    </label>
                                    <input
                                      type="text"
                                      className="drk-input w-full text-xs"
                                      value={taskState.verantwortlich}
                                      onChange={e => updateAufgabenField(task.id, 'verantwortlich', e.target.value)}
                                      placeholder="Name / Rolle"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-semibold block mb-0.5" style={{ color: 'var(--text-muted)' }}>
                                      Notiz
                                    </label>
                                    <input
                                      type="text"
                                      className="drk-input w-full text-xs"
                                      value={taskState.notiz}
                                      onChange={e => updateAufgabenField(task.id, 'notiz', e.target.value)}
                                      placeholder="Freitext..."
                                    />
                                  </div>
                                </div>

                                {taskState.erledigtAm && taskState.status === 'erledigt' && (
                                  <div className="text-xs" style={{ color: 'var(--success)' }}>
                                    Erledigt am: {taskState.erledigtAm}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dokumente Tab */}
        {activeTab === 'dokumente' && (
          <div className="space-y-3">
            {PFLICHT_DOKUMENTE.map(dok => {
              const dokState = state.dokumente[dok.id] ?? { status: 'offen' as AufgabenStatus, verantwortlich: '', version: '' };
              const ss = STATUS_STYLES[dokState.status];

              return (
                <div key={dok.id} className="drk-card">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleDokumentStatus(dok.id)}
                      className="text-xs px-2 py-1 rounded-full font-semibold shrink-0 mt-0.5 cursor-pointer transition-colors"
                      style={{ background: ss.bg, color: ss.color }}
                      title="Klicken zum Ändern"
                    >
                      {ss.label}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          #{dok.nummer}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{dok.titel}</h4>
                          <p className="text-xs" style={{ color: 'var(--text-light)' }}>{dok.beschreibung}</p>
                          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{dok.rechtsgrundlage}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        <div>
                          <label className="text-xs font-semibold block mb-0.5" style={{ color: 'var(--text-muted)' }}>
                            Verantwortlich
                          </label>
                          <input
                            type="text"
                            className="drk-input w-full text-xs"
                            value={dokState.verantwortlich}
                            onChange={e => updateDokumentField(dok.id, 'verantwortlich', e.target.value)}
                            placeholder="Name / Rolle"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold block mb-0.5" style={{ color: 'var(--text-muted)' }}>
                            Version
                          </label>
                          <input
                            type="text"
                            className="drk-input w-full text-xs"
                            value={dokState.version}
                            onChange={e => updateDokumentField(dok.id, 'version', e.target.value)}
                            placeholder="z.B. V1.0 vom 01.03.2026"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Export */}
        <div className="drk-card text-center no-print">
          <button onClick={() => window.print()} className="drk-btn-primary">
            Checkliste drucken
          </button>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            Druckbare Übersicht aller Aufgaben und Dokumente
          </p>
        </div>
      </div>
    </div>
  );
}

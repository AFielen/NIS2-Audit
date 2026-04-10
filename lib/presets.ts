import type { Preset } from './types';

export const presets: Preset[] = [
  {
    id: 'kv-rd-abteilung',
    title: 'Kreisverband mit RD als Abteilung',
    description: 'Typischer Kreisverband – Rettungsdienst als Abteilung, zentrale IT, kein MSP-Betrieb.',
    answers: {
      'ORG-01': 'ev_only',
      'OPS-01': 'yes',
      'ORG-03': 'ev',
      'THR-01': 120,
      'MSP-01': 'no',
    },
  },
  {
    id: 'kv-rd-ggmbh',
    title: 'Kreisverband + Rettungsdienst-gGmbH',
    description: 'Kreisverband mit separater RD-gGmbH, geteilte IT-Infrastruktur, kein MSP-Betrieb.',
    answers: {
      'ORG-01': 'ev_plus_one_sub',
      'OPS-01': 'yes',
      'ORG-03': 'subsidiary',
      'MSP-01': 'no',
    },
  },
  {
    id: 'kv-rd-plus-zentral-it',
    title: 'KV mit RD + zentralem IT-Betrieb für Töchter',
    description: 'Doppelbetroffenheit: RD-gGmbH + KV betreibt zentral IT für mehrere Tochter-gGmbHs (MSP nach § 2 Nr. 26 BSIG).',
    answers: {
      'ORG-01': 'ev_plus_multi_sub',
      'OPS-01': 'yes',
      'ORG-03': 'multiple',
      'IT-01': 'yes',
      'IT-02': 'yes',
      'MSP-01': 'yes',
      'MSP-02': 'mixed',
      'MSP-03': 'daughter_companies',
      'MSP-04': 'yes_allocation',
      'MSP-05': 'kv_ev',
      'THR-01': 180,
    },
  },
  {
    id: 'kv-msp-only',
    title: 'KV als zentraler IT-Dienstleister (ohne RD)',
    description: 'Kreisverband ohne eigenen Rettungsdienst, aber zentraler IT-Betrieb für andere DRK-Einheiten / Tochter-gGmbHs — direkte NIS-2-Betroffenheit über Sektor Digitale Infrastruktur.',
    answers: {
      'ORG-01': 'ev_plus_multi_sub',
      'OPS-01': 'no',
      'MSP-01': 'yes',
      'MSP-02': 'identity',
      'MSP-03': 'daughter_companies',
      'MSP-04': 'yes_contract',
      'MSP-05': 'kv_ev',
      'THR-01': 75,
    },
  },
  {
    id: 'kv-msp-inhouse',
    title: 'KV mit IT nur für eigene jur. Person (Inhouse)',
    description: 'Kreisverband ohne RD, der IT ausschließlich für die eigene juristische Person betreibt — kein MSP-Status nach Recital 35 NIS-2 (Inhouse-Ausnahme).',
    answers: {
      'ORG-01': 'ev_only',
      'OPS-01': 'no',
      'MSP-01': 'yes',
      'MSP-02': 'mixed',
      'MSP-03': 'only_own',
      'MSP-04': 'no',
      'MSP-05': 'kv_ev',
    },
  },
];

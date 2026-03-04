import type { Preset } from './types';

export const presets: Preset[] = [
  {
    id: 'kv-rd-abteilung',
    title: 'Kreisverband mit RD als Abteilung',
    description: 'Typischer Kreisverband – Rettungsdienst als Abteilung, zentrale IT.',
    answers: {
      'ORG-01': 'ev_only',
      'OPS-01': 'yes',
      'ORG-03': 'ev',
      'THR-01': 120,
    },
  },
  {
    id: 'kv-rd-ggmbh',
    title: 'Kreisverband + Rettungsdienst-gGmbH',
    description: 'Kreisverband mit separater RD-gGmbH, geteilte IT-Infrastruktur.',
    answers: {
      'ORG-01': 'ev_plus_one_sub',
      'OPS-01': 'yes',
      'ORG-03': 'subsidiary',
    },
  },
  {
    id: 'kv-toechter-zentral-it',
    title: 'Kreisverband mit Töchtern + zentraler IT',
    description: 'KV mit mehreren Töchtern, zentralem IT-Betrieb, gemeinsamer Infrastruktur.',
    answers: {
      'ORG-01': 'ev_plus_multi_sub',
      'OPS-01': 'yes',
      'ORG-03': 'multiple',
      'IT-01': 'yes',
      'IT-02': 'yes',
    },
  },
];

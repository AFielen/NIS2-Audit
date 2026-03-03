import type { Preset } from './types';

export const presets: Preset[] = [
  {
    id: 'kv-rd-abteilung',
    title: {
      de: 'Kreisverband mit RD als Abteilung',
      en: 'District Association with EMS as Department',
    },
    description: {
      de: 'Typischer Kreisverband e.V. – der Rettungsdienst ist als Abteilung im Verein organisiert, zentrale IT.',
      en: 'Typical district association – EMS organized as department within the association, central IT.',
    },
    answers: {
      'ORG-01': 'KV',
      'ORG-02': 'EV_ABT',
      'ORG-03': 'ONE',
      'ORG-04': 'SAME',
      'ORG-05': 'CENTRAL_EV',
      'ORG-06': 'NO',
      'OPS-01': 'YES',
    },
  },
  {
    id: 'kv-rd-ggmbh',
    title: {
      de: 'Kreisverband + Rettungsdienst-gGmbH',
      en: 'District Association + EMS gGmbH',
    },
    description: {
      de: 'Kreisverband e.V. mit separater Rettungsdienst-gGmbH/GmbH, geteilte IT-Infrastruktur.',
      en: 'District association with separate EMS gGmbH/GmbH, shared IT infrastructure.',
    },
    answers: {
      'ORG-01': 'KV',
      'ORG-02': 'GGMBH',
      'ORG-03': 'TWO_THREE',
      'ORG-04': 'SAME',
      'ORG-05': 'CENTRAL_EV',
      'ORG-06': 'YES',
      'OPS-01': 'YES',
    },
  },
  {
    id: 'kv-toechter-zentral-it',
    title: {
      de: 'Kreisverband mit Töchtern + zentraler IT',
      en: 'District Association with Subsidiaries + Central IT',
    },
    description: {
      de: 'Kreisverband mit mehreren Tochtergesellschaften, zentralem IT-Betrieb und gemeinsamer Infrastruktur.',
      en: 'District association with multiple subsidiaries, central IT operations and shared infrastructure.',
    },
    answers: {
      'ORG-01': 'KV',
      'ORG-02': 'GGMBH',
      'ORG-03': 'FOUR_PLUS',
      'ORG-04': 'MIXED',
      'ORG-05': 'CENTRAL_EV',
      'ORG-06': 'YES',
      'OPS-01': 'YES',
      'OPS-04': 'YES',
      'IT-01': 'YES',
      'IT-02': 'YES',
      'IT-05': 'YES',
    },
  },
  {
    id: 'lv-ohne-rd',
    title: {
      de: 'Landesverband ohne eigenen RD, mit IT-Services',
      en: 'State Association without own EMS, with IT Services',
    },
    description: {
      de: 'Landesverband ohne eigenen operativen Rettungsdienst, aber mit zentralen IT-Diensten für Kreisverbände.',
      en: 'State association without own EMS operations, but with central IT services for district associations.',
    },
    answers: {
      'ORG-01': 'LV',
      'ORG-02': 'NO_RD',
      'ORG-03': 'ONE',
      'ORG-06': 'YES',
      'OPS-01': 'NO',
      'OPS-07': 'YES',
    },
  },
  {
    id: 'lv-mit-gesellschaften',
    title: {
      de: 'Landesverband mit operativen Gesellschaften',
      en: 'State Association with Operating Subsidiaries',
    },
    description: {
      de: 'Landesverband mit eigenen operativen Gesellschaften, die Rettungsdienst und weitere Leistungen erbringen.',
      en: 'State association with own operating subsidiaries providing EMS and other services.',
    },
    answers: {
      'ORG-01': 'LV',
      'ORG-02': 'GGMBH',
      'ORG-03': 'FOUR_PLUS',
      'ORG-04': 'MIXED',
      'ORG-05': 'CENTRAL_EV',
      'ORG-06': 'YES',
      'OPS-01': 'YES',
      'OPS-04': 'YES',
      'OPS-07': 'YES',
    },
  },
];

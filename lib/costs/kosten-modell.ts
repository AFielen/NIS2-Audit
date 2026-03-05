// Alle Kostenbereiche nach §30 BSIG Maßnahmen
// Quelle: Caritas-Netzwerk IT Analyse Feb 2026, DKG-Stellungnahmen, eigene Kalkulation

import type { KVGroesse, KostenBereich } from '@/lib/types';

export const KOSTEN_BEREICHE: KostenBereich[] = [
  {
    id: 'isms',
    label: 'ISMS-Aufbau & Risikoanalyse',
    paragraph: '§30 Nr. 1 BSIG',
    einmalig:  { S: [15000, 40000],  M: [40000, 100000],  L: [80000, 200000] },
    jaehrlich: { S: [5000,  12000],  M: [12000, 30000],   L: [25000, 60000]  },
    secQuestionIds: ['SEC-03'],
  },
  {
    id: 'netzwerk',
    label: 'Netzwerksegmentierung & Firewall',
    paragraph: '§30 Nr. 5 BSIG',
    einmalig:  { S: [10000, 30000],  M: [40000, 120000],  L: [100000, 250000] },
    jaehrlich: { S: [3000,  8000],   M: [8000,  20000],   L: [15000,  40000]  },
    secQuestionIds: ['SEC-06'],
  },
  {
    id: 'backup',
    label: 'Backup & Disaster Recovery (3-2-1)',
    paragraph: '§30 Nr. 3 BSIG',
    einmalig:  { S: [5000,  20000],  M: [20000, 70000],   L: [50000, 150000]  },
    jaehrlich: { S: [2000,  6000],   M: [6000,  20000],   L: [15000, 40000]   },
    secQuestionIds: ['SEC-07'],
  },
  {
    id: 'mfa',
    label: 'MFA-Rollout & IAM',
    paragraph: '§30 Nr. 10 BSIG',
    einmalig:  { S: [3000,  10000],  M: [10000, 35000],   L: [25000, 80000]   },
    jaehrlich: { S: [1000,  3000],   M: [3000,  10000],   L: [8000,  20000]   },
    secQuestionIds: ['SEC-04'],
  },
  {
    id: 'verschluesselung',
    label: 'Verschlüsselung (BitLocker, VPN, TLS)',
    paragraph: '§30 Nr. 8 BSIG',
    einmalig:  { S: [2000,  8000],   M: [8000,  25000],   L: [20000, 60000]   },
    jaehrlich: { S: [1000,  3000],   M: [3000,  8000],    L: [6000,  15000]   },
    secQuestionIds: ['SEC-14'],
  },
  {
    id: 'schulung',
    label: 'Awareness-Schulungen & GL-Pflichtschulung',
    paragraph: '§30 Nr. 7 + §38 BSIG',
    einmalig:  { S: [2000,  6000],   M: [6000,  20000],   L: [15000, 40000]   },
    jaehrlich: { S: [2000,  5000],   M: [5000,  15000],   L: [12000, 30000]   },
    secQuestionIds: ['SEC-16'],
  },
  {
    id: 'incident',
    label: 'Incident Response & Meldeprozess',
    paragraph: '§30 Nr. 2 + §32 BSIG',
    einmalig:  { S: [3000,  8000],   M: [8000,  20000],   L: [15000, 40000]   },
    jaehrlich: { S: [3000,  10000],  M: [10000, 30000],   L: [25000, 60000]   },
    secQuestionIds: ['SEC-09'],
  },
  {
    id: 'lieferkette',
    label: 'Lieferkettenmanagement',
    paragraph: '§30 Nr. 4 BSIG',
    einmalig:  { S: [2000,  6000],   M: [6000,  15000],   L: [10000, 30000]   },
    jaehrlich: { S: [1000,  3000],   M: [3000,  8000],    L: [5000,  15000]   },
    secQuestionIds: ['SEC-11'],
  },
  {
    id: 'isb',
    label: 'IT-Sicherheitsbeauftragte/r (ISB)',
    paragraph: '§38 BSIG',
    einmalig:  { S: [0, 0],          M: [0, 0],           L: [0, 0]           },
    jaehrlich: { S: [15000, 35000],  M: [35000, 80000],   L: [70000, 130000]  },
    secQuestionIds: ['SEC-01'],
  },
  {
    id: 'audit',
    label: 'Audits & Penetrationstests',
    paragraph: '§30 Nr. 6 BSIG',
    einmalig:  { S: [3000,  10000],  M: [10000, 25000],   L: [20000, 50000]   },
    jaehrlich: { S: [3000,  10000],  M: [8000,  25000],   L: [15000, 50000]   },
    secQuestionIds: ['SEC-12'],
  },
  {
    id: 'bsi_reg',
    label: 'BSI-Registrierung & Erstaudit',
    paragraph: '§§33-34 BSIG',
    einmalig:  { S: [2000,  5000],   M: [5000,  15000],   L: [10000, 25000]   },
    jaehrlich: { S: [0, 0],          M: [0, 0],           L: [0, 0]           },
  },
];

export const VERGLEICHSWERTE = {
  bundesregierungSchätzungEinmalig: 37060,
  bundesregierungSchätzungJaehrlich: 209000,
  ransomwareSchadenDurchschnitt: 2000000,
  ransomwareSchadenMaxCaritas: 23000000,
  busseldMaxWichtig: 7000000,
  busseldMaxBesondersWichtig: 10000000,
  busseldNichtRegistrierung: 500000,
} as const;

export type Vergleichswerte = typeof VERGLEICHSWERTE;

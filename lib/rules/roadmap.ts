import type { RoadmapPack, RoadmapPhase } from '../types';

export const roadmapPacks: Record<string, RoadmapPack> = {
  P1: {
    id: 'P1',
    title: { de: 'Governance & Haftung', en: 'Governance & Liability' },
    owner: { de: 'Vorstand / Geschäftsführung / IT-Leitung', en: 'Board / Management / IT Leadership' },
    content: {
      de: 'Beschluss zur NIS-2-Umsetzung, Verantwortliche benennen, Reporting-Struktur aufsetzen, Management-Schulung durchführen.',
      en: 'NIS-2 implementation resolution, designate responsible persons, set up reporting structure, conduct management training.',
    },
    horizonStart: 0,
    horizonEnd: 30,
  },
  P2: {
    id: 'P2',
    title: { de: 'Rechtsträger- & Schwellenwertprüfung', en: 'Legal Entity & Threshold Review' },
    owner: { de: 'GF / Finanzen / Recht / Compliance', en: 'Management / Finance / Legal / Compliance' },
    content: {
      de: 'Relevante Einheit bestimmen, VZÄ / Umsatz / Bilanzsumme je Rechtsträger dokumentieren, Schwellenwertprüfung belastbar abschließen.',
      en: 'Determine relevant entity, document FTEs / revenue / balance per legal entity, complete threshold assessment reliably.',
    },
    horizonStart: 0,
    horizonEnd: 15,
  },
  P3: {
    id: 'P3',
    title: { de: 'Registrierung & Meldeprozess', en: 'Registration & Reporting Process' },
    owner: { de: 'GF / Compliance / IT', en: 'Management / Compliance / IT' },
    content: {
      de: 'Registrierung beim BSI vorbereiten, Ansprechpartner benennen, 24h/72h/Abschlussbericht-Prozess definieren und dokumentieren.',
      en: 'Prepare BSI registration, designate contacts, define and document 24h/72h/final report process.',
    },
    horizonStart: 0,
    horizonEnd: 30,
  },
  P4: {
    id: 'P4',
    title: { de: 'Identity & Access', en: 'Identity & Access' },
    owner: { de: 'IT / Dienstleister', en: 'IT / Service Provider' },
    content: {
      de: 'MFA für alle privilegierten Konten, Admin-Trennung, Rollen-/Berechtigungskonzept, Tenant-/Domain-Abgrenzung prüfen und umsetzen.',
      en: 'MFA for all privileged accounts, admin separation, role/access concept, review and implement tenant/domain separation.',
    },
    horizonStart: 0,
    horizonEnd: 45,
  },
  P5: {
    id: 'P5',
    title: { de: 'Netzwerk & Segmentierung', en: 'Network & Segmentation' },
    owner: { de: 'IT / Dienstleister', en: 'IT / Service Provider' },
    content: {
      de: 'Netztrennung zwischen RD und restlichem Verband, Firewall-Regeln, VPN-Segmentierung, Schutz RD-naher Systeme.',
      en: 'Network separation between EMS and rest of association, firewall rules, VPN segmentation, protection of EMS-related systems.',
    },
    horizonStart: 0,
    horizonEnd: 60,
  },
  P6: {
    id: 'P6',
    title: { de: 'Backup / BCM / Wiederanlauf', en: 'Backup / BCM / Recovery' },
    owner: { de: 'IT / Fachbereich / Dienstleister', en: 'IT / Business Unit / Service Provider' },
    content: {
      de: 'Offline-Backup sicherstellen, Restore-Tests durchführen, Wiederanlaufpfade für RD-IT dokumentieren, RTO/RPO festlegen.',
      en: 'Ensure offline backup, perform restore tests, document recovery paths for EMS IT, define RTO/RPO.',
    },
    horizonStart: 0,
    horizonEnd: 60,
  },
  P7: {
    id: 'P7',
    title: { de: 'Incident Response & Logging', en: 'Incident Response & Logging' },
    owner: { de: 'IT / ISB-CISO / Dienstleister', en: 'IT / CISO / Service Provider' },
    content: {
      de: 'Logging und Monitoring aufbauen, Eskalationskette definieren, Forensik-Fähigkeit sicherstellen, Tabletop-Übung durchführen.',
      en: 'Set up logging and monitoring, define escalation chain, ensure forensic capability, conduct tabletop exercise.',
    },
    horizonStart: 0,
    horizonEnd: 60,
  },
  P8: {
    id: 'P8',
    title: { de: 'Lieferkette & Verträge', en: 'Supply Chain & Contracts' },
    owner: { de: 'Einkauf / IT / Recht', en: 'Procurement / IT / Legal' },
    content: {
      de: 'MSP- / Cloud-Prüfung, SLA-Review, Sicherheitsanforderungen vertraglich verankern, Kontaktwege dokumentieren.',
      en: 'MSP / cloud review, SLA review, contractually anchor security requirements, document contact channels.',
    },
    horizonStart: 30,
    horizonEnd: 90,
  },
  P9: {
    id: 'P9',
    title: { de: 'Dokumentation & Mock Audit', en: 'Documentation & Mock Audit' },
    owner: { de: 'IT / Compliance / Projektleitung', en: 'IT / Compliance / Project Management' },
    content: {
      de: 'Richtlinienpaket erstellen, Risikoanalyse dokumentieren, Nachweise zusammenführen, internes Probe-Audit durchführen.',
      en: 'Create policy package, document risk analysis, consolidate evidence, conduct internal mock audit.',
    },
    horizonStart: 60,
    horizonEnd: 90,
  },
  P10: {
    id: 'P10',
    title: { de: 'Harter Trennungsnachweis', en: 'Hard Separation Evidence' },
    owner: { de: 'IT-Architektur / externer Auditor', en: 'IT Architecture / External Auditor' },
    content: {
      de: 'Technische Trennung dokumentieren, Nachweiskette schließen, alle 8 Trennkriterien belegen.',
      en: 'Document technical separation, close evidence chain, prove all 8 separation criteria.',
    },
    horizonStart: 30,
    horizonEnd: 90,
  },
  P11: {
    id: 'P11',
    title: { de: 'Komplexe Verbundstruktur / juristische Review', en: 'Complex Group Structure / Legal Review' },
    owner: { de: 'GF / Recht / Projektleitung', en: 'Management / Legal / Project Management' },
    content: {
      de: 'Mischfälle bewerten, Scope konservativ festlegen, Ausnahmefälle dokumentieren, juristische Bewertung einholen.',
      en: 'Evaluate mixed cases, set scope conservatively, document exceptions, obtain legal assessment.',
    },
    horizonStart: 0,
    horizonEnd: 30,
  },
  P12: {
    id: 'P12',
    title: { de: 'Datenqualität & Nachweislage', en: 'Data Quality & Evidence Status' },
    owner: { de: 'Finanzen / HR / IT', en: 'Finance / HR / IT' },
    content: {
      de: 'VZÄ-Berechnung je Rechtsträger, Bilanz/Umsatz je Rechtsträger aufbereiten, Evidenzgrad erhöhen.',
      en: 'Calculate FTEs per legal entity, prepare balance/revenue per legal entity, increase evidence level.',
    },
    horizonStart: 0,
    horizonEnd: 30,
  },
};

export function generateRoadmap(triggeredPackIds: string[]): RoadmapPhase[] {
  const triggered = triggeredPackIds
    .map(id => roadmapPacks[id])
    .filter((p): p is RoadmapPack => p != null);

  const phases: RoadmapPhase[] = [
    {
      label: { de: '0–30 Tage', en: '0–30 Days' },
      startDay: 0,
      endDay: 30,
      packs: [],
    },
    {
      label: { de: '31–60 Tage', en: '31–60 Days' },
      startDay: 31,
      endDay: 60,
      packs: [],
    },
    {
      label: { de: '61–90 Tage', en: '61–90 Days' },
      startDay: 61,
      endDay: 90,
      packs: [],
    },
  ];

  for (const pack of triggered) {
    // Place pack in the earliest phase that overlaps with its horizon
    if (pack.horizonStart <= 30) {
      phases[0].packs.push(pack);
    } else if (pack.horizonStart <= 60) {
      phases[1].packs.push(pack);
    } else {
      phases[2].packs.push(pack);
    }
  }

  return phases;
}

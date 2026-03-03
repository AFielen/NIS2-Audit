import type { RoadmapLayer } from './types';

/** 90-Tage-Roadmap für große Organisationen (≥ 500 VZÄ) */
export const roadmap90L: RoadmapLayer = {
  id: 'roadmap90-L',
  title: '90-Tage-Roadmap (Groß, ≥ 500 VZÄ)',
  description: 'Umfassender Umsetzungsplan für große Kreisverbände mit komplexer Struktur. Professionelle Governance, parallele Workstreams, externe Unterstützung.',
  items: [
    {
      title: 'Tag 1–7: NIS-2-Projektorganisation aufsetzen',
      description: 'Dedizierter ISB (mind. 75% Stellenanteil). Steuerungsgruppe mit GF, IT-Leitung, ISB, Recht, Bereichsleitungen, ggf. Töchter. Wöchentliche Statusmeetings.',
      owner: 'Geschäftsführung',
      priority: 'hoch',
    },
    {
      title: 'Tag 1–15: MFA + Conditional Access gruppenübergreifend',
      description: 'MFA für alle Benutzer (nicht nur Admins) ausrollen. Conditional Access Policies für Geräte-Compliance, Standort, Risiko-Level einrichten.',
      owner: 'IT-Administration',
      priority: 'hoch',
    },
    {
      title: 'Tag 1–20: Backup-Architektur reviewen',
      description: '3-2-1-Regel validieren. Immutable Backups für kritische Systeme. Restore-Tests für Kernprozesse (RD-Leitstelle, ERP, E-Mail). RPO/RTO je System.',
      owner: 'IT-Administration',
      priority: 'hoch',
    },
    {
      title: 'Tag 7–20: CMDB + Kritikalitätsbewertung',
      description: 'Vollständige CMDB aufbauen/aktualisieren. Business-Impact-Analyse für Top-30-Systeme. Kritikalitätsstufen zuweisen.',
      owner: 'IT-Leitung / ISB',
      priority: 'hoch',
    },
    {
      title: 'Tag 10–30: Netzwerk-Segmentierung + Mikrosegmentierung',
      description: 'RD-Netz hart vom Verbandsnetz trennen. Mikrosegmentierung für kritische Server (Leitstelle, Domain Controller). Zero-Trust-Ansatz prüfen.',
      owner: 'IT-Administration / Dienstleister',
      priority: 'hoch',
    },
    {
      title: 'Tag 15–35: Enterprise Risk Assessment',
      description: 'Vollständige Risikoanalyse nach BSI IT-Grundschutz oder ISO 27005. Alle Geschäftsprozesse, Systeme und Schnittstellen bewerten. Risikobehandlungsplan.',
      owner: 'ISB / externe Beratung',
      priority: 'hoch',
    },
    {
      title: 'Tag 25–45: IR-Playbooks + SIEM-Integration',
      description: 'Incident-Response-Playbooks für Top-5-Szenarien (Ransomware, Datenleck, Insider, Lieferkette, DDoS). 24h/72h-Meldekette. SIEM-Alarmierung integrieren.',
      owner: 'ISB / IT-Security',
      priority: 'hoch',
    },
    {
      title: 'Tag 30–55: ISMS-Rahmenwerk + Richtlinien-Paket',
      description: 'ISMS-Handbuch (ISO 27001 oder BSI IT-Grundschutz). Mindestens 8 Richtlinien: IS-Leitlinie, Zugang, Kryptografie, Backup, BCM, IR, Lieferkette, Personal.',
      owner: 'ISB',
      priority: 'mittel',
    },
    {
      title: 'Tag 45–70: Supply-Chain-Security-Programm',
      description: 'Alle IT-Dienstleister und Cloud-Anbieter systematisch bewerten (Fragebogen, Zertifikate). Vertragliche Sicherheitsklauseln. Monitoring kritischer Lieferanten.',
      owner: 'IT-Leitung / Einkauf / Recht',
      priority: 'mittel',
    },
    {
      title: 'Tag 70–90: Internes Audit + Zertifizierungsvorbereitung',
      description: 'Internes Audit gegen NIS-2/BSIG-Anforderungen. Gap-Analyse mit Priorisierung. Ggf. externe Auditierung oder ISO-27001-Zertifizierung vorbereiten.',
      owner: 'ISB / externe Prüfer',
      priority: 'mittel',
    },
  ],
};

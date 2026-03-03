import type { RoadmapLayer } from './types';

/** 90-Tage-Roadmap für mittlere Organisationen (100–499 VZÄ) */
export const roadmap90M: RoadmapLayer = {
  id: 'roadmap90-M',
  title: '90-Tage-Roadmap (Mittel, 100–499 VZÄ)',
  description: 'Strukturierter Umsetzungsplan für mittelgroße Kreisverbände. Governance-Strukturen aufbauen, technische Maßnahmen systematisch umsetzen.',
  items: [
    {
      title: 'Tag 1–10: ISB benennen + Steuerungsgruppe NIS-2',
      description: 'IT-Sicherheitsbeauftragten (mind. 50% Stellenanteil) benennen. Steuerungsgruppe aus GF, IT-Leitung, ISB, Bereichsleitungen einrichten.',
      owner: 'Geschäftsführung',
      priority: 'hoch',
    },
    {
      title: 'Tag 1–15: MFA flächendeckend ausrollen',
      description: 'MFA für alle privilegierten Konten, Remote-Zugänge und nach Möglichkeit alle Benutzer aktivieren. Conditional Access Policies dokumentieren.',
      owner: 'IT-Administration',
      priority: 'hoch',
    },
    {
      title: 'Tag 1–20: Backup-Strategie überarbeiten',
      description: '3-2-1-Backup mit Offline-Kopie sicherstellen. Restore-Tests für kritische Systeme durchführen. RTO/RPO definieren.',
      owner: 'IT-Administration',
      priority: 'hoch',
    },
    {
      title: 'Tag 10–25: Asset-Inventar + CMDB aufbauen',
      description: 'Vollständiges IT-Asset-Inventar erstellen (Server, Clients, Netzwerk, Cloud, Mobilgeräte). Kritikalität je System bewerten.',
      owner: 'IT-Leitung',
      priority: 'hoch',
    },
    {
      title: 'Tag 15–30: Netzwerk-Segmentierung RD vs. Verband',
      description: 'RD-Netzwerk vom Verbandsnetzwerk mindestens logisch trennen (VLAN + Firewall-Regeln). Übergangspunkte dokumentieren.',
      owner: 'IT-Administration / Dienstleister',
      priority: 'hoch',
    },
    {
      title: 'Tag 20–40: Risikoanalyse nach BSI-Standard',
      description: 'Strukturierte Risikoanalyse für alle kritischen Prozesse/Systeme. Risikomatrix erstellen, Maßnahmen ableiten.',
      owner: 'ISB / IT-Leitung',
      priority: 'hoch',
    },
    {
      title: 'Tag 30–50: Incident-Response-Plan + Meldekette',
      description: 'IR-Playbook erstellen inkl. 24h/72h-BSI-Meldekette. Eskalationswege, Forensik-Kontakt, Kommunikationsplan. Tabletop-Übung planen.',
      owner: 'ISB / IT-Leitung',
      priority: 'hoch',
    },
    {
      title: 'Tag 40–60: Richtlinien-Paket erstellen und freigeben',
      description: 'IT-Sicherheitsrichtlinie, Passwort-Policy, Backup-Konzept, BCM-Konzept, Berechtigungskonzept erstellen und von GF freigeben lassen.',
      owner: 'ISB',
      priority: 'mittel',
    },
    {
      title: 'Tag 50–75: Lieferketten-Bewertung',
      description: 'IT-Dienstleister und Cloud-Anbieter systematisch bewerten. Sicherheitsanforderungen in Verträge aufnehmen. Abhängigkeiten dokumentieren.',
      owner: 'IT-Leitung / Verwaltung',
      priority: 'mittel',
    },
    {
      title: 'Tag 75–90: Mock-Audit + Gap-Analyse',
      description: 'Internen Mock-Audit gegen NIS-2/BSIG-Anforderungen durchführen. Gaps dokumentieren, Folgemaßnahmen priorisieren. Nachweisablage prüfen.',
      owner: 'ISB',
      priority: 'mittel',
    },
  ],
};

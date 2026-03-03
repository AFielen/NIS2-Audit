import type { RoadmapLayer } from './types';

/** 90-Tage-Roadmap für kleine Organisationen (< 100 VZÄ) */
export const roadmap90S: RoadmapLayer = {
  id: 'roadmap90-S',
  title: '90-Tage-Roadmap (Klein, < 100 VZÄ)',
  description: 'Priorisierter Umsetzungsplan für kleine Kreisverbände. Fokus auf pragmatische Maßnahmen mit minimalem Overhead.',
  items: [
    {
      title: 'Tag 1–10: ISB benennen + Projektauftrag',
      description: 'IT-Sicherheitsbeauftragten benennen (kann Teilzeit/nebenamtlich sein). Projektauftrag NIS-2-Compliance erstellen.',
      owner: 'Geschäftsführung',
      priority: 'hoch',
    },
    {
      title: 'Tag 1–15: MFA für alle Admins + Remote',
      description: 'MFA aktivieren: Entra ID Conditional Access oder vergleichbar. Priorität: Global Admins, Exchange Admins, VPN-Accounts.',
      owner: 'IT-Administration',
      priority: 'hoch',
    },
    {
      title: 'Tag 1–20: Backup prüfen und Offline-Kopie einrichten',
      description: 'Aktuellen Backup-Stand prüfen. Offline-Medium einführen (USB-HDD, Tape, Cloud-Immutable). Ersten Restore-Test dokumentieren.',
      owner: 'IT-Administration',
      priority: 'hoch',
    },
    {
      title: 'Tag 15–30: Asset-Liste und Netzplan erstellen',
      description: 'Alle Systeme inventarisieren (Server, Clients, Drucker, Netzwerk). Einfachen Netzplan mit Segmenten zeichnen.',
      owner: 'IT-Leitung',
      priority: 'hoch',
    },
    {
      title: 'Tag 15–30: Incident-Response-Kontaktkette',
      description: 'Wer ruft wen an bei IT-Vorfall? 24h-Erstmeldung an BSI vorbereiten. Einseitige Kontaktliste + Aushang.',
      owner: 'IT-Leitung',
      priority: 'hoch',
    },
    {
      title: 'Tag 30–50: Risikoanalyse Light',
      description: 'Top-10-Systeme identifizieren, Bedrohungen grob bewerten (Ransomware, Ausfall, Datenverlust). Ergebnis als einfache Tabelle.',
      owner: 'IT-Leitung / ISB',
      priority: 'mittel',
    },
    {
      title: 'Tag 30–60: Richtlinien-Paket erstellen',
      description: 'Mindest-Richtlinien: IT-Sicherheitsrichtlinie, Passwort-Policy, Backup-Konzept, Incident-Response-Plan. Vorlagen nutzen.',
      owner: 'ISB',
      priority: 'mittel',
    },
    {
      title: 'Tag 50–70: Dienstleister-Übersicht + Verträge prüfen',
      description: 'IT-Dienstleister und Cloud-Anbieter auflisten. AVVs prüfen, Sicherheitsanforderungen nachdokumentieren.',
      owner: 'IT-Leitung / Verwaltung',
      priority: 'mittel',
    },
    {
      title: 'Tag 70–90: Mock-Audit und Nachweise sammeln',
      description: 'Alle Nachweise an einem Ort sammeln. Gegen NIS-2-Kernanforderungen abgleichen. Lücken als Folgemaßnahmen erfassen.',
      owner: 'ISB',
      priority: 'niedrig',
    },
  ],
};

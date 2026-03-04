import type { RoadmapLayer } from './types';

export const grundschutz10: RoadmapLayer = {
  id: 'grundschutz10',
  title: 'Grundschutz-10 — Sicherheits-Basismaßnahmen',
  description: '10 Kernmaßnahmen, die jeder NIS-2-betroffene Kreisverband unabhängig von der Größe umsetzen sollte.',
  items: [
    {
      title: '1. Verantwortlichkeit benennen (ISB/CISO)',
      description: 'Eine verantwortliche Person für IT-Sicherheit benennen und dokumentieren. Muss nicht Vollzeit sein, aber klar mandatiert.',
      owner: 'Geschäftsführung',
      priority: 'hoch',
    },
    {
      title: '2. Asset-Inventar erstellen',
      description: 'Alle IT-Systeme, Server, Clients, Netzwerkgeräte und Cloud-Dienste erfassen. Mindestens: Hostname, Standort, Zweck, Verantwortlicher.',
      owner: 'IT-Leitung',
      priority: 'hoch',
    },
    {
      title: '3. MFA für privilegierte Konten aktivieren',
      description: 'Multi-Faktor-Authentifizierung für alle Admin-Accounts und Remote-Zugänge einrichten. Erste Quick-Win-Maßnahme.',
      owner: 'IT-Administration',
      priority: 'hoch',
    },
    {
      title: '4. Offline-Backup einrichten (3-2-1-Regel)',
      description: '3 Kopien, 2 Medien, 1 offline. Mindestens ein Backup muss getrennt vom Netzwerk aufbewahrt werden (Ransomware-Schutz).',
      owner: 'IT-Administration',
      priority: 'hoch',
    },
    {
      title: '5. Restore-Test durchführen',
      description: 'Wiederherstellung aus dem Backup tatsächlich testen. Ergebnis protokollieren. Empfehlung: mindestens 1× pro Quartal.',
      owner: 'IT-Administration',
      priority: 'hoch',
    },
    {
      title: '6. Incident-Response-Kontakte dokumentieren',
      description: 'Wer wird bei einem IT-Sicherheitsvorfall intern informiert? Wer meldet ans BSI (24h/72h)? Kontaktliste erstellen und zugänglich machen.',
      owner: 'IT-Leitung / Geschäftsführung',
      priority: 'hoch',
    },
    {
      title: '7. Netzwerk-Segmentierung prüfen',
      description: 'Rettungsdienst-IT und Verbands-IT mindestens auf VLAN-Ebene trennen. Firewall-Regeln zwischen Segmenten dokumentieren.',
      owner: 'IT-Administration / Dienstleister',
      priority: 'mittel',
    },
    {
      title: '8. Passwort-Richtlinie umsetzen',
      description: 'Mindestlänge 12 Zeichen, keine Wiederverwendung, Sperr-Policy nach Fehlversuchen. Dokumentiert und kommuniziert.',
      owner: 'IT-Administration',
      priority: 'mittel',
    },
    {
      title: '9. Patch-Management etablieren',
      description: 'Kritische Sicherheitsupdates innerhalb von 72h einspielen. Automatische Updates wo möglich. Patch-Stand regelmäßig prüfen.',
      owner: 'IT-Administration',
      priority: 'mittel',
    },
    {
      title: '10. Awareness-Maßnahme durchführen',
      description: 'Mindestens eine Sensibilisierungsmaßnahme für Mitarbeitende (Phishing, Social Engineering). Kann auch kurzer Workshop oder E-Learning sein.',
      owner: 'IT-Leitung / Personal',
      priority: 'niedrig',
    },
  ],
};

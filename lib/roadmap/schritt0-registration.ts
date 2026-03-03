import type { RoadmapLayer } from './types';

export const schritt0Registration: RoadmapLayer = {
  id: 'step0',
  title: 'Schritt 0 — BSI-Registrierung',
  description: 'Sofort-Maßnahmen vor Tag 1: Registrierung beim BSI und interne Zuständigkeiten klären.',
  items: [
    {
      title: 'Schwellenwerte finalisieren',
      description: 'VZÄ, Umsatz und Bilanzsumme des relevanten Rechtsträgers belastbar ermitteln und dokumentieren.',
      owner: 'Geschäftsführung / Controlling',
      priority: 'hoch',
    },
    {
      title: 'BSI-Registrierung vorbereiten und einreichen',
      description: 'Registrierung über das BSI-Portal vorbereiten. Frist: 06.03.2026 — auch danach noch möglich, aber Verzögerung erhöht Haftungsrisiko.',
      owner: 'IT-Leitung / ISB',
      priority: 'hoch',
    },
    {
      title: 'Interne Kontaktadresse festlegen',
      description: 'Kontaktstelle für BSI-Kommunikation benennen (NIS-2-Kontaktstelle). Funktionspostfach empfohlen.',
      owner: 'IT-Leitung',
      priority: 'hoch',
    },
    {
      title: 'Management-Briefing dokumentieren',
      description: 'Geschäftsführung/Vorstand über NIS-2-Pflichten und persönliche Haftung informieren. Schulungsnachweis sichern.',
      owner: 'Geschäftsführung',
      priority: 'hoch',
    },
  ],
};

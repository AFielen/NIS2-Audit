import type { QuestionBlock } from './types';

export const questionBlocks: QuestionBlock[] = [
  // ── Block A: Organisation ──
  {
    id: 'organisation',
    title: { de: 'Organisationsstruktur', en: 'Organizational Structure' },
    description: {
      de: 'Angaben zur Verbandsstruktur und zum Rettungsdienst.',
      en: 'Information about association structure and emergency services.',
    },
    questions: [
      {
        id: 'ORG-01',
        block: 'organisation',
        text: {
          de: 'Welcher DRK-Typ wird geprüft?',
          en: 'Which type of DRK entity is being assessed?',
        },
        options: [
          { code: 'KV', label: { de: 'Kreisverband', en: 'District Association' } },
          { code: 'LV', label: { de: 'Landesverband', en: 'State Association' } },
          { code: 'TG', label: { de: 'Tochtergesellschaft', en: 'Subsidiary' } },
          { code: 'SG', label: { de: 'Servicegesellschaft', en: 'Service Company' } },
        ],
      },
      {
        id: 'ORG-02',
        block: 'organisation',
        text: {
          de: 'Wie wird der Rettungsdienst organisatorisch betrieben?',
          en: 'How is the emergency medical service organized?',
        },
        options: [
          {
            code: 'EV_ABT',
            label: { de: 'Rettungsdienst als Abteilung im e.V./LV', en: 'EMS as department in registered association' },
            hint: { de: 'Der Rettungsdienst ist Teil des Vereins.', en: 'The EMS is part of the association.' },
          },
          {
            code: 'GGMBH',
            label: { de: 'Rettungsdienst in eigener gGmbH/GmbH', en: 'EMS in separate company (gGmbH/GmbH)' },
            hint: { de: 'Eine eigene Gesellschaft betreibt den Rettungsdienst.', en: 'A separate company operates the EMS.' },
          },
          {
            code: 'SPLIT',
            label: { de: 'Rettungsdienst auf mehrere Einheiten aufgesplittet', en: 'EMS split across multiple entities' },
            hint: { de: 'Personal, Betrieb oder Abrechnung sind auf verschiedene Einheiten verteilt.', en: 'Personnel, operations or billing are distributed across entities.' },
          },
          {
            code: 'NO_RD',
            label: { de: 'Kein Rettungsdienst', en: 'No emergency medical service' },
          },
        ],
      },
      {
        id: 'ORG-03',
        block: 'organisation',
        text: {
          de: 'Wie viele rechtlich selbständige Einheiten gibt es im Verbund?',
          en: 'How many legally independent entities exist in the association group?',
        },
        options: [
          { code: 'ONE', label: { de: '1', en: '1' } },
          { code: 'TWO_THREE', label: { de: '2–3', en: '2–3' } },
          { code: 'FOUR_PLUS', label: { de: '4 oder mehr', en: '4 or more' } },
        ],
      },
      {
        id: 'ORG-04',
        block: 'organisation',
        text: {
          de: 'Wer stellt das Personal für den Rettungsdienst?',
          en: 'Who provides personnel for the emergency medical service?',
        },
        options: [
          { code: 'SAME', label: { de: 'Gleicher Rechtsträger wie operativer Betreiber', en: 'Same legal entity as operator' } },
          { code: 'OTHER', label: { de: 'Anderer Rechtsträger', en: 'Different legal entity' } },
          { code: 'MIXED', label: { de: 'Gemischt', en: 'Mixed' } },
        ],
        conditionalOn: { questionId: 'ORG-02', values: ['EV_ABT', 'GGMBH', 'SPLIT'] },
      },
      {
        id: 'ORG-05',
        block: 'organisation',
        text: {
          de: 'Wer verantwortet die IT für den Rettungsdienst?',
          en: 'Who is responsible for IT for the emergency medical service?',
        },
        options: [
          { code: 'CENTRAL_EV', label: { de: 'Zentrale IT im e.V./Landesverband', en: 'Central IT in registered association' } },
          { code: 'CENTRAL_MSP', label: { de: 'Zentraler externer IT-Dienstleister', en: 'Central external IT service provider' } },
          { code: 'DECENTRAL', label: { de: 'Dezentrale IT je Einheit', en: 'Decentralized IT per entity' } },
          { code: 'MIXED', label: { de: 'Gemischt', en: 'Mixed' } },
        ],
      },
      {
        id: 'ORG-06',
        block: 'organisation',
        text: {
          de: 'Gibt es einen zentralen IT-Betrieb für mehrere Einheiten?',
          en: 'Is there a central IT operation for multiple entities?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
      },
    ],
  },

  // ── Block B: Leistungen / operative Trigger ──
  {
    id: 'leistungen',
    title: { de: 'Leistungen & operative Trigger', en: 'Services & Operational Triggers' },
    description: {
      de: 'Welche Leistungsbereiche werden betrieben?',
      en: 'Which service areas are operated?',
    },
    questions: [
      {
        id: 'OPS-01',
        block: 'leistungen',
        text: {
          de: 'Werden rettungsdienstliche Leistungen / Notfallrettung erbracht?',
          en: 'Are emergency medical services / emergency rescue provided?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
      },
      {
        id: 'OPS-02',
        block: 'leistungen',
        text: {
          de: 'Wird Krankentransport erbracht?',
          en: 'Is patient transport provided?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
      },
      {
        id: 'OPS-03',
        block: 'leistungen',
        text: {
          de: 'Gibt es einsatznahe Systeme (Dienstplanung, Einsatzdokumentation, mobile RD-Geräte etc.)?',
          en: 'Are there mission-critical systems (duty planning, mission documentation, mobile EMS devices, etc.)?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
      },
      {
        id: 'OPS-04',
        block: 'leistungen',
        text: {
          de: 'Werden Pflegeleistungen betrieben?',
          en: 'Are care services provided?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
      },
      {
        id: 'OPS-05',
        block: 'leistungen',
        text: {
          de: 'Werden Kitas / Jugendhilfe betrieben?',
          en: 'Are childcare / youth welfare services operated?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
      },
      {
        id: 'OPS-06',
        block: 'leistungen',
        text: {
          de: 'Gibt es Katastrophenschutzstrukturen mit eigener IT?',
          en: 'Are there disaster relief structures with their own IT?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
      },
      {
        id: 'OPS-07',
        block: 'leistungen',
        text: {
          de: 'Betreibt der Landesverband zentrale IT für Kreisverbände ohne eigene operative RD-Leistung?',
          en: 'Does the state association operate central IT for district associations without own EMS operations?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
        conditionalOn: { questionId: 'ORG-01', values: ['LV'] },
      },
    ],
  },

  // ── Block C: Schwellenwerte ──
  {
    id: 'schwellenwerte',
    title: { de: 'Schwellenwerte', en: 'Thresholds' },
    description: {
      de: 'Personalstärke und finanzielle Kennzahlen der maßgeblichen juristischen Einheit.',
      en: 'Workforce and financial figures of the relevant legal entity.',
    },
    questions: [
      {
        id: 'THR-01',
        block: 'schwellenwerte',
        text: {
          de: 'Wie viele VZÄ hat die maßgebliche juristische Einheit?',
          en: 'How many FTEs does the relevant legal entity have?',
        },
        options: [
          { code: 'LT50', label: { de: 'Unter 50 VZÄ', en: 'Under 50 FTEs' } },
          { code: '50_249', label: { de: '50 bis 249 VZÄ', en: '50 to 249 FTEs' } },
          { code: '250PLUS', label: { de: '250 oder mehr VZÄ', en: '250 or more FTEs' } },
        ],
      },
      {
        id: 'THR-02',
        block: 'schwellenwerte',
        text: {
          de: 'Wie hoch ist der Jahresumsatz der maßgeblichen juristischen Einheit?',
          en: 'What is the annual revenue of the relevant legal entity?',
        },
        options: [
          { code: 'LT10', label: { de: 'Unter 10 Mio. EUR', en: 'Under €10M' } },
          { code: '10_50', label: { de: '10 bis 50 Mio. EUR', en: '€10M to €50M' } },
          { code: 'GT50', label: { de: 'Über 50 Mio. EUR', en: 'Over €50M' } },
        ],
      },
      {
        id: 'THR-03',
        block: 'schwellenwerte',
        text: {
          de: 'Wie hoch ist die Bilanzsumme der maßgeblichen juristischen Einheit?',
          en: 'What is the balance sheet total of the relevant legal entity?',
        },
        options: [
          { code: 'LT10', label: { de: 'Unter 10 Mio. EUR', en: 'Under €10M' } },
          { code: '10_43', label: { de: '10 bis 43 Mio. EUR', en: '€10M to €43M' } },
          { code: 'GT43', label: { de: 'Über 43 Mio. EUR', en: 'Over €43M' } },
        ],
      },
      {
        id: 'THR-04',
        block: 'schwellenwerte',
        text: {
          de: 'Wie belastbar sind die Schwellenwertdaten?',
          en: 'How reliable is the threshold data?',
        },
        options: [
          { code: 'DOC', label: { de: 'Dokumentiert', en: 'Documented' }, hint: { de: 'Aus Jahresabschluss / HR-Auswertung', en: 'From annual report / HR evaluation' } },
          { code: 'EST', label: { de: 'Geschätzt', en: 'Estimated' } },
          { code: 'MISS', label: { de: 'Fehlt', en: 'Missing' } },
        ],
      },
      {
        id: 'THR-05',
        block: 'schwellenwerte',
        text: {
          de: 'Liegen die Zahlen je Rechtsträger vor?',
          en: 'Are figures available per legal entity?',
        },
        options: [
          { code: 'ENTITY', label: { de: 'Ja, je Rechtsträger', en: 'Yes, per legal entity' } },
          { code: 'CONSOL', label: { de: 'Nur konsolidiert', en: 'Consolidated only' } },
          { code: 'MIXED', label: { de: 'Teilweise / gemischt', en: 'Partially / mixed' } },
        ],
      },
    ],
  },

  // ── Block D: IT-Kopplung ──
  {
    id: 'it-kopplung',
    title: { de: 'IT-Struktur & Kopplung', en: 'IT Structure & Coupling' },
    description: {
      de: 'Gemeinsame IT-Infrastruktur zwischen Rettungsdienst und restlichem Verband.',
      en: 'Shared IT infrastructure between EMS and the rest of the association.',
    },
    questions: [
      {
        id: 'IT-01',
        block: 'it-kopplung',
        text: {
          de: 'Werden AD / Entra ID / SSO gemeinsam genutzt?',
          en: 'Are AD / Entra ID / SSO shared?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
      },
      {
        id: 'IT-02',
        block: 'it-kopplung',
        text: {
          de: 'Wird der M365-/Cloud-Tenant gemeinsam betrieben?',
          en: 'Is the M365/cloud tenant shared?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
      },
      {
        id: 'IT-03',
        block: 'it-kopplung',
        text: {
          de: 'Sind Firewall / VPN / Netzwerk gemeinsam?',
          en: 'Are firewall / VPN / network shared?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
      },
      {
        id: 'IT-04',
        block: 'it-kopplung',
        text: {
          de: 'Ist das Backup-System gemeinsam?',
          en: 'Is the backup system shared?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
      },
      {
        id: 'IT-05',
        block: 'it-kopplung',
        text: {
          de: 'Werden privilegierte Admin-Konten / Admin-Teams gemeinsam genutzt?',
          en: 'Are privileged admin accounts / admin teams shared?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
      },
      {
        id: 'IT-06',
        block: 'it-kopplung',
        text: {
          de: 'Werden Server / Virtualisierung / Storage gemeinsam genutzt?',
          en: 'Are servers / virtualization / storage shared?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
      },
      {
        id: 'IT-07',
        block: 'it-kopplung',
        text: {
          de: 'Werden Endpoint-Management / MDM gemeinsam genutzt?',
          en: 'Is endpoint management / MDM shared?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
      },
      {
        id: 'IT-08',
        block: 'it-kopplung',
        text: {
          de: 'Wird derselbe IT-Dienstleister / MSP für mehrere Einheiten genutzt?',
          en: 'Is the same IT service provider / MSP used for multiple entities?',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
      },
      {
        id: 'IT-09',
        block: 'it-kopplung',
        text: {
          de: 'Wie ist die Segmentierung zwischen Rettungsdienst und restlichem Verband?',
          en: 'What is the segmentation between EMS and the rest of the association?',
        },
        options: [
          { code: 'NONE', label: { de: 'Keine Segmentierung', en: 'No segmentation' } },
          { code: 'BASIC', label: { de: 'Rudimentär / nur VLANs / unvollständig', en: 'Basic / VLANs only / incomplete' } },
          { code: 'TESTED', label: { de: 'Dokumentiert und getestet', en: 'Documented and tested' } },
        ],
      },
      {
        id: 'IT-10',
        block: 'it-kopplung',
        text: {
          de: 'Gibt es getrennte Wiederanlaufpfade für Rettungsdienst-IT?',
          en: 'Are there separate recovery paths for EMS IT?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
      {
        id: 'IT-11',
        block: 'it-kopplung',
        text: {
          de: 'Gibt es eine getrennte Asset-Liste für rettungsdienstrelevante Systeme?',
          en: 'Is there a separate asset list for EMS-relevant systems?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
      {
        id: 'IT-12',
        block: 'it-kopplung',
        text: {
          de: 'Gibt es getrenntes Logging / Monitoring für rettungsdienstrelevante Systeme?',
          en: 'Is there separate logging / monitoring for EMS-relevant systems?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
      {
        id: 'IT-13',
        block: 'it-kopplung',
        text: {
          de: 'Gibt es einen dokumentierten Nachweis, dass Vorfälle im restlichen Verband die rettungsdienstliche Leistung nicht beeinträchtigen?',
          en: 'Is there documented evidence that incidents in the rest of the association do not affect EMS operations?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
    ],
  },

  // ── Block E: Sicherheitsreife ──
  {
    id: 'sicherheitsreife',
    title: { de: 'Sicherheitsreife', en: 'Security Maturity' },
    description: {
      de: '12 Kontrollen zur Einschätzung des Umsetzungsstands.',
      en: '12 controls to assess implementation status.',
    },
    questions: [
      {
        id: 'SEC-01',
        block: 'sicherheitsreife',
        text: {
          de: 'Ist eine verantwortliche Rolle für Informationssicherheit benannt?',
          en: 'Is a responsible role for information security designated?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
      {
        id: 'SEC-02',
        block: 'sicherheitsreife',
        text: {
          de: 'Hat die Geschäftsleitung eine NIS-2-/Cybersicherheits-Schulung erhalten?',
          en: 'Has management received NIS-2/cybersecurity training?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
      {
        id: 'SEC-03',
        block: 'sicherheitsreife',
        text: {
          de: 'Gibt es eine dokumentierte Risikoanalyse?',
          en: 'Is there a documented risk analysis?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
      {
        id: 'SEC-04',
        block: 'sicherheitsreife',
        text: {
          de: 'Ist MFA für privilegierte Konten vollständig umgesetzt?',
          en: 'Is MFA fully implemented for privileged accounts?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
      {
        id: 'SEC-05',
        block: 'sicherheitsreife',
        text: {
          de: 'Gibt es ein Rollen- und Berechtigungskonzept?',
          en: 'Is there a role and access management concept?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
      {
        id: 'SEC-06',
        block: 'sicherheitsreife',
        text: {
          de: 'Gibt es zentrales Logging / Monitoring für relevante Systeme?',
          en: 'Is there central logging / monitoring for relevant systems?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
      {
        id: 'SEC-07',
        block: 'sicherheitsreife',
        text: {
          de: 'Gibt es Offline-Backups und getestete Restore-Prozesse?',
          en: 'Are there offline backups and tested restore processes?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
      {
        id: 'SEC-08',
        block: 'sicherheitsreife',
        text: {
          de: 'Gibt es einen Incident-Response-Prozess inkl. 24h / 72h / Abschlussbericht?',
          en: 'Is there an incident response process incl. 24h / 72h / final report?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
      {
        id: 'SEC-09',
        block: 'sicherheitsreife',
        text: {
          de: 'Gibt es BCM / Wiederanlaufpläne für kritische Prozesse?',
          en: 'Are there BCM / recovery plans for critical processes?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
      {
        id: 'SEC-10',
        block: 'sicherheitsreife',
        text: {
          de: 'Sind kritische Dienstleister / Cloud-Lösungen bewertet und vertraglich adressiert?',
          en: 'Are critical service providers / cloud solutions assessed and contractually addressed?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
      {
        id: 'SEC-11',
        block: 'sicherheitsreife',
        text: {
          de: 'Gibt es freigegebene Richtlinien / Dokumentation?',
          en: 'Are there approved policies / documentation?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
      {
        id: 'SEC-12',
        block: 'sicherheitsreife',
        text: {
          de: 'Gibt es einen intern getesteten Meldeprozess?',
          en: 'Is there an internally tested reporting process?',
        },
        options: [
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
          { code: 'PARTIAL', label: { de: 'Teilweise', en: 'Partially' } },
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
        ],
      },
    ],
  },

  // ── Block F: Nachweisniveau ──
  {
    id: 'nachweisniveau',
    title: { de: 'Nachweisniveau', en: 'Evidence Level' },
    description: {
      de: 'Qualität der vorhandenen Nachweise für kritische Aussagen.',
      en: 'Quality of evidence for critical statements.',
    },
    questions: [
      {
        id: 'EVI-01',
        block: 'nachweisniveau',
        text: {
          de: 'Welches Nachweisniveau liegt insgesamt für die kritischen Aussagen vor?',
          en: 'What is the overall evidence level for critical statements?',
        },
        options: [
          {
            code: 'SELF',
            label: { de: 'Nur Selbstauskunft', en: 'Self-assessment only' },
            hint: { de: 'Fragebogen ohne Belege', en: 'Questionnaire without evidence' },
          },
          {
            code: 'INTERNAL',
            label: { de: 'Internes Dokument vorhanden', en: 'Internal document available' },
            hint: { de: 'Richtlinie / Architekturpapier', en: 'Policy / architecture document' },
          },
          {
            code: 'TECH',
            label: { de: 'Technischer Nachweis / Screenshot / Export vorhanden', en: 'Technical evidence / screenshot / export available' },
            hint: { de: 'Export / Screenshot', en: 'Export / screenshot' },
          },
          {
            code: 'EXTERNAL',
            label: { de: 'Externer Audit- oder Gutachternachweis', en: 'External audit or expert evidence' },
            hint: { de: 'Audit / Gutachten', en: 'Audit / expert report' },
          },
        ],
      },
    ],
  },
];

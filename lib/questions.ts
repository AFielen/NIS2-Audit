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
        helpText: {
          de: 'Wählen Sie die Rechtsform Ihrer DRK-Gliederung. Der Kreisverband (KV) ist der häufigste Typ. Tochtergesellschaften und Servicegesellschaften werden separat geprüft.',
          en: 'Select the legal form of your DRK entity. The district association (KV) is the most common type. Subsidiaries and service companies are assessed separately.',
        },
        options: [
          { code: 'KV', label: { de: 'Kreisverband (KV)', en: 'District Association' } },
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
        helpText: {
          de: 'Entscheidend ist, ob der Rettungsdienst direkt im KV als Abteilung läuft oder in einer eigenen Gesellschaft (z.B. gGmbH) ausgegliedert wurde. Das beeinflusst, welcher Rechtsträger juristisch betroffen ist.',
          en: 'The key question is whether EMS runs directly as a department in the KV or has been outsourced to a separate company (e.g. gGmbH). This affects which legal entity is legally affected.',
        },
        options: [
          {
            code: 'EV_ABT',
            label: { de: 'Rettungsdienst als Abteilung im KV', en: 'EMS as department in district association' },
            hint: { de: 'Der Rettungsdienst ist Teil des Kreisverbands.', en: 'The EMS is part of the district association.' },
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
        helpText: {
          de: 'Zählen Sie alle juristisch eigenständigen Einheiten: KV e.V., gGmbH, Servicegesellschaften etc. Mehrere Einheiten erhöhen die Komplexität der NIS-2-Bewertung erheblich.',
          en: 'Count all legally independent entities: KV e.V., gGmbH, service companies, etc. Multiple entities significantly increase the complexity of NIS-2 assessment.',
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
        helpText: {
          de: 'Falls Rettungsdienstpersonal von einem anderen Rechtsträger gestellt wird (z.B. der KV stellt Personal, die gGmbH betreibt den RD), entsteht eine komplexe Zuordnungsfrage für den NIS-2-Scope.',
          en: 'If EMS personnel is provided by a different legal entity (e.g. KV provides staff, gGmbH operates EMS), a complex attribution question arises for the NIS-2 scope.',
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
        helpText: {
          de: 'Die IT-Verantwortung bestimmt, ob der technische Scope sich über den juristischen Rechtsträger hinaus erstreckt. Zentrale IT im KV bedeutet in der Regel Shared IT.',
          en: 'IT responsibility determines whether the technical scope extends beyond the legal entity. Central IT in the KV usually means shared IT.',
        },
        options: [
          { code: 'CENTRAL_EV', label: { de: 'Zentrale IT im Kreisverband', en: 'Central IT in district association' } },
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
        helpText: {
          de: 'Ein zentraler IT-Betrieb (z.B. ein gemeinsames Rechenzentrum oder IT-Team für KV und gGmbH) erweitert den technischen Scope automatisch auf den Shared-IT-Layer.',
          en: 'A central IT operation (e.g. shared data center or IT team for KV and gGmbH) automatically extends the technical scope to the shared IT layer.',
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
        helpText: {
          de: 'Rettungsdienst ist der wichtigste sektorale Trigger im DRK-Kontext. Je nach gewähltem Regelstand wird Rettungsdienst automatisch als Gesundheitssektor-Trigger gewertet oder nicht.',
          en: 'Emergency medical service is the most important sector trigger in the DRK context. Depending on the selected policy pack, EMS is automatically considered a health sector trigger or not.',
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
        helpText: {
          de: 'Krankentransport ist kein automatischer NIS-2-Trigger, kann aber bei juristischer Prüfung relevant werden. Die Frage wird zur vollständigen Erfassung der Leistungsbereiche gestellt.',
          en: 'Patient transport is not an automatic NIS-2 trigger but may become relevant in legal review. This question is asked to fully capture service areas.',
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
        helpText: {
          de: 'Einsatznahe Systeme wie Dienstplanungssoftware, digitale Einsatzprotokolle oder Tablets im RTW gehören bei Betroffenheit zwingend in den NIS-2-Scope.',
          en: 'Mission-critical systems like duty planning software, digital mission protocols or tablets in ambulances must be included in NIS-2 scope if affected.',
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
        helpText: {
          de: 'Pflegeleistungen können einen zusätzlichen sektoralen Prüfbedarf auslösen, der über den Rettungsdienst-Kern hinausgeht. Shared IT mit Pflege-IT erweitert den technischen Scope.',
          en: 'Care services may trigger additional sectoral review needs beyond the EMS core. Shared IT with care IT extends the technical scope.',
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
        helpText: {
          de: 'Kitas und Jugendhilfe erzeugen keinen eigenen NIS-2-Trigger, aber ihre IT-Systeme können über Shared IT den technischen Scope erweitern.',
          en: 'Childcare and youth welfare do not create their own NIS-2 trigger, but their IT systems can extend the technical scope via shared IT.',
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
        helpText: {
          de: 'Katastrophenschutz-IT (z.B. Funknetze, Lagekarten, Einsatzleitsysteme) muss bei der BCM-Planung und Krisenkommunikation mitbetrachtet werden.',
          en: 'Disaster relief IT (e.g. radio networks, situation maps, command systems) must be considered in BCM planning and crisis communication.',
        },
        options: [
          { code: 'YES', label: { de: 'Ja', en: 'Yes' } },
          { code: 'NO', label: { de: 'Nein', en: 'No' } },
        ],
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
        helpText: {
          de: 'VZÄ = Vollzeitäquivalente. Zählen Sie nur die Mitarbeitenden des relevanten Rechtsträgers, nicht des gesamten Verbunds. Ab 50 VZÄ wird der Schwellenwert "wichtige Einrichtung" erreicht.',
          en: 'FTE = Full-Time Equivalents. Count only the employees of the relevant legal entity, not the entire group. From 50 FTEs the "important entity" threshold is reached.',
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
        helpText: {
          de: 'Geben Sie den Jahresumsatz des relevanten Rechtsträgers an (nicht konsolidiert). Ab 10 Mio. EUR in Kombination mit der Bilanzsumme wird der Schwellenwert relevant.',
          en: 'Enter the annual revenue of the relevant legal entity (not consolidated). From €10M in combination with balance sheet total the threshold becomes relevant.',
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
        helpText: {
          de: 'Die Bilanzsumme ist der zweite finanzielle Schwellenwert neben dem Umsatz. Beide müssen gemeinsam die Grenze überschreiten (Umsatz UND Bilanzsumme), um den finanziellen Trigger auszulösen.',
          en: 'The balance sheet total is the second financial threshold alongside revenue. Both must jointly exceed the limit (revenue AND balance sheet) to trigger the financial threshold.',
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
        helpText: {
          de: 'Geschätzte oder fehlende Daten führen zu einem unsicheren Ergebnis (Ergebnis D). Nutzen Sie idealerweise den Jahresabschluss oder die HR-Auswertung als Quelle.',
          en: 'Estimated or missing data lead to an uncertain result (Outcome D). Ideally use the annual report or HR evaluation as source.',
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
        helpText: {
          de: 'NIS-2 prüft Schwellenwerte je Rechtsträger, nicht konsolidiert. Wenn nur Gesamtzahlen vorliegen, ist keine belastbare Einzelbewertung möglich.',
          en: 'NIS-2 checks thresholds per legal entity, not consolidated. If only aggregate numbers are available, no reliable individual assessment is possible.',
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
        helpText: {
          de: 'Gemeinsames Active Directory oder Entra ID bedeutet, dass ein Angriff auf die Identitätsinfrastruktur sowohl RD als auch den restlichen Verband betrifft. Das ist ein zentrales Trennkriterium.',
          en: 'Shared Active Directory or Entra ID means an attack on identity infrastructure affects both EMS and the rest of the association. This is a key separation criterion.',
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
        helpText: {
          de: 'Ein gemeinsamer Microsoft 365- oder Cloud-Tenant bedeutet geteilte Daten, Berechtigungen und Angriffsfläche. Für eine harte Trennung müssen getrennte Tenants vorliegen.',
          en: 'A shared Microsoft 365 or cloud tenant means shared data, permissions and attack surface. For hard separation, separate tenants must exist.',
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
        helpText: {
          de: 'Gemeinsame Netzwerkinfrastruktur (Firewall, VPN, Switches) bedeutet, dass ein Netzwerkangriff beide Bereiche trifft. Ohne getrennte Netzwerke ist keine harte Trennung möglich.',
          en: 'Shared network infrastructure (firewall, VPN, switches) means a network attack hits both areas. Without separated networks, hard separation is not possible.',
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
        helpText: {
          de: 'Ein gemeinsames Backup-System bedeutet, dass bei einem Ransomware-Angriff beide Bereiche gleichzeitig betroffen sein können. Getrennte Offline-Backups sind kritisch.',
          en: 'A shared backup system means both areas can be affected simultaneously in a ransomware attack. Separate offline backups are critical.',
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
        helpText: {
          de: 'Gemeinsame Admin-Konten sind einer der kritischsten Shared-IT-Faktoren. Ein kompromittiertes Admin-Konto gibt Zugriff auf beide Bereiche gleichzeitig.',
          en: 'Shared admin accounts are one of the most critical shared IT factors. A compromised admin account gives access to both areas simultaneously.',
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
        helpText: {
          de: 'Gemeinsame Server oder Virtualisierungsplattformen (z.B. VMware, Hyper-V) bedeuten, dass ein Angriff auf den Hypervisor alle Systeme betrifft.',
          en: 'Shared servers or virtualization platforms (e.g. VMware, Hyper-V) mean an attack on the hypervisor affects all systems.',
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
        helpText: {
          de: 'Gemeinsames Endpoint-Management (z.B. Intune, SCCM) oder Mobile Device Management bedeutet, dass Endgeräte beider Bereiche zentral verwaltet werden und ein Angriff beide trifft.',
          en: 'Shared endpoint management (e.g. Intune, SCCM) or MDM means devices from both areas are centrally managed and an attack affects both.',
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
        helpText: {
          de: 'Ein gemeinsamer Managed Service Provider (MSP) erhöht das Lieferkettenrisiko: Wird der MSP kompromittiert, sind alle betreuten Einheiten betroffen.',
          en: 'A shared Managed Service Provider (MSP) increases supply chain risk: if the MSP is compromised, all managed entities are affected.',
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
        helpText: {
          de: 'Nur eine dokumentierte und getestete Segmentierung (nicht bloß VLANs) zählt als Trennkriterium. "Getestet" bedeutet: Penetrationstest oder vergleichbare Prüfung hat die Wirksamkeit bestätigt.',
          en: 'Only documented and tested segmentation (not just VLANs) counts as separation criterion. "Tested" means: penetration test or comparable review confirmed effectiveness.',
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
        helpText: {
          de: 'Getrennte Wiederanlaufpfade bedeuten, dass die RD-IT unabhängig vom restlichen Verband wiederhergestellt werden kann – z.B. mit eigenen Backups und eigener Recovery-Umgebung.',
          en: 'Separate recovery paths mean EMS IT can be restored independently from the rest of the association – e.g. with own backups and own recovery environment.',
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
        helpText: {
          de: 'Eine getrennte Asset-Liste dokumentiert, welche Systeme zum RD gehören. Ohne diese Liste kann der Scope nicht sauber abgegrenzt werden.',
          en: 'A separate asset list documents which systems belong to EMS. Without this list, the scope cannot be clearly delimited.',
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
        helpText: {
          de: 'Getrenntes Logging ermöglicht bei einem Vorfall die forensische Aufklärung, ohne dass Logdaten des restlichen Verbands betroffen sind. Es ist ein Kriterium für die harte Trennung.',
          en: 'Separate logging enables forensic investigation during an incident without log data from the rest of the association being affected. It is a criterion for hard separation.',
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
        helpText: {
          de: 'Dies ist das achte Trennkriterium: Ein dokumentierter Impact-Nachweis belegt, dass ein IT-Vorfall im restlichen Verband den Rettungsdienst nicht beeinträchtigt (z.B. durch Test oder Gutachten).',
          en: 'This is the eighth separation criterion: documented impact proof that an IT incident in the rest of the association does not affect EMS (e.g. through test or expert report).',
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
        helpText: {
          de: 'NIS-2 fordert eine klar benannte Verantwortung für Informationssicherheit. Das kann ein ISB, CISO oder eine vergleichbare Funktion sein – nicht zwingend eine Vollzeitstelle.',
          en: 'NIS-2 requires clearly designated responsibility for information security. This can be an ISM, CISO or comparable function – not necessarily a full-time position.',
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
        helpText: {
          de: 'NIS-2 sieht eine persönliche Haftung der Geschäftsleitung vor. Schulungen zu Cybersicherheit und NIS-2-Pflichten sind daher gesetzlich erforderlich.',
          en: 'NIS-2 provides for personal liability of management. Training on cybersecurity and NIS-2 obligations is therefore legally required.',
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
        helpText: {
          de: 'Eine Risikoanalyse identifiziert und bewertet IT-Risiken systematisch. NIS-2 fordert einen risikobasierten Ansatz für alle Sicherheitsmaßnahmen.',
          en: 'A risk analysis systematically identifies and evaluates IT risks. NIS-2 requires a risk-based approach for all security measures.',
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
        helpText: {
          de: 'Multi-Faktor-Authentifizierung (MFA) für Admin-Konten ist eine der wirksamsten Schutzmaßnahmen. "Vollständig" bedeutet: alle privilegierten Konten, ohne Ausnahme.',
          en: 'Multi-factor authentication (MFA) for admin accounts is one of the most effective protective measures. "Fully" means: all privileged accounts, without exception.',
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
        helpText: {
          de: 'Ein Rollen- und Berechtigungskonzept regelt, wer auf welche Systeme und Daten zugreifen darf. Es sollte nach dem Prinzip der minimalen Rechte aufgebaut sein.',
          en: 'A role and access management concept defines who may access which systems and data. It should follow the principle of least privilege.',
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
        helpText: {
          de: 'Zentrales Logging sammelt Sicherheitsereignisse aller relevanten Systeme. Ohne Logging können Angriffe nicht erkannt und NIS-2-Meldepflichten nicht eingehalten werden.',
          en: 'Central logging collects security events from all relevant systems. Without logging, attacks cannot be detected and NIS-2 reporting obligations cannot be met.',
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
        helpText: {
          de: 'Offline-Backups sind immun gegen Ransomware. "Getestet" bedeutet: Es wurde erfolgreich ein Restore durchgeführt und die Wiederherstellungszeit ist bekannt.',
          en: 'Offline backups are immune to ransomware. "Tested" means: a restore was successfully performed and the recovery time is known.',
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
        helpText: {
          de: 'NIS-2 schreibt feste Meldefristen vor: Erstmeldung innerhalb 24h, Statusbericht innerhalb 72h, Abschlussbericht innerhalb eines Monats. Der Prozess muss vorab definiert sein.',
          en: 'NIS-2 prescribes fixed reporting deadlines: initial report within 24h, status report within 72h, final report within one month. The process must be defined in advance.',
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
        helpText: {
          de: 'BCM (Business Continuity Management) definiert, wie kritische Prozesse bei einem IT-Ausfall weiterlaufen. Für den Rettungsdienst ist das besonders zeitkritisch.',
          en: 'BCM (Business Continuity Management) defines how critical processes continue during an IT outage. For emergency services this is especially time-critical.',
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
        helpText: {
          de: 'NIS-2 fordert die Absicherung der Lieferkette. Kritische IT-Dienstleister und Cloud-Anbieter müssen bewertet und Sicherheitsanforderungen vertraglich fixiert sein.',
          en: 'NIS-2 requires supply chain security. Critical IT service providers and cloud vendors must be assessed and security requirements contractually fixed.',
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
        helpText: {
          de: 'Freigegebene Richtlinien (z.B. IT-Sicherheitsrichtlinie, Passwortpolicy) sind ein Nachweis dafür, dass Sicherheit organisatorisch verankert ist. "Freigegeben" bedeutet: von der Geschäftsleitung unterzeichnet.',
          en: 'Approved policies (e.g. IT security policy, password policy) demonstrate that security is organizationally anchored. "Approved" means: signed by management.',
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
        helpText: {
          de: 'Ein intern getesteter Meldeprozess bedeutet: Es wurde eine Übung durchgeführt, bei der ein simulierter Vorfall die Meldekette (intern + an BSI) getestet hat.',
          en: 'An internally tested reporting process means: an exercise was conducted where a simulated incident tested the reporting chain (internal + to BSI).',
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
        helpText: {
          de: 'Das Nachweisniveau bestimmt, wie belastbar Ihre Angaben sind. Reine Selbstauskunft reicht für eine interne Einschätzung, aber für eine harte Trennung sind technische oder externe Nachweise nötig.',
          en: 'The evidence level determines how reliable your statements are. Pure self-assessment suffices for internal estimation, but hard separation requires technical or external evidence.',
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

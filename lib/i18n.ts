export type Locale = 'de' | 'en';

// ── Gemeinsame Übersetzungen (in jeder DRK-App gleich) ──
const shared = {
  de: {
    'nav.impressum': 'Impressum',
    'nav.datenschutz': 'Datenschutz',
    'nav.hilfe': 'Hilfe',
    'nav.language': 'EN',
    'footer.copyright': '© {year} DRK Kreisverband StädteRegion Aachen e.V.',
    'footer.tagline': 'Open Source · Kostenlos · DSGVO-konform · Gebaut mit ❤️ für das Deutsche Rote Kreuz',
    'common.yes': 'Ja',
    'common.no': 'Nein',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.back': 'Zurück',
    'common.next': 'Weiter',
    'common.close': 'Schließen',
    'common.loading': 'Laden...',
    'common.error': 'Fehler',
    'common.success': 'Erfolgreich',
    'error.notfound': 'Seite nicht gefunden',
    'error.notfound.desc': 'Die angeforderte Seite existiert nicht.',
    'error.notfound.back': 'Zurück zur Startseite',
  },
  en: {
    'nav.impressum': 'Legal Notice',
    'nav.datenschutz': 'Privacy Policy',
    'nav.hilfe': 'Help',
    'nav.language': 'DE',
    'footer.copyright': '© {year} German Red Cross, District Association StädteRegion Aachen',
    'footer.tagline': 'Open Source · Free · GDPR-compliant · Built with ❤️ for the German Red Cross',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.close': 'Close',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'error.notfound': 'Page not found',
    'error.notfound.desc': 'The requested page does not exist.',
    'error.notfound.back': 'Back to home',
  },
} as const;

// ── App-spezifische Übersetzungen (hier pro App erweitern) ──
const appTranslations = {
  de: {
    'app.title': 'NIS-2 Audit',
    'app.subtitle': 'Self-Check für Rettungsdienst, Verbundstruktur und Shared IT im DRK',
    'app.description': 'DRK-spezifische NIS-2-Betroffenheitsanalyse mit Ergebnislogik, Scope-Bewertung und 90-Tage-Roadmap.',
    // Landing
    'landing.hero.title': 'NIS-2 Self-Check für DRK-Verbände',
    'landing.hero.subtitle': 'Prüfen Sie in 10–15 Minuten die wahrscheinliche NIS-2-Betroffenheit Ihres Verbands.',
    'landing.cta': 'Self-Check starten',
    'landing.card1.title': 'Betroffenheit prüfen',
    'landing.card1.desc': 'Juristische Einordnung anhand von Organisationsstruktur, Leistungen und Schwellenwerten.',
    'landing.card2.title': 'Scope bewerten',
    'landing.card2.desc': 'Juristischen und technischen Scope getrennt ausweisen – inkl. Shared-IT-Analyse.',
    'landing.card3.title': 'Roadmap erhalten',
    'landing.card3.desc': 'Priorisierte 90-Tage-Maßnahmen, passend zu Ihrem Ergebnis und Reifegrad.',
    'landing.info.duration': 'Dauer ca. 10–15 Minuten',
    'landing.info.privacy': 'Alle Daten verbleiben in Ihrem Browser. Kein Server, keine Cookies, keine externen Dienste.',
    'landing.info.policy': 'Zwei Regelstände wählbar: BSI (öffentlich) und Verbandslinie (konservativ).',
    // Wizard
    'wizard.step.start': 'Start & Regelstand',
    'wizard.step.organisation': 'Organisation',
    'wizard.step.leistungen': 'Leistungen',
    'wizard.step.schwellenwerte': 'Schwellenwerte',
    'wizard.step.it': 'IT-Struktur',
    'wizard.step.sicherheit': 'Sicherheitsreife',
    'wizard.step.nachweise': 'Nachweise',
    'wizard.step.ergebnis': 'Ergebnis',
    'wizard.policy.title': 'Regelstand wählen',
    'wizard.policy.desc': 'Der Regelstand bestimmt, ob Rettungsdienst als automatischer sektoraler Trigger gewertet wird.',
    'wizard.preset.title': 'Preset wählen (optional)',
    'wizard.preset.desc': 'Wählen Sie eine typische Verbundstruktur als Ausgangspunkt. Antworten können anschließend angepasst werden.',
    'wizard.preset.none': 'Ohne Preset starten',
    'wizard.complete': 'Auswertung starten',
    'wizard.resume': 'Vorherige Eingaben fortsetzen',
    'wizard.restart': 'Neu beginnen',
    // Results
    'result.title': 'Ergebnis',
    'result.executive': 'Executive Summary',
    'result.outcome': 'Ergebnis',
    'result.policyPack': 'Aktiver Regelstand',
    'result.directAffectedness': 'Direkte Betroffenheit',
    'result.legalScope': 'Juristischer Scope',
    'result.techScope': 'Technischer Scope',
    'result.ruleSensitive': 'Regelstandssensitiv',
    'result.ruleSensitive.desc': 'Unter dem alternativen Regelstand wäre das Ergebnis {alt}.',
    'result.maturity': 'Sicherheitsreifegrad',
    'result.topRisks': 'Top-Risiken',
    'result.triggeredRules': 'Auslösende Regeln',
    'result.roadmap': '90-Tage-Roadmap',
    'result.print': 'Ergebnis drucken / als PDF speichern',
    'result.export': 'JSON exportieren',
    'result.edit': 'Erneut bearbeiten',
    'result.newCheck': 'Neuen Check starten',
    'result.noData': 'Keine Auswertungsdaten vorhanden. Bitte führen Sie zuerst den Self-Check durch.',
    // Outcome labels
    'outcome.A': 'Nicht direkt betroffen und kein technischer Mit-Scope',
    'outcome.B': 'Direkt betroffen, Scope plausibel begrenzbar',
    'outcome.C': 'Direkt betroffen und Shared IT zieht den technischen Scope hoch',
    'outcome.D': 'Regelstandssensitiv oder strukturell/technisch unklar; konservative Umsetzung empfohlen',
    // Affectedness
    'affected.yes': 'Ja',
    'affected.no': 'Nein',
    'affected.unclear': 'Unklar',
    // Maturity bands
    'maturity.kritisch': 'Kritisch',
    'maturity.basal': 'Basal',
    'maturity.belastbar': 'Belastbar',
    'maturity.fortgeschritten': 'Fortgeschritten',
  },
  en: {
    'app.title': 'NIS-2 Audit',
    'app.subtitle': 'Self-Check for Emergency Services, Group Structure and Shared IT in DRK',
    'app.description': 'DRK-specific NIS-2 affectedness analysis with outcome logic, scope assessment and 90-day roadmap.',
    // Landing
    'landing.hero.title': 'NIS-2 Self-Check for DRK Associations',
    'landing.hero.subtitle': 'Assess your association\'s likely NIS-2 affectedness in 10–15 minutes.',
    'landing.cta': 'Start Self-Check',
    'landing.card1.title': 'Check Affectedness',
    'landing.card1.desc': 'Legal classification based on organizational structure, services and thresholds.',
    'landing.card2.title': 'Assess Scope',
    'landing.card2.desc': 'Separately identify legal and technical scope – including shared IT analysis.',
    'landing.card3.title': 'Get Roadmap',
    'landing.card3.desc': 'Prioritized 90-day measures matching your outcome and maturity level.',
    'landing.info.duration': 'Duration approx. 10–15 minutes',
    'landing.info.privacy': 'All data stays in your browser. No server, no cookies, no external services.',
    'landing.info.policy': 'Two policy standards available: BSI (public) and Association Guideline (conservative).',
    // Wizard
    'wizard.step.start': 'Start & Policy',
    'wizard.step.organisation': 'Organization',
    'wizard.step.leistungen': 'Services',
    'wizard.step.schwellenwerte': 'Thresholds',
    'wizard.step.it': 'IT Structure',
    'wizard.step.sicherheit': 'Security Maturity',
    'wizard.step.nachweise': 'Evidence',
    'wizard.step.ergebnis': 'Result',
    'wizard.policy.title': 'Select Policy Standard',
    'wizard.policy.desc': 'The policy standard determines whether emergency services are treated as an automatic sector trigger.',
    'wizard.preset.title': 'Select Preset (optional)',
    'wizard.preset.desc': 'Choose a typical group structure as starting point. Answers can be adjusted afterwards.',
    'wizard.preset.none': 'Start without preset',
    'wizard.complete': 'Start Assessment',
    'wizard.resume': 'Resume previous entries',
    'wizard.restart': 'Start over',
    // Results
    'result.title': 'Result',
    'result.executive': 'Executive Summary',
    'result.outcome': 'Outcome',
    'result.policyPack': 'Active Policy Standard',
    'result.directAffectedness': 'Direct Affectedness',
    'result.legalScope': 'Legal Scope',
    'result.techScope': 'Technical Scope',
    'result.ruleSensitive': 'Rule-Sensitive',
    'result.ruleSensitive.desc': 'Under the alternate policy standard, the outcome would be {alt}.',
    'result.maturity': 'Security Maturity',
    'result.topRisks': 'Top Risks',
    'result.triggeredRules': 'Triggered Rules',
    'result.roadmap': '90-Day Roadmap',
    'result.print': 'Print / Save as PDF',
    'result.export': 'Export JSON',
    'result.edit': 'Edit Again',
    'result.newCheck': 'Start New Check',
    'result.noData': 'No assessment data available. Please complete the self-check first.',
    // Outcome labels
    'outcome.A': 'Not directly affected and no technical co-scope',
    'outcome.B': 'Directly affected, scope plausibly limitable',
    'outcome.C': 'Directly affected and shared IT extends technical scope',
    'outcome.D': 'Rule-sensitive or structurally/technically unclear; conservative implementation recommended',
    // Affectedness
    'affected.yes': 'Yes',
    'affected.no': 'No',
    'affected.unclear': 'Unclear',
    // Maturity bands
    'maturity.kritisch': 'Critical',
    'maturity.basal': 'Basic',
    'maturity.belastbar': 'Solid',
    'maturity.fortgeschritten': 'Advanced',
  },
} as const;

// ── Zusammengeführte Übersetzungen ──
type TranslationKey = keyof typeof shared['de'] | keyof typeof appTranslations['de'];

const translations: Record<Locale, Record<string, string>> = {
  de: { ...shared.de, ...appTranslations.de },
  en: { ...shared.en, ...appTranslations.en },
};

/**
 * Übersetzungsfunktion
 * @param key - Übersetzungsschlüssel
 * @param locale - Sprache (default: 'de')
 * @param params - Platzhalter-Werte, z.B. { year: '2026' }
 */
export function t(
  key: TranslationKey | string,
  locale: Locale = 'de',
  params?: Record<string, string>
): string {
  let text = translations[locale]?.[key] || translations['de']?.[key] || key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
  }
  return text;
}

/**
 * Alle Keys einer Kategorie holen (z.B. alle 'app.*' Keys)
 */
export function tGroup(prefix: string, locale: Locale = 'de'): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(translations[locale])) {
    if (key.startsWith(prefix)) {
      result[key] = value;
    }
  }
  return result;
}

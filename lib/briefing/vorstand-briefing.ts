import type { AssessmentResult, WizardAnswers, Grunddaten, VorstandBriefing } from '@/lib/types';

export function generiereVorstandBriefing(
  result: AssessmentResult,
  answers: WizardAnswers,
  grunddaten: Grunddaten
): VorstandBriefing {
  const isBetroffenWahrscheinlich = result.outcome.type === 'B' || result.outcome.type === 'A' || result.outcome.type === 'C';
  const vzae = (answers['THR-01'] as number) ?? 0;
  const groesse = vzae < 50 ? 'S' : vzae <= 250 ? 'M' : 'L';

  const kostenMap = {
    S: { einmaligMin: 40000,  einmaligMax: 150000,  jaehrlichMin: 25000,  jaehrlichMax: 80000  },
    M: { einmaligMin: 150000, einmaligMax: 500000,  jaehrlichMin: 80000,  jaehrlichMax: 250000 },
    L: { einmaligMin: 400000, einmaligMax: 1200000, jaehrlichMin: 200000, jaehrlichMax: 600000 },
  };
  const kosten = kostenMap[groesse];

  return {
    datum: new Date().toLocaleDateString('de-DE'),
    kvName: grunddaten.kreisverband || 'DRK-Kreisverband',
    vorstand: grunddaten.vorstand || '',

    betroffenheitLabel: isBetroffenWahrscheinlich ? 'Wahrscheinlich betroffen' : 'Möglicherweise betroffen',
    betroffenheitGrund: result.jurisdiction.isRdProvider
      ? `Rettungsdienst-Leistungen + ${vzae > 0 ? vzae + ' VZÄ' : 'Schwellenwert geprüft'} → Gesundheitssektor NIS-2`
      : result.outcome.summary,
    einstufung: result.jurisdiction.classification || 'Einstufung unklar – Rechtsberatung empfohlen',

    pflichten: [
      {
        titel: 'Registrierung beim BSI',
        status: result.registration.alreadyRegistered ? 'erledigt' : 'offen',
        frist: '06.03.2026 (Frist abgelaufen — weiterhin möglich)',
        paragraph: '§33 BSIG',
      },
      {
        titel: 'Risikomanagement (10 Maßnahmen)',
        status: 'offen',
        frist: 'Sofort (seit 06.12.2025)',
        paragraph: '§30 BSIG',
      },
      {
        titel: '24h-Meldepflicht bei Sicherheitsvorfällen',
        status: 'offen',
        frist: 'Sofort bei Vorfall',
        paragraph: '§32 BSIG',
      },
      {
        titel: 'Pflichtschulung Geschäftsleitung',
        status: 'offen',
        frist: 'Regelmäßig (alle 2–3 Jahre)',
        paragraph: '§38 Abs. 3 BSIG',
      },
    ],

    haftungText: 'Als Mitglieder der Geschäftsleitung haften Sie persönlich mit Ihrem Privatvermögen für schuldhaft verursachte Schäden durch Nichterfüllung der NIS-2-Pflichten (§38 Abs. 2 BSIG i.V.m. §43 GmbHG).',
    busseldText: result.jurisdiction.classification?.includes('besonders')
      ? 'Bußgeld bis 10 Mio. EUR oder 2% Jahresumsatz möglich.'
      : 'Bußgeld bis 7 Mio. EUR oder 1,4% Jahresumsatz möglich.',

    kostenEinmaligMin: kosten.einmaligMin,
    kostenEinmaligMax: kosten.einmaligMax,
    kostenJaehrlichMin: kosten.jaehrlichMin,
    kostenJaehrlichMax: kosten.jaehrlichMax,

    naechsteSchritte: [
      {
        schritt: 1,
        aktion: 'IT-Sicherheitsbeauftragte/n (ISB) benennen (intern oder extern)',
        frist: `bis ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE')}`,
      },
      {
        schritt: 2,
        aktion: result.registration.alreadyRegistered
          ? 'BSI-Registrierung bereits abgeschlossen — Daten aktuell halten'
          : 'BSI-Registrierung abschließen (ELSTER-Zertifikat beantragen, dauert 5+ Werktage)',
        frist: result.registration.alreadyRegistered ? 'erledigt' : 'schnellstmöglich (Frist war 06.03.2026)',
      },
      {
        schritt: 3,
        aktion: 'Haushaltsposition IT-Sicherheit beschließen',
        frist: 'nächste Vorstandssitzung',
      },
    ],

    toolUrl: 'https://nis2.henryagi.de',
  };
}

import type { AssessmentResult, WizardAnswers, KVGroesse, KostenErgebnis } from '@/lib/types';
import { KOSTEN_BEREICHE, VERGLEICHSWERTE } from './kosten-modell';

export function bestimmeKVGroesse(vzae: number): KVGroesse {
  if (vzae < 50) return 'S';
  if (vzae <= 250) return 'M';
  return 'L';
}

export function berechneKosten(
  result: AssessmentResult,
  answers: WizardAnswers
): KostenErgebnis {
  const vzae = (answers['THR-01'] as number) ?? 50;
  const groesse = bestimmeKVGroesse(vzae);

  const bereiche = KOSTEN_BEREICHE.map(bereich => {
    const [einmaligMin, einmaligMax] = bereich.einmalig[groesse];
    const [jaehrlichMin, jaehrlichMax] = bereich.jaehrlich[groesse];

    const teilweiseErfuellt = false;
    const faktor = teilweiseErfuellt ? 0.5 : 1.0;

    return {
      id: bereich.id,
      label: bereich.label,
      paragraph: bereich.paragraph,
      einmaligMin: Math.round(einmaligMin * faktor),
      einmaligMax: Math.round(einmaligMax * faktor),
      jaehrlichMin: Math.round(jaehrlichMin),
      jaehrlichMax: Math.round(jaehrlichMax),
      teilweiseErfuellt,
    };
  });

  const einmaligMin = bereiche.reduce((s, b) => s + b.einmaligMin, 0);
  const einmaligMax = bereiche.reduce((s, b) => s + b.einmaligMax, 0);
  const jaehrlichMin = bereiche.reduce((s, b) => s + b.jaehrlichMin, 0);
  const jaehrlichMax = bereiche.reduce((s, b) => s + b.jaehrlichMax, 0);

  const jaehrlichMid = (jaehrlichMin + jaehrlichMax) / 2;
  const kostenProVzaeJahr = vzae > 0 ? Math.round(jaehrlichMid / vzae) : 0;

  return {
    groesse,
    vzae,
    einmaligMin,
    einmaligMax,
    jaehrlichMin,
    jaehrlichMax,
    bereiche,
    kostenProVzaeJahr,
    kooperationJaehrlichProKV: Math.round(jaehrlichMid * 0.15),
    vergleiche: VERGLEICHSWERTE,
  };
}

export function berechneKooperationsKosten(jaehrlichMid: number, anzahlKV: number): number {
  if (anzahlKV <= 1) return jaehrlichMid;
  const savingsRate = Math.min(0.85, 0.3 + (anzahlKV - 2) * 0.055);
  return Math.round((jaehrlichMid * (1 - savingsRate)) / anzahlKV);
}

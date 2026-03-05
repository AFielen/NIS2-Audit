import type { AssessmentResult, WizardAnswers, KVGroesse, KostenErgebnis } from '@/lib/types';
import { KOSTEN_BEREICHE, VERGLEICHSWERTE } from './kosten-modell';

export function bestimmeKVGroesse(vzae: number): KVGroesse {
  if (vzae < 50) return 'S';
  if (vzae <= 250) return 'M';
  return 'L';
}

function bestimmeSecStatus(
  secIds: string[],
  answers: WizardAnswers
): 'yes' | 'partial' | 'no' {
  if (secIds.length === 0) return 'no';

  const statuses = secIds.map(id => (answers[id] as string) ?? 'unknown');

  if (statuses.some(s => s === 'no' || s === 'unknown')) return 'no';
  if (statuses.some(s => s === 'partial')) return 'partial';
  return 'yes';
}

export function berechneKosten(
  result: AssessmentResult,
  answers: WizardAnswers
): KostenErgebnis {
  const vzae = (answers['THR-01'] as number) ?? 50;
  const groesse: KVGroesse = result.sizingType ?? bestimmeKVGroesse(vzae);

  const bereiche = KOSTEN_BEREICHE.map(bereich => {
    const [einmaligMin, einmaligMax] = bereich.einmalig[groesse];
    const [jaehrlichMin, jaehrlichMax] = bereich.jaehrlich[groesse];

    const secStatus = bestimmeSecStatus(bereich.secQuestionIds ?? [], answers);

    let effEinmaligMin: number;
    let effEinmaligMax: number;
    let effJaehrlichMin: number;
    let effJaehrlichMax: number;

    switch (secStatus) {
      case 'yes':
        effEinmaligMin = 0;
        effEinmaligMax = 0;
        effJaehrlichMin = 0;
        effJaehrlichMax = 0;
        break;
      case 'partial':
        effEinmaligMin = einmaligMin;
        effEinmaligMax = einmaligMin;
        effJaehrlichMin = jaehrlichMin;
        effJaehrlichMax = jaehrlichMin;
        break;
      default:
        effEinmaligMin = einmaligMin;
        effEinmaligMax = einmaligMax;
        effJaehrlichMin = jaehrlichMin;
        effJaehrlichMax = jaehrlichMax;
        break;
    }

    return {
      id: bereich.id,
      label: bereich.label,
      paragraph: bereich.paragraph,
      einmaligMin: effEinmaligMin,
      einmaligMax: effEinmaligMax,
      jaehrlichMin: effJaehrlichMin,
      jaehrlichMax: effJaehrlichMax,
      teilweiseErfuellt: secStatus === 'partial',
      bereitsUmgesetzt: secStatus === 'yes',
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
    vergleiche: VERGLEICHSWERTE,
  };
}

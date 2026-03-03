import type { OutcomeType, SizingType } from '../types';
import type { GeneratedRoadmap, RoadmapLayer } from './types';
import { schritt0Registration } from './schritt0-registration';
import { grundschutz10 } from './grundschutz10';
import { roadmap90S } from './nis2-90d-S';
import { roadmap90M } from './nis2-90d-M';
import { roadmap90L } from './nis2-90d-L';

const ROADMAP_BY_SIZING: Record<SizingType, RoadmapLayer> = {
  S: roadmap90S,
  M: roadmap90M,
  L: roadmap90L,
};

/**
 * Baut die 3-Layer-Roadmap basierend auf Outcome und Sizing.
 *
 * - Outcome A: keine Roadmap (nicht betroffen)
 * - Outcome B: Grundschutz-10 + 90-Tage-Roadmap (Scope begrenzbar)
 * - Outcome C/D: Schritt 0 + Grundschutz-10 + 90-Tage-Roadmap (voller Scope)
 */
export function buildRoadmap(
  outcomeType: OutcomeType,
  sizingType: SizingType | null,
): GeneratedRoadmap {
  if (outcomeType === 'A') return {};

  const roadmap: GeneratedRoadmap = {};

  // Schritt 0 only for C (direkt betroffen) and D (unklar/konservativ)
  if (outcomeType === 'C' || outcomeType === 'D') {
    roadmap.step0 = schritt0Registration;
  }

  // Grundschutz-10 for all affected outcomes
  roadmap.grundschutz10 = grundschutz10;

  // 90-day sized roadmap if we know the sizing
  if (sizingType) {
    roadmap.roadmap90 = ROADMAP_BY_SIZING[sizingType];
  }

  return roadmap;
}

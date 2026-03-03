import type { PolicyPack } from '../types';

export interface PolicyPackConfig {
  id: PolicyPack;
  name: { de: string; en: string };
  description: { de: string; en: string };
  rdIsSectorTrigger: boolean;
}

export const policyPacks: Record<PolicyPack, PolicyPackConfig> = {
  'public-bsi': {
    id: 'public-bsi',
    name: {
      de: 'BSI-Regelstand (öffentlich)',
      en: 'BSI Standard (public)',
    },
    description: {
      de: 'Bildet den öffentlich auffindbaren BSI-Regelstand ab. Rettungsdienst wird nicht automatisch als sektoraler Trigger gewertet.',
      en: 'Reflects the publicly available BSI standard. Emergency medical service is not automatically treated as a sector trigger.',
    },
    rdIsSectorTrigger: false,
  },
  'verbandslinie-konservativ': {
    id: 'verbandslinie-konservativ',
    name: {
      de: 'Verbandslinie (konservativ)',
      en: 'Association Guideline (conservative)',
    },
    description: {
      de: 'Konservative Auslegung für DRK-Kreis- und Landesverbände. Rettungsdienst wird als sektoraler Trigger behandelt.',
      en: 'Conservative interpretation for DRK district and state associations. Emergency medical service is treated as a sector trigger.',
    },
    rdIsSectorTrigger: true,
  },
};

export const DEFAULT_POLICY_PACK: PolicyPack = 'verbandslinie-konservativ';

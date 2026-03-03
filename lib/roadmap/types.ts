// ── Roadmap Layer Types ──

export interface RoadmapItem {
  title: string;
  description: string;
  owner: string;
  priority: 'hoch' | 'mittel' | 'niedrig';
}

export interface RoadmapLayer {
  id: string;
  title: string;
  description: string;
  items: RoadmapItem[];
}

export interface GeneratedRoadmap {
  step0?: RoadmapLayer;
  grundschutz10?: RoadmapLayer;
  roadmap90?: RoadmapLayer;
}

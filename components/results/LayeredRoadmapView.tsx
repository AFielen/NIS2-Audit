'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { GeneratedRoadmap, RoadmapLayer, RoadmapItem } from '@/lib/roadmap/types';

interface LayeredRoadmapViewProps {
  roadmap: GeneratedRoadmap;
}

const PRIORITY_STYLES: Record<RoadmapItem['priority'], { bg: string; text: string; label: string }> = {
  hoch: { bg: 'var(--drk-bg)', text: 'var(--drk)', label: 'Hoch' },
  mittel: { bg: '#fff7ed', text: '#b45309', label: 'Mittel' },
  niedrig: { bg: '#f0fdf4', text: 'var(--success)', label: 'Niedrig' },
};

function LayerSection({ layer, index }: { layer: RoadmapLayer; index: number }) {
  const layerColors = [
    { border: 'var(--drk)', badge: 'var(--drk)', bg: 'var(--drk-bg)' },
    { border: 'var(--info)', badge: 'var(--info)', bg: '#eff6ff' },
    { border: 'var(--success)', badge: 'var(--success)', bg: '#f0fdf4' },
  ];
  const color = layerColors[index] || layerColors[0];

  return (
    <div
      className="rounded-lg border-l-4 p-4 mb-4"
      style={{ borderLeftColor: color.border, background: color.bg }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-xs font-mono font-bold px-2 py-0.5 rounded"
          style={{ background: color.badge, color: '#fff' }}
        >
          {layer.id === 'step0' ? 'SCHRITT 0' : layer.id === 'grundschutz10' ? 'GRUNDSCHUTZ' : '90 TAGE'}
        </span>
        <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
          {layer.title}
        </span>
      </div>
      <p className="text-xs mb-3" style={{ color: 'var(--text-light)' }}>
        {layer.description}
      </p>
      <div className="space-y-2">
        {layer.items.map((item, i) => {
          const ps = PRIORITY_STYLES[item.priority];
          return (
            <div
              key={i}
              className="rounded-lg p-3"
              style={{ background: 'rgba(255,255,255,0.7)' }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-medium text-sm" style={{ color: 'var(--text)' }}>
                  {item.title}
                </span>
                <span
                  className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded"
                  style={{ background: ps.bg, color: ps.text }}
                >
                  {ps.label}
                </span>
              </div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-light)' }}>
                {item.description}
              </p>
              <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
                {item.owner}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function LayeredRoadmapView({ roadmap }: LayeredRoadmapViewProps) {
  const [expanded, setExpanded] = useState(false);

  const layers: RoadmapLayer[] = [];
  if (roadmap.step0) layers.push(roadmap.step0);
  if (roadmap.grundschutz10) layers.push(roadmap.grundschutz10);
  if (roadmap.roadmap90) layers.push(roadmap.roadmap90);

  if (layers.length === 0) return null;

  return (
    <div className="drk-card drk-fade-in">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="font-bold" style={{ color: 'var(--text)' }}>
          Vorschlag: Umsetzungs-Roadmap nach BSI
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="shrink-0 transition-transform"
          style={{ color: 'var(--text-muted)', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {expanded && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm" style={{ color: 'var(--text-light)' }}>
              {layers.length === 3
                ? 'Drei Ebenen: Sofort-Maßnahmen (BSI-Registrierung), Grundschutz-Basis und größenangepasste 90-Tage-Roadmap.'
                : layers.length === 2
                  ? 'Grundschutz-Basis und größenangepasste 90-Tage-Roadmap für Ihren Kreisverband.'
                  : 'Empfohlene Maßnahmen basierend auf Ihrem Ergebnis.'}
            </p>
            <Link
              href="/grundschutz"
              className="text-xs font-semibold underline shrink-0 ml-4"
              style={{ color: 'var(--drk)' }}
            >
              Grundschutz-10 ansehen
            </Link>
          </div>
          {layers.map((layer, i) => (
            <LayerSection key={layer.id} layer={layer} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

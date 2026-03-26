'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { GeneratedRoadmap, RoadmapLayer, RoadmapItem } from '@/lib/roadmap/types';
import { grundschutzDetails, getGrundschutzDetail } from '@/lib/content/grundschutz-details';
import { getRoadmap90Detail, sizingFromLayerId } from '@/lib/content/roadmap90-details';
import GrundschutzDetailSheet from '@/components/grundschutz/GrundschutzDetailSheet';

interface LayeredRoadmapViewProps {
  roadmap: GeneratedRoadmap;
}

const PRIORITY_STYLES: Record<RoadmapItem['priority'], { bg: string; text: string; label: string }> = {
  hoch: { bg: 'var(--drk-bg)', text: 'var(--drk)', label: 'Hoch' },
  mittel: { bg: 'var(--warning-bg)', text: '#b45309', label: 'Mittel' },
  niedrig: { bg: 'var(--success-bg)', text: 'var(--success)', label: 'Niedrig' },
};

function LayerSection({ layer, index, onItemClick }: { layer: RoadmapLayer; index: number; onItemClick?: (itemIndex: number) => void }) {
  const layerColors = [
    { border: 'var(--drk)', badge: 'var(--drk)', bg: 'var(--drk-bg)' },
    { border: 'var(--info)', badge: 'var(--info)', bg: 'var(--info-bg)' },
    { border: 'var(--success)', badge: 'var(--success)', bg: 'var(--success-bg)' },
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
          const isClickable = !!onItemClick;
          return (
            <div
              key={i}
              className={`rounded-lg p-3 ${isClickable ? 'cursor-pointer hover:bg-white/90 transition-colors' : ''}`}
              style={{ background: 'rgba(255,255,255,0.7)' }}
              onClick={isClickable ? () => onItemClick(i) : undefined}
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onKeyDown={isClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onItemClick(i); } } : undefined}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-medium text-sm" style={{ color: 'var(--text)' }}>
                  {item.title}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: ps.bg, color: ps.text }}
                  >
                    {ps.label}
                  </span>
                  {isClickable && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         style={{ color: 'var(--text-muted)' }}>
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                </div>
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
  const [expanded, setExpanded] = useState(true);
  const [selectedGsIndex, setSelectedGsIndex] = useState<number | null>(null);
  const [selectedR90Index, setSelectedR90Index] = useState<number | null>(null);

  const r90Sizing = roadmap.roadmap90 ? sizingFromLayerId(roadmap.roadmap90.id) : undefined;
  const r90ItemCount = roadmap.roadmap90?.items.length ?? 0;

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
        className="w-full flex items-center justify-between text-left no-print"
      >
        <h3 className="font-bold" style={{ color: 'var(--text)' }}>
          Vorschlag: Individuelle Umsetzungs-Roadmap nach BSI
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="shrink-0 transition-transform print-hide-toggle"
          style={{ color: 'var(--text-muted)', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Print-only heading (since the button is hidden in print) */}
      <h3 className="hidden print:block font-bold mb-2" style={{ color: 'var(--text)' }}>
        Vorschlag: Individuelle Umsetzungs-Roadmap nach BSI
      </h3>

      <div className={expanded ? 'mt-4' : 'hidden print:block mt-4'}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <p className="text-sm" style={{ color: 'var(--text-light)' }}>
            {layers.length === 3
              ? 'Drei Ebenen: Sofort-Maßnahmen (BSI-Registrierung), Grundschutz-Basis und größenangepasste 90-Tage-Roadmap.'
              : layers.length === 2
                ? 'Grundschutz-Basis und größenangepasste 90-Tage-Roadmap für Ihren Kreisverband.'
                : 'Empfohlene Maßnahmen basierend auf Ihrem Ergebnis.'}
          </p>
          <Link
            href="/grundschutz"
            className="text-xs font-semibold underline shrink-0 no-print"
            style={{ color: 'var(--drk)' }}
          >
            Grundschutz-10 ansehen
          </Link>
        </div>
        {layers.map((layer, i) => (
          <LayerSection
            key={layer.id}
            layer={layer}
            index={i}
            onItemClick={
              layer.id === 'grundschutz10'
                ? (itemIndex) => setSelectedGsIndex(itemIndex)
                : (layer.id.startsWith('roadmap90') && r90Sizing)
                  ? (itemIndex) => setSelectedR90Index(itemIndex)
                  : undefined
            }
          />
        ))}
      </div>

      <GrundschutzDetailSheet
        detail={selectedGsIndex !== null ? getGrundschutzDetail(selectedGsIndex) ?? null : null}
        onClose={() => setSelectedGsIndex(null)}
        onNext={selectedGsIndex !== null && selectedGsIndex < grundschutzDetails.length - 1 ? () => setSelectedGsIndex(prev => prev !== null ? prev + 1 : null) : undefined}
        hasNext={selectedGsIndex !== null && selectedGsIndex < grundschutzDetails.length - 1}
      />

      {r90Sizing && (
        <GrundschutzDetailSheet
          detail={selectedR90Index !== null ? getRoadmap90Detail(r90Sizing, selectedR90Index) ?? null : null}
          onClose={() => setSelectedR90Index(null)}
          onNext={selectedR90Index !== null && selectedR90Index < r90ItemCount - 1 ? () => setSelectedR90Index(prev => prev !== null ? prev + 1 : null) : undefined}
          hasNext={selectedR90Index !== null && selectedR90Index < r90ItemCount - 1}
        />
      )}
    </div>
  );
}

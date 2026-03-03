'use client';

import { Suspense } from 'react';
import AssessmentWizard from '@/components/assessment/AssessmentWizard';

function CheckContent() {
  return <AssessmentWizard />;
}

export default function CheckPage() {
  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))]">
      <Suspense fallback={
        <div className="flex justify-center items-center py-20">
          <div style={{ color: 'var(--text-muted)' }}>Laden...</div>
        </div>
      }>
        <CheckContent />
      </Suspense>
    </div>
  );
}

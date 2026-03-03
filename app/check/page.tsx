'use client';

import AssessmentWizard from '@/components/assessment/AssessmentWizard';

export default function CheckPage() {
  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))]">
      <AssessmentWizard />
    </div>
  );
}

'use client';

import { Journal } from '@/components/Journal';

export default function JournalPage({
  params
}: {
  params: { moduleId: string }
}) {
  return <Journal moduleId={params.moduleId} />;
}

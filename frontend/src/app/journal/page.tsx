'use client';

import { Journal } from '@/components/Journal';

// Force dynamic rendering to prevent static generation issues with Firebase Auth
export const dynamic = 'force-dynamic';

export default function JournalPage() {
  return <Journal />;
}
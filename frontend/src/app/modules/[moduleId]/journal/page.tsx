'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ModuleJournalPage({
  params
}: {
  params: { moduleId: string }
}) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to global journal page
    router.push('/journal');
  }, [router]);

  return null;
}

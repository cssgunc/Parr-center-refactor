import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  getJournalEntries,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry
} from '@/lib/firebase/db-operations';
import { JournalEntry } from '@/lib/firebase/types';
import { debounce } from '@/utils/debounce';

export function useJournal() {
  const [user, loading, error] = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  const isLockedEntry = (id: string) => {
    const entry = entries.find(e => e.id === id);
    return !!entry?.moduleId;
  };

  // Load entries using getDocs instead of real-time listener to avoid Firebase SDK bug
  useEffect(() => {
    if (!user) {
      setEntries([]);
      setActiveId(null);
      setIsLoading(false);
      return;
    }

    const loadEntries = async () => {
      try {
        const journalEntries = await getJournalEntries(user.uid);
        setEntries(journalEntries);
        if (journalEntries.length > 0 && !activeId) {
          setActiveId(journalEntries[0].id);
        }
        setIsLoading(false);
        setDbError(null);
      } catch (error) {
        console.error('Error loading journal entries:', error);
        setDbError('Failed to load journal entries');
        setIsLoading(false);
      }
    };

    loadEntries();
  }, [user]);

  // Debounced update function
  const debouncedUpdate = debounce(async (userId: string, entryId: string, updates: Partial<Omit<JournalEntry, 'id'>>) => {
    try {
      await updateJournalEntry(userId, entryId, updates);
    } catch (error) {
      console.error('Failed to update journal entry:', error);
      setDbError('Failed to save changes');
    }
  }, 500);

  const createEntry = async () => {
    if (!user) {
      setDbError('You must be logged in to create journal entries');
      return null;
    }

    try {
      const newEntry = await createJournalEntry(user.uid, {
        title: '',
        body: '',
      });

      // Refresh entries list
      const journalEntries = await getJournalEntries(user.uid);
      setEntries(journalEntries);
      setActiveId(newEntry.id);
      return newEntry.id;
    } catch (error) {
      console.error('Failed to create journal entry:', error);
      setDbError('Failed to create new entry');
      return null;
    }
  };

  const updateEntry = (id: string, updates: Partial<Omit<JournalEntry, 'id'>>) => {
    if (!user) {
      setDbError('You must be logged in to update journal entries');
      return;
    }
  
    if (isLockedEntry(id)) {
      setDbError('This note is linked to a module and cannot be edited here');
      return;
    }
  
    // Optimistically update local state
    setEntries(prev =>
      prev.map(entry => (entry.id === id ? { ...entry, ...updates } : entry))
    );
  
    // Debounced database update
    debouncedUpdate(user.uid, id, updates);
  };

  const deleteEntry = async (id: string) => {
    if (!user) {
      setDbError('You must be logged in to delete journal entries');
      return;
    }
  
    try {
      await deleteJournalEntry(user.uid, id);
  
      const journalEntries = await getJournalEntries(user.uid);
      setEntries(journalEntries);
  
      if (activeId === id) {
        setActiveId(journalEntries.length > 0 ? journalEntries[0].id : null);
      }
    } catch (error) {
      console.error('Failed to delete journal entry:', error);
      setDbError('Failed to delete entry');
    }
  };

  return {
    entries,
    activeId,
    setActiveId,
    createEntry,
    updateEntry,
    deleteEntry,
    isLoading: loading || isLoading,
    error: error?.message || dbError,
    isAuthenticated: !!user,
  };
}

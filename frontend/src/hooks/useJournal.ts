import { useState, useEffect } from 'react';
import { debounce } from '@/utils/debounce';

export interface JournalEntry {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export function useJournal(moduleId: string) {
  const storageKey = `journal:${moduleId}`;
  
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setEntries(parsed);
        if (parsed.length > 0) setActiveId(parsed[0].id);
      }
    } catch (err) {
      console.error('Failed to parse journal entries', err);
    }
  }, [moduleId]);

  // Debounced save to localStorage
  const saveEntries = debounce((entries: JournalEntry[]) => {
    localStorage.setItem(storageKey, JSON.stringify(entries));
  }, 500);

  const createEntry = () => {
    const newEntry: JournalEntry = {
      id: crypto.randomUUID(),
      title: '',
      body: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setEntries(prev => [newEntry, ...prev]);
    setActiveId(newEntry.id);
    saveEntries([newEntry, ...entries]);
    return newEntry.id;
  };

  const updateEntry = (id: string, updates: Partial<Omit<JournalEntry, 'id'>>) => {
    setEntries(prev => {
      const updated = prev.map(entry => {
        if (entry.id === id) {
          return {
            ...entry,
            ...updates,
            updatedAt: new Date().toISOString()
          };
        }
        return entry;
      });
      saveEntries(updated);
      return updated;
    });
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => {
      const filtered = prev.filter(entry => entry.id !== id);
      saveEntries(filtered);
      return filtered;
    });
    if (activeId === id) {
      setActiveId(entries.length > 1 ? entries[1].id : null);
    }
  };

  return {
    entries: entries.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ),
    activeId,
    setActiveId,
    createEntry,
    updateEntry,
    deleteEntry
  };
}

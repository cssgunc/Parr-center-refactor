'use client';

import { Feature } from '@/types/module';
import VideoEditorModal from './feature-editors/VideoEditorModal';
import FlashcardsEditorModal from './feature-editors/FlashcardsEditorModal';
import QuizEditorModal from './feature-editors/QuizEditorModal';
import JournalEditorModal from './feature-editors/JournalEditorModal';

interface FeatureEditorModalProps {
  feature: Feature;
  onClose: () => void;
  onSave: (updates: Partial<Omit<Feature, 'id'>>) => void;
}

export default function FeatureEditorModal({ feature, onClose, onSave }: FeatureEditorModalProps) {
  switch (feature.type) {
    case 'video':
      return (
        <VideoEditorModal
          feature={feature}
          onClose={onClose}
          onSave={(updates) => onSave(updates)}
        />
      );
    case 'flashcards':
      return (
        <FlashcardsEditorModal
          feature={feature}
          onClose={onClose}
          onSave={(updates) => onSave(updates)}
        />
      );
    case 'quiz':
      return (
        <QuizEditorModal
          feature={feature}
          onClose={onClose}
          onSave={(updates) => onSave(updates)}
        />
      );
    case 'journal':
      return (
        <JournalEditorModal
          feature={feature}
          onClose={onClose}
          onSave={(updates) => onSave(updates)}
        />
      );
    default:
      return null;
  }
}

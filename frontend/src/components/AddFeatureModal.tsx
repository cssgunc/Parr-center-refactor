'use client';

import { useState } from 'react';
import { FeatureType } from '@/types/module';
import VideoEditorModal from './feature-editors/VideoEditorModal';
import FlashcardsEditorModal from './feature-editors/FlashcardsEditorModal';
import QuizEditorModal from './feature-editors/QuizEditorModal';
import JournalEditorModal from './feature-editors/JournalEditorModal';

interface AddFeatureModalProps {
  onClose: () => void;
  onFeatureCreated: (feature: any) => void;
}

const featureTypes: { type: FeatureType; name: string; description: string; icon: React.ReactNode }[] = [
  {
    type: 'video',
    name: 'Video',
    description: 'Add a video lesson or tutorial',
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    type: 'flashcards',
    name: 'Flashcards',
    description: 'Create interactive flashcards for memorization',
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    type: 'quiz',
    name: 'Quiz',
    description: 'Build a multiple choice quiz',
    icon: (
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    type: 'journal',
    name: 'Journal Prompt',
    description: 'Add a reflective writing prompt',
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
];

export default function AddFeatureModal({ onClose, onFeatureCreated }: AddFeatureModalProps) {
  const [selectedType, setSelectedType] = useState<FeatureType | null>(null);

  const handleFeatureCreated = (feature: any) => {
    onFeatureCreated(feature);
    setSelectedType(null);
  };

  if (selectedType) {
    switch (selectedType) {
      case 'video':
        return (
          <VideoEditorModal
            onClose={() => setSelectedType(null)}
            onSave={handleFeatureCreated}
          />
        );
      case 'flashcards':
        return (
          <FlashcardsEditorModal
            onClose={() => setSelectedType(null)}
            onSave={handleFeatureCreated}
          />
        );
      case 'quiz':
        return (
          <QuizEditorModal
            onClose={() => setSelectedType(null)}
            onSave={handleFeatureCreated}
          />
        );
      case 'journal':
        return (
          <JournalEditorModal
            onClose={() => setSelectedType(null)}
            onSave={handleFeatureCreated}
          />
        );
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add New Feature</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">Choose the type of feature you want to add to this module:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureTypes.map((featureType) => (
              <button
                key={featureType.type}
                onClick={() => setSelectedType(featureType.type)}
                className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {featureType.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-900">
                      {featureType.name}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-blue-700">
                      {featureType.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

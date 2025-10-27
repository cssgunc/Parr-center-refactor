'use client';

import { useState } from 'react';
import { FlashcardsFeature, FlashcardCard } from '@/types/module';

interface FlashcardsEditorModalProps {
  onClose: () => void;
  onSave: (feature: Omit<FlashcardsFeature, 'id'>) => void;
  feature?: FlashcardsFeature;
}

export default function FlashcardsEditorModal({ onClose, onSave, feature }: FlashcardsEditorModalProps) {
  const [formData, setFormData] = useState({
    title: feature?.title || '',
    cards: feature?.cards || [{ front: '', back: '' }],
  });

  const addCard = () => {
    setFormData({
      ...formData,
      cards: [...formData.cards, { front: '', back: '' }],
    });
  };

  const removeCard = (index: number) => {
    if (formData.cards.length > 1) {
      setFormData({
        ...formData,
        cards: formData.cards.filter((_, i) => i !== index),
      });
    }
  };

  const updateCard = (index: number, field: 'front' | 'back', value: string) => {
    const newCards = [...formData.cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setFormData({ ...formData, cards: newCards });
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('Please enter a flashcard set title');
      return;
    }

    const validCards = formData.cards.filter(card => card.front.trim() && card.back.trim());
    if (validCards.length === 0) {
      alert('Please add at least one flashcard');
      return;
    }

    onSave({
      type: 'flashcards',
      title: formData.title.trim(),
      cards: validCards,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {feature ? 'Edit Flashcards' : 'Add Flashcards'}
          </h2>
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Flashcard Set Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter flashcard set title"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Cards</h3>
                <button
                  onClick={addCard}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Card
                </button>
              </div>

              <div className="space-y-4">
                {formData.cards.map((card, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Card {index + 1}</span>
                      {formData.cards.length > 1 && (
                        <button
                          onClick={() => removeCard(index)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Front
                        </label>
                        <textarea
                          value={card.front}
                          onChange={(e) => updateCard(index, 'front', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                          placeholder="Enter front text"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Back
                        </label>
                        <textarea
                          value={card.back}
                          onChange={(e) => updateCard(index, 'back', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                          placeholder="Enter back text"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            {feature ? 'Update Flashcards' : 'Add Flashcards'}
          </button>
        </div>
      </div>
    </div>
  );
}

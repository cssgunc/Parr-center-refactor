'use client';

import { useState } from 'react';
import { FreeResponseStep } from '@/lib/firebase/types';
import { useModuleStore } from '@/store/moduleStore';

interface FreeResponseEditorModalProps {
  moduleId: string;
  onClose: () => void;
  onBack: () => void;
  step?: FreeResponseStep;
}

export default function FreeResponseEditorModal({ moduleId, onClose, onBack, step }: FreeResponseEditorModalProps) {
  const { modules, createNewStep, updateStepData, userId } = useModuleStore();
  const module = modules.find(m => m.id === moduleId);

  const [formData, setFormData] = useState({
    title: step?.title || '',
    prompt: step?.prompt || '',
    sampleAnswer: step?.sampleAnswer || '',
    maxLength: step?.maxLength?.toString() || '',
    estimatedMinutes: step?.estimatedMinutes?.toString() || '',
    isOptional: step?.isOptional || false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a free response prompt title');
      return;
    }

    if (!formData.prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    if (!userId) {
      alert('User not authenticated');
      return;
    }

    setIsSaving(true);
    try {
      if (step) {
        // Update existing step
        const updates: any = {
          title: formData.title.trim(),
          prompt: formData.prompt.trim(),
          isOptional: formData.isOptional,
        };
        if (formData.sampleAnswer.trim()) {
          updates.sampleAnswer = formData.sampleAnswer.trim();
        }
        if (formData.maxLength) {
          updates.maxLength = parseInt(formData.maxLength);
        }
        if (formData.estimatedMinutes) {
          updates.estimatedMinutes = parseInt(formData.estimatedMinutes);
        }
        await updateStepData(moduleId, step.id, updates);
      } else {
        // Create new step
        const order = module?.steps.length || 0;
        const stepData: any = {
          type: 'freeResponse',
          title: formData.title.trim(),
          prompt: formData.prompt.trim(),
          isOptional: formData.isOptional,
          order,
          createdBy: userId,
        };
        if (formData.sampleAnswer.trim()) {
          stepData.sampleAnswer = formData.sampleAnswer.trim();
        }
        if (formData.maxLength) {
          stepData.maxLength = parseInt(formData.maxLength);
        }
        if (formData.estimatedMinutes) {
          stepData.estimatedMinutes = parseInt(formData.estimatedMinutes);
        }
        await createNewStep(moduleId, stepData);
      }
      onClose();
    } catch (error: any) {
      console.error('Error saving free response step:', error);
      alert(`Failed to save free response step: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              disabled={isSaving}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-gray-900">
              {step ? 'Edit Free Response' : 'Add Free Response'}
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isSaving}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prompt Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={isSaving}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Enter prompt title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Free Response Prompt *
              </label>
              <textarea
                value={formData.prompt}
                onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                disabled={isSaving}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                rows={4}
                placeholder="Enter your prompt here. This will guide the user's written response."
              />
              <p className="text-xs text-gray-500 mt-1">
                Write a clear prompt that encourages thoughtful written responses.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sample Answer (Optional)
              </label>
              <textarea
                value={formData.sampleAnswer}
                onChange={(e) => setFormData({ ...formData, sampleAnswer: e.target.value })}
                disabled={isSaving}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                rows={3}
                placeholder="Provide a sample answer or guidance"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Length (characters)
                </label>
                <input
                  type="number"
                  value={formData.maxLength}
                  onChange={(e) => setFormData({ ...formData, maxLength: e.target.value })}
                  disabled={isSaving}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="No limit"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Minutes
                </label>
                <input
                  type="number"
                  value={formData.estimatedMinutes}
                  onChange={(e) => setFormData({ ...formData, estimatedMinutes: e.target.value })}
                  disabled={isSaving}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isOptional"
                checked={formData.isOptional}
                onChange={(e) => setFormData({ ...formData, isOptional: e.target.checked })}
                disabled={isSaving}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isOptional" className="text-sm font-medium text-gray-700">
                Optional step
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            {isSaving && (
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {isSaving ? 'Saving...' : (step ? 'Update Free Response' : 'Add Free Response')}
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useModuleStore, ModuleWithSteps } from '@/store/moduleStore';

interface ModuleEditorProps {
  module: ModuleWithSteps | null;
  onClose: () => void;
}

export default function ModuleEditor({ module, onClose }: ModuleEditorProps) {
  const { createNewModule, updateModuleData } = useModuleStore();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (module) {
      setFormData({
        title: module.title,
        description: module.description,
      });
    } else {
      setFormData({
        title: '',
        description: '',
      });
    }
  }, [module]);

  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a module title');
      return;
    }

    setIsSaving(true);
    try {
      if (module) {
        // Update existing module
        await updateModuleData(module.id, {
          title: formData.title.trim(),
          description: formData.description.trim(),
        });
      } else {
        // Create new module
        await createNewModule(formData.title.trim(), formData.description.trim());
      }
      onClose();
    } catch (error) {
      console.error('Error saving module:', error);
      alert('Failed to save module. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {module ? 'Edit Module' : 'Create New Module'}
          </h2>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Module Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={isSaving}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="Enter module title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={isSaving}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              rows={4}
              placeholder="Enter module description"
            />
          </div>
          {module && (
            <div className="mt-4 text-sm text-gray-500">
              <p>Steps: {module.stepCount}</p>
              <p className="text-xs mt-1">Note: Step management coming soon</p>
            </div>
          )}
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
            {isSaving ? 'Saving...' : (module ? 'Update Module' : 'Create Module')}
          </button>
        </div>
      </div>
    </div>
  );
}

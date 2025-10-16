'use client';

import { useState } from 'react';
import { VideoFeature } from '@/types/module';

interface VideoEditorModalProps {
  onClose: () => void;
  onSave: (feature: Omit<VideoFeature, 'id'>) => void;
  feature?: VideoFeature;
}

export default function VideoEditorModal({ onClose, onSave, feature }: VideoEditorModalProps) {
  const [formData, setFormData] = useState({
    title: feature?.title || '',
    url: feature?.url || '',
  });

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('Please enter a video title');
      return;
    }

    if (!formData.url.trim()) {
      alert('Please enter a video URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(formData.url);
    } catch {
      alert('Please enter a valid URL');
      return;
    }

    onSave({
      type: 'video',
      title: formData.title.trim(),
      url: formData.url.trim(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {feature ? 'Edit Video' : 'Add Video'}
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
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter video title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL *
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/video"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter a valid video URL (YouTube, Vimeo, etc.)
              </p>
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
            {feature ? 'Update Video' : 'Add Video'}
          </button>
        </div>
      </div>
    </div>
  );
}

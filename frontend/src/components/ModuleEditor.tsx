'use client';

import { useState, useEffect } from 'react';
import { useModuleStore } from '@/store/moduleStore';
import { Module, Feature, FeatureType } from '@/types/module';
import FeatureEditorModal from './FeatureEditorModal';
import AddFeatureModal from './AddFeatureModal';

interface ModuleEditorProps {
  module: Module | null;
  onClose: () => void;
}

export default function ModuleEditor({ module, onClose }: ModuleEditorProps) {
  const { addModule, updateModule, addFeature, updateFeature, deleteFeature, reorderFeatures } = useModuleStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  
  const [features, setFeatures] = useState<Feature[]>([]);
  const [showAddFeatureModal, setShowAddFeatureModal] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (module) {
      setFormData({
        title: module.title,
        description: module.description,
      });
      setFeatures(module.features);
    } else {
      setFormData({
        title: '',
        description: '',
      });
      setFeatures([]);
    }
  }, [module]);

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('Please enter a module title');
      return;
    }

    const moduleData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      features,
    };

    if (module) {
      updateModule(module.id, moduleData);
    } else {
      addModule(moduleData);
    }

    onClose();
  };

  const handleAddFeature = (featureType: FeatureType) => {
    setShowAddFeatureModal(false);
    // The actual feature creation will be handled by the AddFeatureModal
  };

  const handleFeatureCreated = (feature: Omit<Feature, 'id'>) => {
    if (module) {
      addFeature(module.id, feature);
    } else {
      // For new modules, add to local state
      const newFeature: Feature = {
        ...feature,
        id: `temp-${Date.now()}`,
      } as Feature;
      setFeatures([...features, newFeature]);
    }
  };

  const handleEditFeature = (feature: Feature) => {
    setEditingFeature(feature);
  };

  const handleFeatureUpdated = (featureId: string, updates: Partial<Omit<Feature, 'id'>>) => {
    if (module) {
      updateFeature(module.id, featureId, updates);
    } else {
      setFeatures(features.map(f => f.id === featureId ? { ...f, ...updates } as Feature : f));
    }
  };

  const handleDeleteFeature = (featureId: string) => {
    if (confirm('Are you sure you want to delete this feature?')) {
      if (module) {
        deleteFeature(module.id, featureId);
      } else {
        setFeatures(features.filter(f => f.id !== featureId));
      }
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newFeatures = [...features];
    const draggedFeature = newFeatures[draggedIndex];
    newFeatures.splice(draggedIndex, 1);
    newFeatures.splice(dropIndex, 0, draggedFeature);

    if (module) {
      const featureIds = newFeatures.map(f => f.id);
      reorderFeatures(module.id, featureIds);
    } else {
      setFeatures(newFeatures);
    }

    setDraggedIndex(null);
  };

  const getFeatureIcon = (type: Feature['type']) => {
    switch (type) {
      case 'video':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'flashcards':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'quiz':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'journal':
        return (
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {module ? 'Edit Module' : 'Create New Module'}
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
          {/* Module Details */}
          <div className="mb-8">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Module Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Enter module description"
              />
            </div>
          </div>

          {/* Features Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Features</h3>
              <button
                onClick={() => setShowAddFeatureModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Feature
              </button>
            </div>

            {features.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No features yet. Click "Add Feature" to get started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-move"
                  >
                    <div className="flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                      </svg>
                    </div>
                    <div className="flex-shrink-0">
                      {getFeatureIcon(feature.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{feature.title}</h4>
                      <p className="text-xs text-gray-500 capitalize">{feature.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditFeature(feature)}
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteFeature(feature.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
            {module ? 'Update Module' : 'Create Module'}
          </button>
        </div>
      </div>

      {/* Add Feature Modal */}
      {showAddFeatureModal && (
        <AddFeatureModal
          onClose={() => setShowAddFeatureModal(false)}
          onFeatureCreated={handleFeatureCreated}
        />
      )}

      {/* Feature Editor Modal */}
      {editingFeature && (
        <FeatureEditorModal
          feature={editingFeature}
          onClose={() => setEditingFeature(null)}
          onSave={(updates) => {
            handleFeatureUpdated(editingFeature.id, updates);
            setEditingFeature(null);
          }}
        />
      )}
    </div>
  );
}

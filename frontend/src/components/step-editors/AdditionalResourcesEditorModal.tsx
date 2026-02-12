'use client';

import { useState } from 'react';
import { AdditionalResourcesStep } from '@/lib/firebase/types';
import { useModuleStore } from '@/store/moduleStore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase/firebaseConfig';

interface AddResourcesModalProps {
  moduleId: string;
  onClose: () => void;
  onBack: () => void;
  step?: AdditionalResourcesStep;
}

export default function AdditionalResourcesEditorModal({ moduleId, onClose, onBack, step }: AddResourcesModalProps) {
  const { modules, createNewStep, updateStepData, userId } = useModuleStore();
  const module = modules.find(m => m.id === moduleId);

  const [formData, setFormData] = useState({
    title: step?.title || '',
    link: step?.resources?.link || '',
    pdf: step?.resources?.pdf || '',
    isOptional: step?.isOptional || false,
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    // Validate file size (e.g., max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      alert('PDF file size must be less than 10MB');
      return;
    }

    setPdfFile(file);
  };

  const uploadPdfToStorage = async (file: File): Promise<string> => {
    setIsUploadingPdf(true);
    try {
      if (!storage) {
      throw new Error('Firebase Storage is not initialized');
    }
      // Create a unique filename
      const timestamp = Date.now();
      const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${timestamp}_${sanitizedFilename}`;
      
      // Create storage reference
      const storageRef = ref(
        storage, 
        `modules/${moduleId}/resources/${filename}`
      );
      
      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
        console.error('Error uploading PDF:', error);
        throw new Error('Failed to upload PDF. Please try again.');
    } finally {
      setIsUploadingPdf(false);
    }
  };

  const handleSave = async () => {
    // Validate title
    if (!formData.title.trim()) {
      alert('Please enter a resource title');
      return;
    }

    // Validate that at least one resource is provided
    if (!formData.link.trim() && !formData.pdf.trim() && !pdfFile) {
      alert('Please provide at least a link or PDF');
      return;
    }

    // Validate URL if provided
    if (formData.link.trim()) {
      try {
        new URL(formData.link);
      } catch {
        alert('Please enter a valid URL');
        return;
      }
    }

    if (!userId) {
      alert('User not authenticated');
      return;
    }

    setIsSaving(true);
    try {
      let pdfUrl = formData.pdf;

      // Upload PDF if a new file was selected
      if (pdfFile) {
        pdfUrl = await uploadPdfToStorage(pdfFile);
      }

      if (step) {
        // Update existing step
        const updates: Partial<AdditionalResourcesStep> = {
          title: formData.title.trim(),
          resources: {
            link: formData.link.trim(),
            pdf: pdfUrl,
          },
          isOptional: formData.isOptional,
        };
        await updateStepData(moduleId, step.id, updates);
      } else {
          // Create new step
          const order = module?.steps?.length || 0;
          const stepData: any = {
            type: 'additionalResources' as const,
            title: formData.title.trim(),
            resources: {
              link: formData.link.trim(),
              pdf: pdfUrl,
            },
            isOptional: formData.isOptional,
            order,
            createdBy: userId,
          };
          await createNewStep(moduleId, stepData);
      }
      onClose();
    } catch (error: any) {
        console.error('Error saving additional resources step:', error);
        alert(`Failed to save resource: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
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
              {step ? 'Edit Resource' : 'Add Additional Resources'}
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
            {/* Resource Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resource Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={isSaving}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Enter resource title"
              />
            </div>

            {/* Link URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                External Link
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                disabled={isSaving}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="https://example.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Provide an external link
              </p>
            </div>

            {/* PDF Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload PDF
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                  disabled={isSaving || isUploadingPdf}
                  className="hidden"
                  id="pdf-upload"
                />
                <label
                  htmlFor="pdf-upload"
                  className={`px-4 py-2 border border-gray-300 rounded-lg font-medium cursor-pointer transition-colors duration-200 ${
                    isSaving || isUploadingPdf
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isUploadingPdf ? 'Uploading...' : 'Choose PDF'}
                </label>
                {(pdfFile || formData.pdf) && (
                  <span className="text-sm text-gray-600 flex items-center gap-2 truncate max-w-[200px]">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="truncate" title={pdfFile?.name || formData.pdf}>
                      {pdfFile?.name || (formData.pdf ? 'Existing PDF' : '')}
                    </span>
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Upload a PDF file (max 10MB)
              </p>
            </div>

            {/* Optional Step Checkbox */}
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
            disabled={isSaving || isUploadingPdf}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            {(isSaving || isUploadingPdf) && (
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {isSaving ? 'Saving...' : (step ? 'Update Resource' : 'Add Resource')}
          </button>
        </div>
      </div>
    </div>
  );
}

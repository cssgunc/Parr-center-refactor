<<<<<<< HEAD
import { Container, Typography, Box } from '@mui/material';

export default function ModulesPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Modules
        </Typography>
        <Typography variant="body1">
          This is the modules page. Add your modules content here.
        </Typography>
      </Box>
    </Container>
=======
/**
 * MODULES PAGE COMPONENT
 * 
 * This is the main admin interface for managing learning modules.
 * It displays a grid of modules with their features and provides
 * functionality to create, edit, and delete modules.
 * 
 * The component uses the Zustand store for state management and
 * includes modal dialogs for editing modules and their features.
 */

'use client'; // This directive tells Next.js this component should run on the client side

import { useEffect, useState } from 'react';
import { useModuleStore } from '@/store/moduleStore';
import { Module } from '@/types/module';
import ModuleEditor from '@/components/ModuleEditor';

/**
 * MODULES PAGE COMPONENT
 * 
 * The main admin dashboard component that displays all modules and provides
 * CRUD operations for managing them. This is where admins spend most of their time
 * when managing the learning content.
 */
export default function ModulesPage() {
  // ===== ZUSTAND STORE INTEGRATION =====
  
  /**
   * STORE STATE AND ACTIONS
   * 
   * We destructure the needed state and actions from the Zustand store.
   * This gives us direct access to the global state and the functions
   * to modify it without prop drilling.
   */
  const { 
    modules, // Array of all modules in the system
    initializeStore, // Function to load mock data into the store
    deleteModule, // Function to remove a module by ID
    setSelectedModule, // Function to set which module is currently selected
    setIsEditing // Function to toggle editing mode
  } = useModuleStore();

  // ===== LOCAL COMPONENT STATE =====
  
  /**
   * MODULE EDITOR MODAL STATE
   * 
   * Controls whether the module editor modal is currently visible.
   * When true, the ModuleEditor component is rendered as an overlay.
   */
  const [showModuleEditor, setShowModuleEditor] = useState(false);
  
  /**
   * EDITING MODULE STATE
   * 
   * Stores the module that is currently being edited, or null if creating a new module.
   * This is passed to the ModuleEditor component to determine if we're editing
   * an existing module or creating a new one.
   */
  const [editingModule, setEditingModule] = useState<Module | null>(null);

  // ===== EFFECTS =====
  
  /**
   * INITIALIZE STORE ON COMPONENT MOUNT
   * 
   * When the component first loads, we need to populate the store with mock data.
   * This effect runs once when the component mounts and loads the sample modules
   * into the global state.
   */
  useEffect(() => {
    initializeStore(); // Load mock data into the Zustand store
  }, [initializeStore]); // Dependency array ensures this only runs when initializeStore changes

  // ===== EVENT HANDLERS =====
  
  /**
   * HANDLE CREATE MODULE
   * 
   * Opens the module editor in "create mode" for adding a new module.
   * Sets editingModule to null to indicate we're creating, not editing.
   */
  const handleCreateModule = () => {
    setEditingModule(null); // No existing module to edit
    setShowModuleEditor(true); // Show the module editor modal
  };

  /**
   * HANDLE EDIT MODULE
   * 
   * Opens the module editor in "edit mode" for modifying an existing module.
   * Sets up the editing state and passes the module to be edited.
   * 
   * @param module - The module object to edit
   */
  const handleEditModule = (module: Module) => {
    setEditingModule(module); // Set the module to be edited
    setSelectedModule(module); // Update global state to track selected module
    setIsEditing(true); // Enable editing mode in global state
    setShowModuleEditor(true); // Show the module editor modal
  };

  /**
   * HANDLE DELETE MODULE
   * 
   * Deletes a module after confirming with the user.
   * Shows a confirmation dialog to prevent accidental deletions.
   * 
   * @param moduleId - The ID of the module to delete
   */
  const handleDeleteModule = (moduleId: string) => {
    // Show confirmation dialog to prevent accidental deletions
    if (confirm('Are you sure you want to delete this module? This action cannot be undone.')) {
      deleteModule(moduleId); // Remove the module from the store
    }
  };

  /**
   * HANDLE CLOSE EDITOR
   * 
   * Closes the module editor modal and resets all related state.
   * This is called when the user cancels editing or saves changes.
   */
  const handleCloseEditor = () => {
    setShowModuleEditor(false); // Hide the module editor modal
    setEditingModule(null); // Clear the module being edited
    setSelectedModule(null); // Clear the selected module in global state
    setIsEditing(false); // Disable editing mode in global state
  };

  /**
   * GET FEATURE TYPE COUNT
   * 
   * Creates a human-readable summary of feature types and counts for a module.
   * This is displayed on each module card to give admins a quick overview
   * of what types of content are in each module.
   * 
   * @param features - Array of features to analyze
   * @returns String like "2 videos, 1 quiz, 3 flashcards"
   */
  const getFeatureTypeCount = (features: Module['features']) => {
    // Count each feature type using reduce
    const counts = features.reduce((acc, feature) => {
      acc[feature.type] = (acc[feature.type] || 0) + 1; // Increment count for this feature type
      return acc;
    }, {} as Record<string, number>); // Start with empty object, typed as string keys with number values
    
    // Convert counts object to readable string
    return Object.entries(counts)
      .map(([type, count]) => `${count} ${type}${count > 1 ? 's' : ''}`) // Add 's' for plural
      .join(', '); // Join with commas
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Module Management</h1>
          <p className="text-gray-600">Manage your learning modules and their features</p>
        </div>

        {/* Create Module Button */}
        <div className="mb-6">
          <button
            onClick={handleCreateModule}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Module
          </button>
        </div>

        {/* Modules Grid */}
        {modules.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No modules yet</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first module</p>
            <button
              onClick={handleCreateModule}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Create Module
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{module.description}</p>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>{module.features.length} features</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {module.features.length > 0 ? getFeatureTypeCount(module.features) : 'No features yet'}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditModule(module)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteModule(module.id)}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Module Editor Modal */}
        {showModuleEditor && (
          <ModuleEditor
            module={editingModule}
            onClose={handleCloseEditor}
          />
        )}
      </div>
    </div>
>>>>>>> acb25e6 (separated modules page into app folder)
  );
}

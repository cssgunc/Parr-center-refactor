/**
 * ZUSTAND STORE FOR MODULE MANAGEMENT
 * 
 * This file contains the global state management for the entire module management system.
 * It uses Zustand, a lightweight state management library that provides a simple
 * and type-safe way to manage application state without the complexity of Redux.
 * 
 * The store manages:
 * - All modules and their features
 * - Currently selected module for editing
 * - UI state for editing mode
 * - All CRUD operations for modules and features
 */

import { create } from 'zustand';
import { Module, Feature, FeatureType } from '@/types/module';
import { mockModules } from '@/data/mockModules';
import { v4 as uuidv4 } from 'uuid'; // UUID generator for creating unique IDs

/**
 * MODULE STORE INTERFACE
 * 
 * Defines the shape of our global state and all available actions.
 * This interface ensures type safety throughout the application and serves
 * as documentation for what state and actions are available.
 */
interface ModuleStore {
  // ===== STATE PROPERTIES =====
  
  modules: Module[]; // Array of all modules in the system
  selectedModule: Module | null; // Currently selected module for editing (null when none selected)
  isEditing: boolean; // Boolean flag indicating if we're currently in editing mode
  
  // ===== MODULE ACTIONS =====
  // These functions handle CRUD operations for modules
  
  setModules: (modules: Module[]) => void; // Replace the entire modules array (used for initialization)
  addModule: (module: Omit<Module, 'id'>) => void; // Add a new module (ID will be auto-generated)
  updateModule: (id: string, updates: Partial<Omit<Module, 'id'>>) => void; // Update an existing module by ID
  deleteModule: (id: string) => void; // Remove a module by ID
  setSelectedModule: (module: Module | null) => void; // Set which module is currently selected for editing
  setIsEditing: (editing: boolean) => void; // Toggle editing mode on/off
  
  // ===== FEATURE ACTIONS =====
  // These functions handle CRUD operations for features within modules
  
  addFeature: (moduleId: string, feature: Omit<Feature, 'id'>) => void; // Add a feature to a specific module
  updateFeature: (moduleId: string, featureId: string, updates: Partial<Omit<Feature, 'id'>>) => void; // Update a feature within a module
  deleteFeature: (moduleId: string, featureId: string) => void; // Remove a feature from a module
  reorderFeatures: (moduleId: string, featureIds: string[]) => void; // Reorder features within a module (for drag & drop)
  
  // ===== INITIALIZATION =====
  initializeStore: () => void; // Load mock data into the store (called on app startup)
}

/**
 * ZUSTAND STORE IMPLEMENTATION
 * 
 * This is where we actually implement all the state management logic.
 * The `create` function from Zustand takes a function that receives `set` and `get`
 * parameters and returns an object containing our state and actions.
 */
export const useModuleStore = create<ModuleStore>((set, get) => ({
  // ===== INITIAL STATE =====
  // These are the default values when the store is first created
  
  modules: [], // Start with empty array - will be populated by initializeStore()
  selectedModule: null, // No module selected initially
  isEditing: false, // Not in editing mode initially
  
  // ===== MODULE ACTIONS IMPLEMENTATION =====
  
  /**
   * SET MODULES
   * 
   * Replaces the entire modules array with a new one.
   * Used primarily for initialization with mock data.
   */
  setModules: (modules) => set({ modules }),
  
  /**
   * ADD MODULE
   * 
   * Creates a new module and adds it to the modules array.
   * Automatically generates a unique ID using UUID v4.
   * 
   * @param moduleData - Module data without ID (ID will be auto-generated)
   */
  addModule: (moduleData) => {
    // Create a new module object with auto-generated ID
    const newModule: Module = {
      ...moduleData, // Spread all provided module data
      id: uuidv4(), // Generate unique ID using UUID v4
    };
    
    // Update state by adding the new module to the existing array
    set((state) => ({
      modules: [...state.modules, newModule], // Spread existing modules and add new one
    }));
  },
  
  /**
   * UPDATE MODULE
   * 
   * Updates an existing module by ID with partial data.
   * Also updates the selectedModule if it's the one being edited.
   * 
   * @param id - ID of the module to update
   * @param updates - Partial module data to merge with existing module
   */
  updateModule: (id, updates) => {
    set((state) => ({
      // Update the modules array by mapping over it
      modules: state.modules.map((module) =>
        module.id === id ? { ...module, ...updates } : module // If ID matches, merge updates; otherwise keep as-is
      ),
      // If the selected module is the one being updated, update it too
      selectedModule: state.selectedModule?.id === id 
        ? { ...state.selectedModule, ...updates } // Update selected module with same changes
        : state.selectedModule, // Keep selected module unchanged if it's not the one being updated
    }));
  },
  
  /**
   * DELETE MODULE
   * 
   * Removes a module from the modules array by ID.
   * Also clears selectedModule if it was the deleted module.
   * 
   * @param id - ID of the module to delete
   */
  deleteModule: (id) => {
    set((state) => ({
      // Filter out the module with the matching ID
      modules: state.modules.filter((module) => module.id !== id),
      // Clear selected module if it was the one being deleted
      selectedModule: state.selectedModule?.id === id ? null : state.selectedModule,
    }));
  },
  
  /**
   * SET SELECTED MODULE
   * 
   * Sets which module is currently selected for editing.
   * Used when opening the module editor.
   * 
   * @param module - Module to select, or null to clear selection
   */
  setSelectedModule: (module) => set({ selectedModule: module }),
  
  /**
   * SET EDITING MODE
   * 
   * Toggles the editing mode flag.
   * Used to track whether we're currently editing a module.
   * 
   * @param editing - Boolean indicating if we're in editing mode
   */
  setIsEditing: (editing) => set({ isEditing: editing }),
  
  // ===== FEATURE ACTIONS IMPLEMENTATION =====
  
  /**
   * ADD FEATURE
   * 
   * Adds a new feature to a specific module.
   * Automatically generates a unique ID for the feature.
   * Updates both the modules array and selectedModule if it matches.
   * 
   * @param moduleId - ID of the module to add the feature to
   * @param featureData - Feature data without ID (ID will be auto-generated)
   */
  addFeature: (moduleId, featureData) => {
    // Create a new feature object with auto-generated ID
    const newFeature: Feature = {
      ...featureData, // Spread all provided feature data
      id: uuidv4(), // Generate unique ID using UUID v4
    } as Feature; // Type assertion to satisfy TypeScript's discriminated union
    
    set((state) => ({
      // Update the modules array by mapping over it
      modules: state.modules.map((module) =>
        module.id === moduleId
          ? { ...module, features: [...module.features, newFeature] } // Add feature to matching module
          : module // Keep other modules unchanged
      ),
      // If the selected module is the one being updated, update it too
      selectedModule: state.selectedModule?.id === moduleId
        ? { ...state.selectedModule, features: [...state.selectedModule.features, newFeature] } // Add feature to selected module
        : state.selectedModule, // Keep selected module unchanged if it's not the one being updated
    }));
  },
  
  /**
   * UPDATE FEATURE
   * 
   * Updates an existing feature within a specific module.
   * Updates both the modules array and selectedModule if it matches.
   * 
   * @param moduleId - ID of the module containing the feature
   * @param featureId - ID of the feature to update
   * @param updates - Partial feature data to merge with existing feature
   */
  updateFeature: (moduleId, featureId, updates) => {
    set((state) => ({
      // Update the modules array by mapping over it
      modules: state.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module, // Keep all module properties
              // Update the features array within the matching module
              features: module.features.map((feature) =>
                feature.id === featureId ? { ...feature, ...updates } as Feature : feature // Merge updates if ID matches
              ),
            }
          : module // Keep other modules unchanged
      ),
      // If the selected module is the one being updated, update it too
      selectedModule: state.selectedModule?.id === moduleId
        ? {
            ...state.selectedModule, // Keep all selected module properties
            // Update the features array within the selected module
            features: state.selectedModule.features.map((feature) =>
              feature.id === featureId ? { ...feature, ...updates } as Feature : feature // Merge updates if ID matches
            ),
          }
        : state.selectedModule, // Keep selected module unchanged if it's not the one being updated
    }));
  },
  
  /**
   * DELETE FEATURE
   * 
   * Removes a feature from a specific module.
   * Updates both the modules array and selectedModule if it matches.
   * 
   * @param moduleId - ID of the module containing the feature
   * @param featureId - ID of the feature to delete
   */
  deleteFeature: (moduleId, featureId) => {
    set((state) => ({
      // Update the modules array by mapping over it
      modules: state.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module, // Keep all module properties
              // Filter out the feature with the matching ID
              features: module.features.filter((feature) => feature.id !== featureId),
            }
          : module // Keep other modules unchanged
      ),
      // If the selected module is the one being updated, update it too
      selectedModule: state.selectedModule?.id === moduleId
        ? {
            ...state.selectedModule, // Keep all selected module properties
            // Filter out the feature with the matching ID from selected module
            features: state.selectedModule.features.filter((feature) => feature.id !== featureId),
          }
        : state.selectedModule, // Keep selected module unchanged if it's not the one being updated
    }));
  },
  
  /**
   * REORDER FEATURES
   * 
   * Reorders features within a module based on the provided array of feature IDs.
   * Used for drag-and-drop functionality to change the order of features.
   * 
   * @param moduleId - ID of the module containing the features
   * @param featureIds - Array of feature IDs in the new desired order
   */
  reorderFeatures: (moduleId, featureIds) => {
    set((state) => {
      // Find the module we're reordering features for
      const module = state.modules.find((m) => m.id === moduleId);
      if (!module) return state; // If module not found, return current state unchanged
      
      // Create a new array of features in the specified order
      // Map over the provided feature IDs and find the corresponding feature objects
      const reorderedFeatures = featureIds.map((id) =>
        module.features.find((f) => f.id === id) // Find feature with matching ID
      ).filter(Boolean) as Feature[]; // Remove any undefined values and cast to Feature array
      
      return {
        // Update the modules array with the reordered features
        modules: state.modules.map((m) =>
          m.id === moduleId ? { ...m, features: reorderedFeatures } : m // Update matching module with reordered features
        ),
        // If the selected module is the one being updated, update it too
        selectedModule: state.selectedModule?.id === moduleId
          ? { ...state.selectedModule, features: reorderedFeatures } // Update selected module with reordered features
          : state.selectedModule, // Keep selected module unchanged if it's not the one being updated
      };
    });
  },
  
  // ===== INITIALIZATION =====
  
  /**
   * INITIALIZE STORE
   * 
   * Loads mock data into the store.
   * Called when the application first starts to populate the store with sample data.
   * In a real application, this would typically make an API call to fetch data from a server.
   */
  initializeStore: () => {
    set({ modules: mockModules }); // Replace empty modules array with mock data
  },
}));

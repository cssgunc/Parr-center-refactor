/**
 * MAIN APPLICATION PAGE
 * 
 * This is the root page component that serves as the entry point for the application.
 * It implements a simple view switcher between the home page and admin dashboard.
 * 
 * The component uses local state to manage which view is currently displayed:
 * - 'home': Shows the landing page with navigation options
 * - 'admin': Shows the admin dashboard for module management
 */

"use client"; // This directive tells Next.js this component should run on the client side

import { useState } from "react";
import ModulesPage from "@/components/ModulesPage";

/**
 * HOME COMPONENT
 * 
 * The main page component that renders either the home view or admin view
 * based on the currentView state. This provides a simple way to navigate
 * between different sections of the application without complex routing.
 */
export default function Home() {
  // ===== STATE MANAGEMENT =====
  
  /**
   * CURRENT VIEW STATE
   * 
   * Tracks which view is currently being displayed:
   * - 'home': Landing page with welcome message and navigation buttons
   * - 'admin': Admin dashboard for managing modules and features
   * 
   * This is a simple way to implement navigation without using Next.js routing,
   * which is perfect for a single-page application with just two main views.
   */
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');

  // ===== RENDER LOGIC =====
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 
        CONDITIONAL RENDERING BASED ON CURRENT VIEW
        We use a ternary operator to conditionally render either the home view
        or the admin view based on the currentView state.
      */}
      {currentView === 'home' ? (
        // ===== HOME VIEW =====
        // This is the landing page that users see when they first visit the application
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            {/* Application title and branding */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Parr Center Learning Platform
            </h1>
            
            {/* Welcome message explaining what the application does */}
            <p className="text-xl text-gray-600 mb-8">
              Welcome to the learning management system
            </p>
            
            {/* Navigation buttons for accessing different parts of the application */}
            <div className="space-x-4">
              {/* Admin Dashboard Button - Primary action button */}
              <button
                onClick={() => setCurrentView('admin')} // Switch to admin view when clicked
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Admin Dashboard
              </button>
              
              {/* Student Portal Button - Disabled placeholder for future feature */}
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
                disabled // Disabled because this feature is not yet implemented
              >
                Student Portal (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      ) : (
        // ===== ADMIN VIEW =====
        // This is the admin dashboard where users can manage modules and features
        <div>
          {/* Admin Dashboard Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Page title */}
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              
              {/* Back to Home Button */}
              <button
                onClick={() => setCurrentView('home')} // Switch back to home view when clicked
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                ← Back to Home
              </button>
            </div>
          </div>
          
          {/* 
            MODULES PAGE COMPONENT
            This is where all the module management functionality lives.
            It handles displaying, creating, editing, and deleting modules and features.
          */}
          <ModulesPage />
        </div>
      )}
    </div>
  );
}

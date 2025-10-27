/**
 * MAIN APPLICATION PAGE
 * 
 * This is the root page component that serves as the entry point for the application.
 * It implements a view switcher between home, student portal, and admin dashboard.
 * 
 * The component uses local state to manage which view is currently displayed:
 * - 'home': Shows the landing page with navigation options
 * - 'student': Shows the student learning portal with modules
 * - 'admin': Shows the admin dashboard for module management
 */

"use client"; // This directive tells Next.js this component should run on the client side

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import FooterMUI from "@/components/FooterMUI";
import ModuleContentMUI from "@/components/ModuleContentMUI";
import modulesContent from "@/data/modulesContent";
import ModulesPage from "@/components/ModulesPage";

/**
 * HOME COMPONENT
 * 
 * The main page component that renders home, student, or admin view
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
   * - 'student': Student learning portal with module content
   * - 'admin': Admin dashboard for managing modules and features
   */
  const [currentView, setCurrentView] = useState<'home' | 'student' | 'admin'>('home');
  
  /**
   * SELECTED MODULE STATE
   * 
   * Tracks which module is currently selected in the student portal
   */
  const [selectedModule, setSelectedModule] = useState<number>(1);

  // ===== RENDER LOGIC =====
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex flex-1">
        <Sidebar selectedModule={selectedModule} onSelect={setSelectedModule} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <ModuleContentMUI moduleId={selectedModule} content={modulesContent[selectedModule]} />
          </div>
        </main>
      </div>
      <FooterMUI />
    <div className="min-h-screen bg-gray-50">
      {/* CONDITIONAL RENDERING BASED ON CURRENT VIEW */}
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
              {/* Student Portal Button */}
              <button
                onClick={() => setCurrentView('student')}
                className="bg-carolina-blue hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Student Portal
              </button>
              
              {/* Admin Dashboard Button */}
              <button
                onClick={() => setCurrentView('admin')}
                className="bg-primary-athletics-navy hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Admin Dashboard
              </button>
            </div>
          </div>
        </div>
      ) : currentView === 'student' ? (
        // ===== STUDENT PORTAL VIEW =====
        // This is the student-facing learning portal with module content
        <div className="min-h-screen bg-white flex flex-col">
          {/* Back to Home Button */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <button
              onClick={() => setCurrentView('home')}
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ← Back to Home
            </button>
          </div>
          
          <div className="flex flex-1">
            <Sidebar selectedModule={selectedModule} onSelect={setSelectedModule} />
            <main className="flex-1 overflow-auto">
              <div className="p-6">
                <ModuleContent moduleId={selectedModule} content={modulesContent[selectedModule]} />
              </div>
            </main>
          </div>
          <Footer />
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
                onClick={() => setCurrentView('home')}
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

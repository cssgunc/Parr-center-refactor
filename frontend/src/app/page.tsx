"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ModuleContentMUI from "@/components/ModuleContentMUI";
import modulesContent from "@/data/modulesContent";
import ModulesPage from "@/components/ModulesPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";

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
   * Tracks user state that is loggedin on webpage
   */
  const { user, isAdmin, loading } = useAuth();
  /**
   * CURRENT VIEW STATE
   *
   * Tracks which view is currently being displayed:
   * - 'home': Landing page with welcome message and navigation buttons
   * - 'student': Student learning portal with module content
   * - 'admin': Admin dashboard for managing modules and features
   */
  const [currentView, setCurrentView] = useState<"home" | "student" | "admin">(
    "home"
  );

  /**
   * SELECTED MODULE STATE
   *
   * Tracks which module is currently selected in the student portal
   */
  const [selectedModule, setSelectedModule] = useState<number>(1);

  /**
   *NextJS router and redriecting state for webpage navigation
   */
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  // ===== RENDER LOGIC =====

  /**
   * Auto-Redirect on loading of home page
   * Set's the view based off whether user is loggedin or not and user's role
   * */
  useEffect(() => {
    if (!loading) {
      if (!user) {
        setIsRedirecting(true);
        router.push("/login");
      } else if (isAdmin) {
        setCurrentView("admin");
      } else {
        setCurrentView("student");
      }
    }
  }, [user, isAdmin, loading]);

  //Displays loading while AuthContext is fetching role, and userProfile
  if (loading || isRedirecting) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "admin" ? (
        isAdmin ? (
          // ===== ADMIN VIEW =====
          // This is the admin dashboard where users can manage modules and feature
          <div>
            {/* Admin Dashboard Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Page title */}
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>

                {/* Back to Home Button */}
                {/* <button
                onClick={() => setCurrentView("home")}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                ← Back to Home
              </button> */}
              </div>
            </div>

            {/*
            MODULES PAGE COMPONENT
            This is where all the module management functionality lives.
            It handles displaying, creating, editing, and deleting modules and features.
          */}
            <ModulesPage />
          </div>
        ) : null
      ) : (
        // ===== STUDENT PORTAL VIEW =====
        // This is the student-facing learning portal with module content
        //ProtectedRoute route will redirect to /login if user is not authenticated
        <ProtectedRoute>
          <div className="min-h-screen bg-white flex flex-col">
            {/* Back to Home Button */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              {/* <button
                onClick={() => setCurrentView("home")}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                ← Back to Home
              </button> */}
            </div>

            <div className="flex flex-1">
              <Sidebar
                selectedModule={selectedModule}
                onSelect={setSelectedModule}
              />
              <main className="flex-1 overflow-auto">
                <div className="p-6">
                  <ModuleContentMUI
                    moduleId={selectedModule}
                    content={modulesContent[selectedModule]}
                  />
                </div>
              </main>
            </div>
            <FooterMUI />
          </div>
        </ProtectedRoute>
      )}
    </div>
  );
}

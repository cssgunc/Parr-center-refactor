"use client";

import AuthGate from "@/components/AuthGate";
import ModulesPage from "@/components/ModulesPage";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthGate requireAdmin>
        {
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
        }
      </AuthGate>
    </div>
  );
}

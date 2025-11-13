"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ModuleContentMUI from "@/components/ModuleContentMUI";
import modulesContent from "@/data/modulesContent";
import AuthGate from "@/components/AuthGate";
import { auth } from "../../lib/firebase/firebaseConfig";

export default function StudentPage() {
  /**
   * SELECTED MODULE STATE
   *
   * Tracks which module is currently selected in the student portal
   */
  const [selectedModule, setSelectedModule] = useState<number>(1);
  const userId = auth.currentUser ? auth.currentUser.uid : "";

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthGate>
        {
          // ===== STUDENT PORTAL VIEW =====
          // This is the student-facing learning portal with module content
          //ProtectedRoute route will redirect to /login if user is not authenticated
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
                    userId={userId}
                  />
                </div>
              </main>
            </div>
          </div>
        }
      </AuthGate>
    </div>
  );
}
